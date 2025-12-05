import { useState } from "react";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Download,
  Trash2,
  Plus,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { vietnameseIngredients } from "@/lib/ingredients";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useToast } from "@/hooks/use-toast";
import AutoDismissBanner from "@/components/AutoDismissBanner";

interface IngredientPriceInfo {
  defaultQuantity: number;
  unit: string;
  baseUnitPrice: number; // price per single unit (1g, 1 quả, etc.)
  displayPriceUnit: string; // for display like "3,000đ/quả"
}

// Define sub-items for parent ingredients
const ingredientSubItems: Record<
  string,
  Array<{ name: string; priceInfo: IngredientPriceInfo }>
> = {
  "thịt heo": [
    {
      name: "Ba rọi",
      priceInfo: {
        defaultQuantity: 300,
        unit: "g",
        baseUnitPrice: 174,
        displayPriceUnit: "174.000đ/kg",
      },
    },
    {
      name: "Sườn non",
      priceInfo: {
        defaultQuantity: 300,
        unit: "g",
        baseUnitPrice: 174,
        displayPriceUnit: "209.000đ/kg",
      },
    },
    {
      name: "Bắp, chân giò",
      priceInfo: {
        defaultQuantity: 300,
        unit: "g",
        baseUnitPrice: 89,
        displayPriceUnit: "89.000đ/kg",
      },
    },
    {
      name: "Xương (có thịt)",
      priceInfo: {
        defaultQuantity: 300,
        unit: "g",
        baseUnitPrice: 89,
        displayPriceUnit: "89.000đ/kg",
      },
    },
    {
      name: "Thịt xay",
      priceInfo: {
        defaultQuantity: 300,
        unit: "g",
        baseUnitPrice: 110.5,
        displayPriceUnit: "11.050đ/100g",
      },
    },
    {
      name: "Cốt lết",
      priceInfo: {
        defaultQuantity: 300,
        unit: "g",
        baseUnitPrice: 99,
        displayPriceUnit: "29.700đ/300g",
      },
    },
    {
      name: "Thịt đùi",
      priceInfo: {
        defaultQuantity: 300,
        unit: "g",
        baseUnitPrice: 99,
        displayPriceUnit: "49.500đ/500g",
      },
    },
    {
      name: "Nạc",
      priceInfo: {
        defaultQuantity: 300,
        unit: "g",
        baseUnitPrice: 129,
        displayPriceUnit: "38.700đ/300g",
      },
    },
    {
      name: "Nạc thăn",
      priceInfo: {
        defaultQuantity: 300,
        unit: "g",
        baseUnitPrice: 149,
        displayPriceUnit: "149.000đ/kg",
      },
    },
  ],
  "thịt bò": [
    {
      name: "Thăn bò",
      priceInfo: {
        defaultQuantity: 300,
        unit: "g",
        baseUnitPrice: 316,
        displayPriceUnit: "79.000đ/250g",
      },
    },
    {
      name: "Ba chỉ bò",
      priceInfo: {
        defaultQuantity: 300,
        unit: "g",
        baseUnitPrice: 367,
        displayPriceUnit: "110.000đ/300g",
      },
    },
    {
      name: "Đùi bò",
      priceInfo: {
        defaultQuantity: 300,
        unit: "g",
        baseUnitPrice: 267.9,
        displayPriceUnit: "267.900đ/kg",
      },
    },
  ],
  "thịt gà": [
    {
      name: "Má đùi",
      priceInfo: {
        defaultQuantity: 500,
        unit: "g",
        baseUnitPrice: 78.2,
        displayPriceUnit: "78.200đ/kg",
      },
    },
    {
      name: "Đùi gà",
      priceInfo: {
        defaultQuantity: 500,
        unit: "g",
        baseUnitPrice: 80.75,
        displayPriceUnit: "80.750đ/kg",
      },
    },
    {
      name: "Ức gà",
      priceInfo: {
        defaultQuantity: 300,
        unit: "g",
        baseUnitPrice: 92.7,
        displayPriceUnit: "92.700đ/kg",
      },
    },
    {
      name: "Xương gà",
      priceInfo: {
        defaultQuantity: 300,
        unit: "g",
        baseUnitPrice: 31.95,
        displayPriceUnit: "31.950đ/kg",
      },
    },
  ],
  tôm: [
    {
      name: "Tôm sú",
      priceInfo: {
        defaultQuantity: 200,
        unit: "g",
        baseUnitPrice: 350,
        displayPriceUnit: "350.000đ/kg",
      },
    },
    {
      name: "Tôm thẻ",
      priceInfo: {
        defaultQuantity: 200,
        unit: "g",
        baseUnitPrice: 280,
        displayPriceUnit: "280.000đ/kg",
      },
    },
    {
      name: "Tôm he",
      priceInfo: {
        defaultQuantity: 200,
        unit: "g",
        baseUnitPrice: 200,
        displayPriceUnit: "200.000đ/kg",
      },
    },
  ],
  cá: [
    {
      name: "Cá rô phi (Chưa chính xác)",
      priceInfo: {
        defaultQuantity: 500,
        unit: "g",
        baseUnitPrice: 120,
        displayPriceUnit: "120.000đ/kg",
      },
    },
    {
      name: "Cá diêu hồng",
      priceInfo: {
        defaultQuantity: 500,
        unit: "g",
        baseUnitPrice: 92,
        displayPriceUnit: "92.000đ/kg",
      },
    },
    {
      name: "Cá lóc",
      priceInfo: {
        defaultQuantity: 500,
        unit: "g",
        baseUnitPrice: 98,
        displayPriceUnit: "98.000đ/kg",
      },
    },
    {
      name: "Cá thu (Chưa chính xác)",
      priceInfo: {
        defaultQuantity: 500,
        unit: "g",
        baseUnitPrice: 180,
        displayPriceUnit: "180.000đ/kg",
      },
    },
    {
      name: "Cá nục",
      priceInfo: {
        defaultQuantity: 500,
        unit: "g",
        baseUnitPrice: 99,
        displayPriceUnit: "99.000đ/kg",
      },
    },
    {
      name: "Cá sòng",
      priceInfo: {
        defaultQuantity: 500,
        unit: "g",
        baseUnitPrice: 99,
        displayPriceUnit: "99.000đ/kg",
      },
    },
    {
      name: "Cá chim",
      priceInfo: {
        defaultQuantity: 500,
        unit: "g",
        baseUnitPrice: 77,
        displayPriceUnit: "77.000đ/kg",
      },
    },
  ],
};

// Price per base unit (1g for weight items, 1 piece for count items)
const ingredientPrices: Record<string, IngredientPriceInfo> = {
  // Rau (15 loại)
  "rau cải": {
    defaultQuantity: 300,
    unit: "g",
    baseUnitPrice: 27,
    displayPriceUnit: "27.000đ/kg",
  },
  "đậu đũa": {
    defaultQuantity: 300,
    unit: "g",
    baseUnitPrice: 40,
    displayPriceUnit: "40.000đ/kg",
  },
  giá: {
    defaultQuantity: 300,
    unit: "g",
    baseUnitPrice: 35,
    displayPriceUnit: "35.000đ/kg",
  },
  "xà lách": {
    defaultQuantity: 300,
    unit: "g",
    baseUnitPrice: 60,
    displayPriceUnit: "60.000đ/kg",
  },
  "cải bẹ xanh": {
    defaultQuantity: 300,
    unit: "g",
    baseUnitPrice: 28,
    displayPriceUnit: "28.000đ/kg",
  },
  "rau muống": {
    defaultQuantity: 400,
    unit: "g",
    baseUnitPrice: 13,
    displayPriceUnit: "13.000đ/kg",
  },
  "cải ngọt": {
    defaultQuantity: 300,
    unit: "g",
    baseUnitPrice: 28,
    displayPriceUnit: "28.000đ/kg",
  },
  "cải thìa": {
    defaultQuantity: 300,
    unit: "g",
    baseUnitPrice: 28,
    displayPriceUnit: "28.000đ/kg",
  },
  "cải ngồng": {
    defaultQuantity: 300,
    unit: "g",
    baseUnitPrice: 28,
    displayPriceUnit: "28.000đ/kg",
  },
  "rau dền": {
    defaultQuantity: 300,
    unit: "g",
    baseUnitPrice: 28,
    displayPriceUnit: "28.000đ/kg",
  },
  "rau lang": {
    defaultQuantity: 300,
    unit: "g",
    baseUnitPrice: 28,
    displayPriceUnit: "28.000đ/kg",
  },
  "rau mồng tơi": {
    defaultQuantity: 300,
    unit: "g",
    baseUnitPrice: 17,
    displayPriceUnit: "17.000đ/kg",
  },
  "rau ngót": {
    defaultQuantity: 250,
    unit: "g",
    baseUnitPrice: 40,
    displayPriceUnit: "40.000đ/kg",
  },
  "rau đắng": {
    defaultQuantity: 200,
    unit: "g",
    baseUnitPrice: 36,
    displayPriceUnit: "36.000đ/kg",
  },
  "rau má": {
    defaultQuantity: 200,
    unit: "g",
    baseUnitPrice: 50,
    displayPriceUnit: "50.000đ/kg",
  },

  // Rau thơm (13 loại)
  ngò: {
    defaultQuantity: 100,
    unit: "g",
    baseUnitPrice: 70,
    displayPriceUnit: "70.000đ/kg",
  },
  "mùi tàu": {
    defaultQuantity: 100,
    unit: "g",
    baseUnitPrice: 70,
    displayPriceUnit: "70.000đ/kg",
  },
  "rau răm": {
    defaultQuantity: 50,
    unit: "g",
    baseUnitPrice: 70,
    displayPriceUnit: "70.000đ/kg",
  },
  "rau diếp cá": {
    defaultQuantity: 100,
    unit: "g",
    baseUnitPrice: 70,
    displayPriceUnit: "70.000đ/kg",
  },
  "rau húng cây": {
    defaultQuantity: 100,
    unit: "g",
    baseUnitPrice: 70,
    displayPriceUnit: "70.000đ/kg",
  },
  "húng quế": {
    defaultQuantity: 100,
    unit: "g",
    baseUnitPrice: 70,
    displayPriceUnit: "70.000đ/kg",
  },
  "tía tô": {
    defaultQuantity: 100,
    unit: "g",
    baseUnitPrice: 70,
    displayPriceUnit: "70.000đ/kg",
  },
  hẹ: {
    defaultQuantity: 100,
    unit: "g",
    baseUnitPrice: 49,
    displayPriceUnit: "49.000đ/kg",
  },
  "rau thơm": {
    defaultQuantity: 200,
    unit: "g",
    baseUnitPrice: 70,
    displayPriceUnit: "70.000đ/kg",
  },
  "hành lá": {
    defaultQuantity: 100,
    unit: "g",
    baseUnitPrice: 69,
    displayPriceUnit: "69.000đ/kg",
  },
  "ngò rí": {
    defaultQuantity: 50,
    unit: "g",
    baseUnitPrice: 80,
    displayPriceUnit: "80.000đ/kg",
  },
  "ngò gai": {
    defaultQuantity: 50,
    unit: "g",
    baseUnitPrice: 70,
    displayPriceUnit: "70.000đ/kg",
  },
  "hẹ lá": {
    defaultQuantity: 100,
    unit: "g",
    baseUnitPrice: 49,
    displayPriceUnit: "49.000đ/kg",
  },

  // Củ, quả (33 loại)
  "bắp mỹ": {
    defaultQuantity: 1,
    unit: "trái",
    baseUnitPrice: 10000,
    displayPriceUnit: "10.000đ/trái",
  },
  "bắp cải trắng": {
    defaultQuantity: 500,
    unit: "g",
    baseUnitPrice: 20,
    displayPriceUnit: "20.000đ/kg",
  },
  "bắp cải tím": {
    defaultQuantity: 500,
    unit: "g",
    baseUnitPrice: 40,
    displayPriceUnit: "40.000đ/kg",
  },
  "bắp cải thảo": {
    defaultQuantity: 500,
    unit: "g",
    baseUnitPrice: 25,
    displayPriceUnit: "25.000đ/kg",
  },
  "khoai tây": {
    defaultQuantity: 500,
    unit: "g",
    baseUnitPrice: 30,
    displayPriceUnit: "30.000đ/kg",
  },
  "bí đỏ": {
    defaultQuantity: 500,
    unit: "g",
    baseUnitPrice: 17.5,
    displayPriceUnit: "17.500đ/kg",
  },
  "hành tím": {
    defaultQuantity: 200,
    unit: "g",
    baseUnitPrice: 75,
    displayPriceUnit: "15.000đ/200g",
  },
  "tiêu xanh": {
    defaultQuantity: 50,
    unit: "g",
    baseUnitPrice: 190,
    displayPriceUnit: "9.500đ/50g",
  },
  "sả cây": {
    defaultQuantity: 200,
    unit: "g",
    baseUnitPrice: 30,
    displayPriceUnit: "6.000đ/200g",
  },
  "đậu bắp": {
    defaultQuantity: 250,
    unit: "g",
    baseUnitPrice: 36,
    displayPriceUnit: "9.000đ/250g",
  },
  "cà chua": {
    defaultQuantity: 500,
    unit: "g",
    baseUnitPrice: 50,
    displayPriceUnit: "50.000đ/kg",
  },
  "cà chua bi": {
    defaultQuantity: 300,
    unit: "g",
    baseUnitPrice: 63.33,
    displayPriceUnit: "19.000đ/300g",
  },
  "cà rốt": {
    defaultQuantity: 500,
    unit: "g",
    baseUnitPrice: 33,
    displayPriceUnit: "33.000đ/kg",
  },
  "củ cải trắng": {
    defaultQuantity: 500,
    unit: "g",
    baseUnitPrice: 29,
    displayPriceUnit: "29.000đ/kg",
  },
  "bầu sao": {
    defaultQuantity: 500,
    unit: "g",
    baseUnitPrice: 26,
    displayPriceUnit: "26.000đ/kg",
  },
  "bí xanh": {
    defaultQuantity: 500,
    unit: "g",
    baseUnitPrice: 26,
    displayPriceUnit: "26.000đ/kg",
  },
  gừng: {
    defaultQuantity: 200,
    unit: "g",
    baseUnitPrice: 55,
    displayPriceUnit: "55.000đ/kg",
  },
  "củ dền": {
    defaultQuantity: 300,
    unit: "g",
    baseUnitPrice: 37,
    displayPriceUnit: "37.000đ/kg",
  },
  "dưa chuột": {
    defaultQuantity: 500,
    unit: "g",
    baseUnitPrice: 21,
    displayPriceUnit: "21.000đ/kg",
  },
  "khoai lang": {
    defaultQuantity: 500,
    unit: "g",
    baseUnitPrice: 38,
    displayPriceUnit: "38.000đ/kg",
  },
  "hành tây": {
    defaultQuantity: 500,
    unit: "g",
    baseUnitPrice: 35,
    displayPriceUnit: "35.000đ/kg",
  },
  "ớt hiểm": {
    defaultQuantity: 50,
    unit: "g",
    baseUnitPrice: 100,
    displayPriceUnit: "5.000đ/50g",
  },
  thơm: {
    defaultQuantity: 500,
    unit: "g",
    baseUnitPrice: 22,
    displayPriceUnit: "22.000đ/kg",
  },
  "củ sắn": {
    defaultQuantity: 500,
    unit: "g",
    baseUnitPrice: 19,
    displayPriceUnit: "19.000đ/kg",
  },
  chanh: {
    defaultQuantity: 100,
    unit: "g",
    baseUnitPrice: 8.5,
    displayPriceUnit: "8.500đ/kg",
  },
  "su su": {
    defaultQuantity: 500,
    unit: "g",
    baseUnitPrice: 27.3,
    displayPriceUnit: "27.300đ/kg",
  },
  "đậu cove": {
    defaultQuantity: 200,
    unit: "g",
    baseUnitPrice: 50,
    displayPriceUnit: "10.000đ/200g",
  },
  tỏi: {
    defaultQuantity: 200,
    unit: "g",
    baseUnitPrice: 80,
    displayPriceUnit: "16.000đ/200g",
  },
  "cà pháo": {
    defaultQuantity: 200,
    unit: "g",
    baseUnitPrice: 40,
    displayPriceUnit: "8.000đ/200g",
  },
  "bạc hà": {
    defaultQuantity: 200,
    unit: "g",
    baseUnitPrice: 375,
    displayPriceUnit: "75.000đ/200g",
  },
  "me chua": {
    defaultQuantity: 250,
    unit: "g",
    baseUnitPrice: 54,
    displayPriceUnit: "13.500đ/250g",
  },
  tắc: {
    defaultQuantity: 200,
    unit: "g",
    baseUnitPrice: 300,
    displayPriceUnit: "60.000đ/200g",
  },
  "khổ qua": {
    defaultQuantity: 500,
    unit: "g",
    baseUnitPrice: 36,
    displayPriceUnit: "18.000đ/500g",
  },

  // Nấm (7 loại)
  "nấm kim châm": {
    defaultQuantity: 150,
    unit: "g",
    baseUnitPrice: 60,
    displayPriceUnit: "9.000đ/150g",
  },
  "nấm hương": {
    defaultQuantity: 150,
    unit: "g",
    baseUnitPrice: 140,
    displayPriceUnit: "21.000đ/150g",
  },
  "nấm đùi gà": {
    defaultQuantity: 200,
    unit: "g",
    baseUnitPrice: 150,
    displayPriceUnit: "30.000đ/200g",
  },
  "nấm bào ngư": {
    defaultQuantity: 300,
    unit: "g",
    baseUnitPrice: 60,
    displayPriceUnit: "18.000đ/300g",
  },
  "nấm tuyết": {
    defaultQuantity: 50,
    unit: "g",
    baseUnitPrice: 780,
    displayPriceUnit: "39.000đ/50g",
  },
  "nấm hương khô": {
    defaultQuantity: 50,
    unit: "g",
    baseUnitPrice: 640,
    displayPriceUnit: "32.000đ/50g",
  },
  "nấm mèo": {
    defaultQuantity: 50,
    unit: "g",
    baseUnitPrice: 320,
    displayPriceUnit: "16.000đ/50g",
  },

  // Thịt (Parent items)
  "thịt heo": {
    defaultQuantity: 300,
    unit: "g",
    baseUnitPrice: 150,
    displayPriceUnit: "150.000đ/kg",
  },
  "thịt bò": {
    defaultQuantity: 300,
    unit: "g",
    baseUnitPrice: 250,
    displayPriceUnit: "250.000đ/kg",
  },
  "thịt gà": {
    defaultQuantity: 300,
    unit: "g",
    baseUnitPrice: 160,
    displayPriceUnit: "160.000đ/kg",
  },

  tôm: {
    defaultQuantity: 200,
    unit: "g",
    baseUnitPrice: 300,
    displayPriceUnit: "300.000đ/kg",
  },
  cá: {
    defaultQuantity: 300,
    unit: "g",
    baseUnitPrice: 150,
    displayPriceUnit: "150.000đ/kg",
  },
  mực: {
    defaultQuantity: 200,
    unit: "g",
    baseUnitPrice: 275,
    displayPriceUnit: "275.000đ/kg",
  },

  "đậu hũ": {
    defaultQuantity: 2,
    unit: "miếng",
    baseUnitPrice: 4000,
    displayPriceUnit: "4.000đ/miếng",
  },
  "trứng gà": {
    defaultQuantity: 10,
    unit: "quả",
    baseUnitPrice: 3500,
    displayPriceUnit: "3.500đ/quả",
  },
  "trứng vịt": {
    defaultQuantity: 10,
    unit: "quả",
    baseUnitPrice: 3500,
    displayPriceUnit: "3.500đ/quả",
  },
  "trứng cút": {
    defaultQuantity: 10,
    unit: "quả",
    baseUnitPrice: 3500,
    displayPriceUnit: "3.500đ/quả",
  },
  "đậu xanh": {
    defaultQuantity: 200,
    unit: "g",
    baseUnitPrice: 50,
    displayPriceUnit: "50.000đ/kg",
  },

  gạo: {
    defaultQuantity: 1000,
    unit: "g",
    baseUnitPrice: 25,
    displayPriceUnit: "25.000đ/kg",
  },
  mì: {
    defaultQuantity: 500,
    unit: "g",
    baseUnitPrice: 24,
    displayPriceUnit: "24.000đ/kg",
  },
  bún: {
    defaultQuantity: 500,
    unit: "g",
    baseUnitPrice: 20,
    displayPriceUnit: "20.000đ/kg",
  },
  "bánh mì": {
    defaultQuantity: 4,
    unit: "ổ",
    baseUnitPrice: 5000,
    displayPriceUnit: "5.000đ/ổ",
  },
  miến: {
    defaultQuantity: 500,
    unit: "g",
    baseUnitPrice: 20,
    displayPriceUnit: "20.000đ/kg",
  },
  phở: {
    defaultQuantity: 500,
    unit: "g",
    baseUnitPrice: 20,
    displayPriceUnit: "20.000đ/kg",
  },
  "hủ tiếu": {
    defaultQuantity: 500,
    unit: "g",
    baseUnitPrice: 20,
    displayPriceUnit: "20.000đ/kg",
  },

  // Gia vị khô
  "nước mắm": {
    defaultQuantity: 500,
    unit: "ml",
    baseUnitPrice: 30,
    displayPriceUnit: "30.000đ/chai",
  },
  "dầu ăn": {
    defaultQuantity: 1000,
    unit: "ml",
    baseUnitPrice: 40,
    displayPriceUnit: "40.000đ/chai",
  },
  muối: {
    defaultQuantity: 500,
    unit: "g",
    baseUnitPrice: 10,
    displayPriceUnit: "10.000đ/kg",
  },
  đường: {
    defaultQuantity: 500,
    unit: "g",
    baseUnitPrice: 20,
    displayPriceUnit: "20.000đ/kg",
  },
  tiêu: {
    defaultQuantity: 50,
    unit: "g",
    baseUnitPrice: 150,
    displayPriceUnit: "150.000đ/kg",
  },
  "bột ngọt": {
    defaultQuantity: 200,
    unit: "g",
    baseUnitPrice: 25,
    displayPriceUnit: "25.000đ/kg",
  },
  "nước tương": {
    defaultQuantity: 500,
    unit: "ml",
    baseUnitPrice: 30,
    displayPriceUnit: "30.000đ/chai",
  },

  // Sữa & Khác
  "sữa tươi": {
    defaultQuantity: 1000,
    unit: "ml",
    baseUnitPrice: 35,
    displayPriceUnit: "35.000đ/hộp",
  },
  "sữa đặc": {
    defaultQuantity: 380,
    unit: "ml",
    baseUnitPrice: 25,
    displayPriceUnit: "25.000đ/hộp",
  },
  bơ: {
    defaultQuantity: 200,
    unit: "g",
    baseUnitPrice: 60,
    displayPriceUnit: "60.000đ/hộp",
  },

  // Trái cây
  "chuối sứ": {
    defaultQuantity: 500,
    unit: "g",
    baseUnitPrice: 19.6,
    displayPriceUnit: "19.600đ/kg",
  },
  táo: {
    defaultQuantity: 500,
    unit: "g",
    baseUnitPrice: 50,
    displayPriceUnit: "50.000đ/kg",
  },
  "cam sành": {
    defaultQuantity: 500,
    unit: "g",
    baseUnitPrice: 15,
    displayPriceUnit: "15.000đ/kg",
  },
  bưởi: {
    defaultQuantity: 500,
    unit: "g",
    baseUnitPrice: 40,
    displayPriceUnit: "40.000đ/kg",
  },
  "đu đủ": {
    defaultQuantity: 500,
    unit: "g",
    baseUnitPrice: 24.5,
    displayPriceUnit: "24.500đ/kg",
  },
  "xoài keo": {
    defaultQuantity: 500,
    unit: "g",
    baseUnitPrice: 24,
    displayPriceUnit: "24.000đ/kg",
  },
  "thanh long": {
    defaultQuantity: 500,
    unit: "g",
    baseUnitPrice: 12,
    displayPriceUnit: "12.000đ/kg",
  },
  "dưa hấu": {
    defaultQuantity: 5,
    unit: "quả",
    baseUnitPrice: 30,
    displayPriceUnit: "30.000đ/quả (~3kg)",
  },
  "dưa lưới": {
    defaultQuantity: 5,
    unit: "quả",
    baseUnitPrice: 41,
    displayPriceUnit: "41.000đ/quả",
  },
  mận: {
    defaultQuantity: 500,
    unit: "g",
    baseUnitPrice: 38.4,
    displayPriceUnit: "38.400đ/kg",
  },
  mít: {
    defaultQuantity: 500,
    unit: "g",
    baseUnitPrice: 28,
    displayPriceUnit: "28.000đ/kg",
  },
  "dưa gang": {
    defaultQuantity: 500,
    unit: "g",
    baseUnitPrice: 18.3,
    displayPriceUnit: "18.300đ/kg",
  },
  "dừa xiêm": {
    defaultQuantity: 500,
    unit: "trái",
    baseUnitPrice: 15.5,
    displayPriceUnit: "15.500đ/trái",
  },
};

interface ShoppingItem {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  baseUnitPrice: number;
  displayPriceUnit: string;
  checked: boolean;
  isParent?: boolean;
  subItems?: ShoppingItem[];
  parentId?: number;
}

interface ShoppingCategory {
  category: string;
  items: ShoppingItem[];
}

export default function Shopping() {
  const { toast } = useToast();
  const [customIngredients, setCustomIngredients] = useState("");
  const [nextCustomId, setNextCustomId] = useState(1000); // Start from 1000 to avoid conflicts
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  // Generate shopping list from ingredients with prices
  const generateInitialShoppingList = (): ShoppingCategory[] => {
    const grouped: Record<string, ShoppingItem[]> = {};
    let idCounter = 1;
    let subIdCounter = 10000; // Start sub-items from 10000

    vietnameseIngredients.forEach((ingredient) => {
      const priceInfo = ingredientPrices[ingredient.value];
      if (priceInfo) {
        const category = ingredient.category;
        if (!grouped[category]) {
          grouped[category] = [];
        }

        const hasSubItems = ingredientSubItems[ingredient.value];
        const itemId = idCounter++;

        const item: ShoppingItem = {
          id: itemId,
          name: ingredient.label,
          quantity: priceInfo.defaultQuantity,
          unit: priceInfo.unit,
          baseUnitPrice: priceInfo.baseUnitPrice,
          displayPriceUnit: priceInfo.displayPriceUnit,
          checked: false,
        };

        if (hasSubItems) {
          item.isParent = true;
          item.subItems = hasSubItems.map((sub) => ({
            id: subIdCounter++,
            name: sub.name,
            quantity: sub.priceInfo.defaultQuantity,
            unit: sub.priceInfo.unit,
            baseUnitPrice: sub.priceInfo.baseUnitPrice,
            displayPriceUnit: sub.priceInfo.displayPriceUnit,
            checked: false,
            parentId: itemId,
          }));
        }

        grouped[category].push(item);
      }
    });

    return Object.entries(grouped).map(([category, items]) => ({
      category,
      items,
    }));
  };

  const [shoppingList, setShoppingList] = useState<ShoppingCategory[]>(
    generateInitialShoppingList(),
  );

  const calculateItemPrice = (item: ShoppingItem): number => {
    return item.quantity * item.baseUnitPrice;
  };

  const totalPrice = shoppingList.reduce((total, category) => {
    return (
      total +
      category.items.reduce((sum, item) => {
        let itemTotal = item.checked ? calculateItemPrice(item) : 0;

        // Add sub-items if they exist and are checked
        if (item.subItems) {
          itemTotal += item.subItems.reduce(
            (subSum, subItem) =>
              subItem.checked ? subSum + calculateItemPrice(subItem) : subSum,
            0,
          );
        }

        return sum + itemTotal;
      }, 0)
    );
  }, 0);

  const toggleExpand = (itemId: number) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const handleItemCheck = (
    categoryIndex: number,
    itemId: number,
    isSubItem = false,
    parentId?: number,
  ) => {
    setShoppingList((prev) =>
      prev.map((category, idx) => {
        if (idx === categoryIndex) {
          return {
            ...category,
            items: category.items.map((item) => {
              if (isSubItem && item.id === parentId && item.subItems) {
                // Check/uncheck sub-item
                return {
                  ...item,
                  subItems: item.subItems.map((subItem) =>
                    subItem.id === itemId
                      ? { ...subItem, checked: !subItem.checked }
                      : subItem,
                  ),
                };
              } else if (!isSubItem && item.id === itemId) {
                // Check/uncheck parent item
                return { ...item, checked: !item.checked };
              }
              return item;
            }),
          };
        }
        return category;
      }),
    );
  };

  const handleQuantityChange = (
    categoryIndex: number,
    itemId: number,
    newQuantity: string,
    isSubItem = false,
    parentId?: number,
  ) => {
    const quantity = parseFloat(newQuantity) || 0;
    setShoppingList((prev) =>
      prev.map((category, idx) => {
        if (idx === categoryIndex) {
          return {
            ...category,
            items: category.items.map((item) => {
              if (isSubItem && item.id === parentId && item.subItems) {
                // Update sub-item quantity
                return {
                  ...item,
                  subItems: item.subItems.map((subItem) =>
                    subItem.id === itemId ? { ...subItem, quantity } : subItem,
                  ),
                };
              } else if (!isSubItem && item.id === itemId) {
                // Update parent item quantity
                return { ...item, quantity };
              }
              return item;
            }),
          };
        }
        return category;
      }),
    );
  };

  const handleDownload = async () => {
    // Get only checked items (including sub-items)
    const checkedCategories = shoppingList
      .map((category) => {
        const allCheckedItems: ShoppingItem[] = [];

        category.items.forEach((item) => {
          // Add checked parent items (non-parent items)
          if (!item.isParent && item.checked) {
            allCheckedItems.push(item);
          }

          // Add checked sub-items
          if (item.subItems) {
            item.subItems.forEach((subItem) => {
              if (subItem.checked) {
                allCheckedItems.push(subItem);
              }
            });
          }
        });

        return {
          ...category,
          items: allCheckedItems,
        };
      })
      .filter((category) => category.items.length > 0);

    // Create HTML content for rendering
    const contentDiv = document.createElement("div");
    contentDiv.style.width = "800px";
    contentDiv.style.padding = "40px";
    contentDiv.style.backgroundColor = "white";
    contentDiv.style.fontFamily = "'Lexend', 'Inter', sans-serif";
    contentDiv.style.color = "#2a321b";

    let htmlContent = `
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="font-size: 28px; font-weight: bold; color: #556B2F; margin: 0 0 10px 0;">
          DANH SÁCH MUA SẮM
        </h1>
        <div style="font-size: 14px; color: #666; line-height: 1.6;">
          <p style="margin: 5px 0;"><strong>Khu vực:</strong> TP Hồ Chí Minh</p>
          <p style="margin: 5px 0;"><strong>Giá cập nhật:</strong> Tháng 1/2025</p>
          <p style="margin: 5px 0; font-style: italic; font-size: 12px;">
            Lưu ý: Giá có thể chênh lệch giữa các khu vực khác nhau
          </p>
        </div>
      </div>
      <hr style="border: none; border-top: 3px solid #8FA31E; margin: 20px 0;" />
    `;

    if (checkedCategories.length === 0) {
      htmlContent += `
        <p style="text-align: center; font-size: 16px; color: #666; margin: 40px 0;">
          Chưa có món nào được chọn.
        </p>
      `;
    } else {
      checkedCategories.forEach((category) => {
        htmlContent += `
          <div style="margin-bottom: 30px;">
            <h2 style="font-size: 20px; font-weight: bold; color: #556B2F; margin: 0 0 15px 0; text-transform: uppercase; border-bottom: 2px solid #C6D870; padding-bottom: 8px;">
              ${category.category}
            </h2>
        `;

        category.items.forEach((item) => {
          const itemPrice = calculateItemPrice(item);
          htmlContent += `
            <div style="margin: 15px 0 15px 20px; padding-left: 15px; border-left: 4px solid #C6D870;">
              <div style="font-size: 16px; font-weight: 600; color: #2a321b; margin-bottom: 5px;">
                ☑ ${item.name} - ${item.quantity}${item.unit}
              </div>
              <div style="font-size: 14px; color: #666;">
                Giá: <strong style="color: #8FA31E;">${itemPrice.toLocaleString("vi-VN")}đ</strong> 
                <span style="color: #999;">(${item.displayPriceUnit})</span>
              </div>
            </div>
          `;
        });

        htmlContent += `</div>`;
      });
    }

    htmlContent += `
      <hr style="border: none; border-top: 3px solid #8FA31E; margin: 30px 0 20px 0;" />
      <div style="text-align: right;">
        <p style="font-size: 22px; font-weight: bold; color: #556B2F; margin: 0;">
          TỔNG CHI PHÍ: <span style="color: #8FA31E;">${totalPrice.toLocaleString("vi-VN")}đ</span>
        </p>
      </div>
    `;

    contentDiv.innerHTML = htmlContent;
    contentDiv.style.position = "fixed";
    contentDiv.style.left = "0";
    contentDiv.style.top = "0";
    contentDiv.style.zIndex = "-1000";
    document.body.appendChild(contentDiv);

    try {
      // Capture the div as an image
      const canvas = await html2canvas(contentDiv, {
        scale: 2,
        backgroundColor: "#ffffff",
        logging: false,
      });

      // Create PDF
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgData = canvas.toDataURL("image/png");
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      // Add first page
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= 297; // A4 height in mm

      // Add additional pages if needed
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= 297;
      }

      // Save PDF
      pdf.save(
        `danh-sach-mua-sam-${new Date().toISOString().split("T")[0]}.pdf`,
      );
    } finally {
      // Clean up
      document.body.removeChild(contentDiv);
    }
  };

  const handleClearList = () => {
    setShoppingList((prev) =>
      prev.map((category) => ({
        ...category,
        items: category.items.map((item) => ({
          ...item,
          checked: false,
        })),
      })),
    );
  };

  const handleAddCustomIngredients = () => {
    if (!customIngredients.trim()) {
      toast({
        title: "Chưa nhập nguyên liệu",
        description: "Vui lòng nhập tên nguyên liệu cần mua.",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }

    // Parse ingredients (split by comma)
    const ingredientNames = customIngredients
      .split(",")
      .map((name) => name.trim())
      .filter((name) => name.length > 0);

    if (ingredientNames.length === 0) {
      toast({
        title: "Chưa nhập nguyên liệu",
        description: "Vui lòng nhập tên nguyên liệu cần mua.",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }

    // Create new items with default pricing
    const newItems: ShoppingItem[] = ingredientNames.map((name, index) => ({
      id: nextCustomId + index,
      name: name,
      quantity: 1,
      unit: "phần",
      baseUnitPrice: 10000, // Default 10,000đ per portion
      displayPriceUnit: "10.000đ/phần",
      checked: false,
    }));

    setNextCustomId(nextCustomId + ingredientNames.length);

    // Add to shopping list in "Nguyên liệu khác" category
    setShoppingList((prev) => {
      const customCategory = prev.find(
        (cat) => cat.category === "Nguyên liệu khác",
      );

      if (customCategory) {
        // Category exists, add to it
        return prev.map((cat) =>
          cat.category === "Nguyên liệu khác"
            ? { ...cat, items: [...cat.items, ...newItems] }
            : cat,
        );
      } else {
        // Create new category
        return [
          ...prev,
          {
            category: "Nguyên liệu khác",
            items: newItems,
          },
        ];
      }
    });

    // Clear input and show success
    setCustomIngredients("");
    toast({
      title: "Đã thêm nguyên liệu!",
      description: `Đã thêm ${ingredientNames.length} nguyên liệu vào danh sách mua sắm.`,
      duration: 2000,
    });
  };

  return (
    <>
      <AutoDismissBanner />
      <div className="flex-1 py-12 px-4 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-['Lexend']">
              Danh Sách Mua Sắm
            </h1>
            <p className="text-muted-foreground text-lg mb-2">
              Danh sách nguyên liệu cần mua từ thực đơn đã lập
            </p>
            <div className="flex flex-col gap-1 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Khu vực:</span>
                <span className="font-semibold text-accent">
                  TP Hồ Chí Minh
                </span>
                <span className="text-muted-foreground">
                  • Giá cập nhật: Tháng 1/2025
                </span>
              </div>
              <p className="text-muted-foreground italic text-xs">
                Giá được thể hiện ở đây có thể có sự chênh lệch giữa các khu vực
                khác nhau, với mức sống khác nhau. Vui lòng kiểm tra thật kĩ.
                Xin cảm ơn.
              </p>
            </div>
          </div>

          <Card className="p-6 mb-6 bg-muted/30">
            <h3 className="text-lg font-semibold text-primary mb-3 font-['Lexend']">
              Thêm Nguyên Liệu Khác
            </h3>
            <div className="space-y-3">
              <div>
                <Label htmlFor="custom-ingredients" className="text-sm">
                  Nhập nguyên liệu không có trong danh sách
                </Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    id="custom-ingredients"
                    type="text"
                    placeholder="Ví dụ: Rau ngót, Mướp đắng, Sườn non..."
                    value={customIngredients}
                    onChange={(e) => setCustomIngredients(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleAddCustomIngredients();
                      }
                    }}
                    className="flex-1"
                    data-testid="input-custom-ingredients"
                  />
                  <Button
                    onClick={handleAddCustomIngredients}
                    data-testid="button-add-custom-ingredients"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Thêm
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-1.5">
                  💡 Nhập các nguyên liệu cách nhau bằng dấu phẩy. Giá mặc định:
                  10.000đ/phần
                </p>
              </div>
            </div>
          </Card>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex gap-3">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={handleDownload}
                    data-testid="button-download-list"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Tải danh sách
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Tải xuống danh sách mua sắm dưới dạng PDF</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    onClick={handleClearList}
                    data-testid="button-clear-list"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Xóa danh sách
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Bỏ chọn tất cả các món</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Card className="px-4 py-3 bg-accent/10 border-accent">
              <div className="text-sm text-muted-foreground">
                Tổng chi phí (đã chọn)
              </div>
              <div className="text-2xl font-bold text-accent font-['Lexend']">
                {totalPrice.toLocaleString("vi-VN")}đ
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            {shoppingList.map((category, categoryIndex) => (
              <Card key={category.category} className="p-6">
                <h3 className="text-xl font-semibold text-primary mb-4 font-['Lexend']">
                  {category.category}
                </h3>
                <ul className="space-y-3">
                  {category.items.map((item) => {
                    const itemPrice = calculateItemPrice(item);
                    const isExpanded = expandedItems.has(item.id);

                    return (
                      <li
                        key={item.id}
                        className="space-y-2"
                        data-testid={`item-${item.id}`}
                      >
                        <div className="flex items-start gap-3">
                          {item.isParent ? (
                            <button
                              onClick={() => toggleExpand(item.id)}
                              className="mt-1 hover-elevate active-elevate-2 p-1 rounded"
                              data-testid={`button-expand-${item.id}`}
                            >
                              {isExpanded ? (
                                <ChevronDown className="h-4 w-4 text-primary" />
                              ) : (
                                <ChevronRight className="h-4 w-4 text-primary" />
                              )}
                            </button>
                          ) : (
                            <Checkbox
                              checked={item.checked}
                              onCheckedChange={() =>
                                handleItemCheck(categoryIndex, item.id)
                              }
                              className="mt-1"
                              data-testid={`checkbox-item-${item.id}`}
                            />
                          )}

                          <div className="flex-1">
                            <div
                              className={`flex items-baseline justify-between gap-2 ${
                                item.isParent
                                  ? "text-foreground font-semibold cursor-pointer"
                                  : item.checked
                                    ? "text-muted-foreground"
                                    : "text-foreground"
                              }`}
                              onClick={() =>
                                item.isParent && toggleExpand(item.id)
                              }
                            >
                              <span className="font-medium">
                                {item.name}
                                {item.isParent && (
                                  <span className="text-xs text-muted-foreground ml-2">
                                    ({item.subItems?.length} loại)
                                  </span>
                                )}
                              </span>
                              {!item.isParent && (
                                <span className="font-semibold text-accent whitespace-nowrap">
                                  {itemPrice.toLocaleString("vi-VN")}đ
                                </span>
                              )}
                            </div>

                            {!item.isParent && (
                              <div className="flex items-center gap-2 mt-2">
                                <Input
                                  type="number"
                                  min="0"
                                  step={item.unit === "g" ? "10" : "1"}
                                  value={item.quantity}
                                  onChange={(e) =>
                                    handleQuantityChange(
                                      categoryIndex,
                                      item.id,
                                      e.target.value,
                                    )
                                  }
                                  className="w-24 h-8 text-sm"
                                  data-testid={`input-quantity-${item.id}`}
                                />
                                <span className="text-sm text-muted-foreground">
                                  {item.unit} • {item.displayPriceUnit}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Sub-items */}
                        {item.isParent && isExpanded && item.subItems && (
                          <ul className="ml-8 space-y-2 border-l-2 border-muted pl-4">
                            {item.subItems.map((subItem) => {
                              const subItemPrice = calculateItemPrice(subItem);
                              return (
                                <li
                                  key={subItem.id}
                                  className="flex items-start gap-3"
                                  data-testid={`subitem-${subItem.id}`}
                                >
                                  <Checkbox
                                    checked={subItem.checked}
                                    onCheckedChange={() =>
                                      handleItemCheck(
                                        categoryIndex,
                                        subItem.id,
                                        true,
                                        item.id,
                                      )
                                    }
                                    className="mt-1"
                                    data-testid={`checkbox-subitem-${subItem.id}`}
                                  />
                                  <div className="flex-1">
                                    <div
                                      className={`flex items-baseline justify-between gap-2 ${
                                        subItem.checked
                                          ? "text-muted-foreground"
                                          : "text-foreground"
                                      }`}
                                    >
                                      <span className="font-medium text-sm">
                                        {subItem.name}
                                      </span>
                                      <span className="font-semibold text-accent whitespace-nowrap text-sm">
                                        {subItemPrice.toLocaleString("vi-VN")}đ
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-2 mt-2">
                                      <Input
                                        type="number"
                                        min="0"
                                        step={subItem.unit === "g" ? "10" : "1"}
                                        value={subItem.quantity}
                                        onChange={(e) =>
                                          handleQuantityChange(
                                            categoryIndex,
                                            subItem.id,
                                            e.target.value,
                                            true,
                                            item.id,
                                          )
                                        }
                                        className="w-24 h-8 text-sm"
                                        data-testid={`input-quantity-subitem-${subItem.id}`}
                                      />
                                      <span className="text-sm text-muted-foreground">
                                        {subItem.unit} •{" "}
                                        {subItem.displayPriceUnit}
                                      </span>
                                    </div>
                                  </div>
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
