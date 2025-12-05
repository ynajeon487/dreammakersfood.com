export interface Recipe {
  id: number;
  name: string;
  image: string;
  price: number;
  cookTime: number;
  servings: number;
  rating: number;
  mealType: string;
  description: string;
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  ingredients: Array<{
    name: string;
    amount: string;
    substitute: string | null;
  }>;
  steps: Array<{
    step: number;
    description: string;
  }>;
  costBreakdown: {
    main: number;
    seasoning: number;
  };
}

export const recipesData: Recipe[] = [
  {
    id: 1,
    name: 'Trứng chiên cà chua',
    image: 'Scrambled_eggs_with_tomatoes_21887b7f.png',
    price: 15000,
    cookTime: 15,
    servings: 1,
    rating: 4.8,
    mealType: 'Bữa sáng',
    description: 'Món ăn sáng đơn giản, nhanh chóng và đầy đủ dinh dưỡng. Kết hợp giữa trứng giàu protein và cà chua giàu vitamin C.',
    nutrition: {
      calories: 280,
      protein: 14,
      carbs: 12,
      fat: 18,
    },
    ingredients: [
      { name: 'Trứng gà', amount: '2 quả', substitute: 'Trứng vịt (nhỏ hơn)' },
      { name: 'Cà chua', amount: '2 quả (300g)', substitute: 'Cà chua bi (4-5 quả)' },
      { name: 'Hành lá', amount: '1 cây', substitute: 'Hành tây' },
      { name: 'Tỏi', amount: '1 tép', substitute: null },
      { name: 'Dầu ăn', amount: '2 muỗng', substitute: 'Mỡ lợn' },
      { name: 'Muối, đường', amount: 'Vừa đủ', substitute: null },
    ],
    steps: [
      {
        step: 1,
        description: 'Rửa sạch cà chua, cắt múi cau. Đập trứng vào bát, thêm chút muối và đánh tan.',
      },
      {
        step: 2,
        description: 'Phi tỏi thơm, cho cà chua vào xào mềm. Nêm nếm gia vị cho vừa miệng.',
      },
      {
        step: 3,
        description: 'Đổ trứng vào, đợi trứng chín vàng một mặt rồi lật mặt. Rắc hành lá và tắt bếp.',
      },
      {
        step: 4,
        description: 'Múc ra đĩa, ăn kèm với cơm nóng. Có thể thêm rau sống để tăng chất xơ.',
      },
    ],
    costBreakdown: {
      main: 12000,
      seasoning: 3000,
    },
  },
  {
    id: 2,
    name: 'Rau muống xào tỏi',
    image: 'Stir-fried_morning_glory_b8c1df15.png',
    price: 12000,
    cookTime: 10,
    servings: 2,
    rating: 4.6,
    mealType: 'Bữa trưa',
    description: 'Món rau xanh đơn giản, giàu chất xơ và vitamin. Phù hợp cho bữa trưa nhẹ nhàng hoặc ăn kèm với các món chính.',
    nutrition: {
      calories: 120,
      protein: 4,
      carbs: 15,
      fat: 6,
    },
    ingredients: [
      { name: 'Rau muống', amount: '300g', substitute: 'Rau cải ngọt' },
      { name: 'Tỏi', amount: '4-5 tép', substitute: 'Hành tím' },
      { name: 'Dầu ăn', amount: '2 muỗng', substitute: null },
      { name: 'Nước mắm', amount: '1 muỗng', substitute: 'Muối' },
      { name: 'Đường', amount: '1/2 muỗng', substitute: null },
    ],
    steps: [
      {
        step: 1,
        description: 'Rau muống nhặt bỏ lá úa, rửa sạch và để ráo nước. Tỏi băm nhỏ.',
      },
      {
        step: 2,
        description: 'Đun nóng chảo, cho dầu vào và phi thơm tỏi.',
      },
      {
        step: 3,
        description: 'Cho rau muống vào xào nhanh tay trên lửa lớn, nêm nếm gia vị.',
      },
      {
        step: 4,
        description: 'Xào đến khi rau vừa chín tái, tắt bếp và múc ra đĩa.',
      },
    ],
    costBreakdown: {
      main: 9000,
      seasoning: 3000,
    },
  },
  {
    id: 3,
    name: 'Cơm chiên trứng',
    image: 'Vietnamese_fried_rice_170f31d9.png',
    price: 20000,
    cookTime: 20,
    servings: 1,
    rating: 4.9,
    mealType: 'Bữa tối',
    description: 'Món cơm chiên đơn giản nhưng ngon miệng, tận dụng cơm nguội. Giá trị dinh dưỡng cao, no lâu, phù hợp cho bữa tối.',
    nutrition: {
      calories: 520,
      protein: 16,
      carbs: 68,
      fat: 20,
    },
    ingredients: [
      { name: 'Cơm nguội', amount: '1 bát (200g)', substitute: null },
      { name: 'Trứng gà', amount: '2 quả', substitute: 'Trứng vịt' },
      { name: 'Xúc xích', amount: '2 chiếc', substitute: 'Thịt heo xay' },
      { name: 'Hành tây', amount: '1/2 củ', substitute: 'Hành lá' },
      { name: 'Tỏi', amount: '2 tép', substitute: null },
      { name: 'Dầu ăn, nước mắm, hạt nêm', amount: 'Vừa đủ', substitute: null },
    ],
    steps: [
      {
        step: 1,
        description: 'Cơm nguội xới tơi. Đập trứng vào bát và đánh tan. Xúc xích thái hạt lựu, hành tây và tỏi băm nhỏ.',
      },
      {
        step: 2,
        description: 'Đun nóng chảo, cho dầu vào và đổ trứng vào chiên sơ, xới tơi ra.',
      },
      {
        step: 3,
        description: 'Phi tỏi thơm, cho xúc xích và hành tây vào xào săn.',
      },
      {
        step: 4,
        description: 'Cho cơm vào đảo đều, nêm nếm gia vị. Xào đến khi cơm tơi và thơm, múc ra đĩa.',
      },
    ],
    costBreakdown: {
      main: 16000,
      seasoning: 4000,
    },
  },
  {
    id: 4,
    name: 'Mì tôm nâng cấp',
    image: 'Upgraded_instant_noodles_75cdd539.png',
    price: 18000,
    cookTime: 12,
    servings: 1,
    rating: 4.7,
    mealType: 'Ăn vặt',
    description: 'Nâng cấp mì tôm thành món ăn đầy đủ dinh dưỡng với trứng và rau củ. Tiện lợi cho những lúc bận rộn.',
    nutrition: {
      calories: 450,
      protein: 16,
      carbs: 52,
      fat: 18,
    },
    ingredients: [
      { name: 'Mì tôm', amount: '1 gói', substitute: 'Mì khô bất kỳ' },
      { name: 'Trứng', amount: '1 quả', substitute: null },
      { name: 'Rau cải', amount: '100g', substitute: 'Rau muống' },
      { name: 'Cà chua', amount: '1 quả nhỏ', substitute: null },
      { name: 'Hành lá', amount: '1 cây', substitute: null },
      { name: 'Xúc xích', amount: '1 chiếc (tùy chọn)', substitute: 'Thịt heo' },
    ],
    steps: [
      {
        step: 1,
        description: 'Rửa sạch rau cải và cà chua. Cà chua thái múi cau.',
      },
      {
        step: 2,
        description: 'Đun sôi nước, cho mì vào luộc 2 phút. Thêm rau cải và cà chua vào.',
      },
      {
        step: 3,
        description: 'Đập trứng vào, đợi trứng chín. Nêm gia vị theo gói mì hoặc theo khẩu vị.',
      },
      {
        step: 4,
        description: 'Rắc hành lá lên trên, tắt bếp. Múc ra tô và thưởng thức nóng.',
      },
    ],
    costBreakdown: {
      main: 15000,
      seasoning: 3000,
    },
  },
  {
    id: 5,
    name: 'Cháo gà',
    image: 'Chicken_rice_porridge_19a95b8b.png',
    price: 25000,
    cookTime: 30,
    servings: 2,
    rating: 4.8,
    mealType: 'Bữa sáng',
    description: 'Cháo gà thơm ngon, bổ dưỡng. Phù hợp cho bữa sáng đầy đủ năng lượng hoặc khi ốm đau cần món ăn nhẹ nhàng.',
    nutrition: {
      calories: 320,
      protein: 22,
      carbs: 45,
      fat: 6,
    },
    ingredients: [
      { name: 'Gạo tẻ', amount: '100g', substitute: 'Gạo nếp' },
      { name: 'Thịt gà', amount: '200g (đùi hoặc ức)', substitute: 'Thịt heo' },
      { name: 'Gừng', amount: '2 lát', substitute: null },
      { name: 'Hành lá', amount: '2 cây', substitute: null },
      { name: 'Nước mắm, muối', amount: 'Vừa đủ', substitute: null },
      { name: 'Tiêu, ngò rí', amount: 'Trang trí', substitute: null },
    ],
    steps: [
      {
        step: 1,
        description: 'Gạo vo sạch, ngâm 30 phút. Thịt gà rửa sạch, luộc sơ với gừng.',
      },
      {
        step: 2,
        description: 'Cho gạo vào nồi với nước luộc gà, nấu trên lửa vừa khoảng 25 phút.',
      },
      {
        step: 3,
        description: 'Thịt gà luộc chín xé nhỏ. Khi cháo sánh, cho thịt gà vào và nêm nếm.',
      },
      {
        step: 4,
        description: 'Múc ra tô, rắc hành lá, tiêu và ngò rí. Ăn kèm với quẩy hoặc bánh mì.',
      },
    ],
    costBreakdown: {
      main: 20000,
      seasoning: 5000,
    },
  },
  {
    id: 6,
    name: 'Thịt kho trứng',
    image: 'Vietnamese_braised_pork_with_eggs_7b5f6288.png',
    price: 28000,
    cookTime: 40,
    servings: 2,
    rating: 4.9,
    mealType: 'Bữa trưa',
    description: 'Món ăn truyền thống Việt Nam, thịt ba chỉ kho ngọt đậm đà với trứng. Ăn kèm cơm nóng rất ngon, có thể để được nhiều bữa.',
    nutrition: {
      calories: 480,
      protein: 24,
      carbs: 18,
      fat: 32,
    },
    ingredients: [
      { name: 'Thịt ba chỉ', amount: '300g', substitute: 'Thịt nạc vai' },
      { name: 'Trứng gà', amount: '4 quả', substitute: 'Trứng vịt' },
      { name: 'Nước dừa', amount: '200ml', substitute: 'Nước lọc' },
      { name: 'Hành tím', amount: '3 củ', substitute: 'Hành tây' },
      { name: 'Đường, nước mắm', amount: 'Vừa đủ', substitute: null },
      { name: 'Tiêu, ớt', amount: 'Tùy khẩu vị', substitute: null },
    ],
    steps: [
      {
        step: 1,
        description: 'Thịt rửa sạch thái miếng vừa ăn. Trứng luộc chín, bóc vỏ. Hành tím bóc vỏ.',
      },
      {
        step: 2,
        description: 'Ướp thịt với nước mắm, tiêu, đường trong 15 phút.',
      },
      {
        step: 3,
        description: 'Phi hành tím cho thơm, cho thịt vào xào săn. Thêm nước dừa vào.',
      },
      {
        step: 4,
        description: 'Kho lửa nhỏ 30 phút, thêm trứng vào kho thêm 10 phút. Nêm nếm lại cho vừa miệng.',
      },
    ],
    costBreakdown: {
      main: 23000,
      seasoning: 5000,
    },
  },
  {
    id: 7,
    name: 'Canh chua cá',
    image: 'Vietnamese_sour_fish_soup_1d225652.png',
    price: 22000,
    cookTime: 25,
    servings: 2,
    rating: 4.7,
    mealType: 'Bữa tối',
    description: 'Canh chua thanh mát, kích thích vị giác. Canh cá giàu omega-3, kết hợp với rau củ và thơm chua ngọt hài hòa.',
    nutrition: {
      calories: 180,
      protein: 18,
      carbs: 16,
      fat: 6,
    },
    ingredients: [
      { name: 'Cá (rô phi, lóc)', amount: '300g', substitute: 'Tôm' },
      { name: 'Cà chua', amount: '2 quả', substitute: null },
      { name: 'Thơm', amount: '1/4 quả', substitute: 'Dứa' },
      { name: 'Giá đỗ', amount: '100g', substitute: 'Rau muống' },
      { name: 'Me, đường, nước mắm', amount: 'Vừa đủ', substitute: 'Tương chua' },
      { name: 'Ngò rí, rau thơm', amount: 'Trang trí', substitute: null },
    ],
    steps: [
      {
        step: 1,
        description: 'Cá rửa sạch, cắt khúc vừa ăn. Me ngâm nước lọc bỏ hạt.',
      },
      {
        step: 2,
        description: 'Cà chua thái múi cau, thơm thái miếng. Rau ngò rí, giá đỗ rửa sạch.',
      },
      {
        step: 3,
        description: 'Đun sôi nước, cho cà chua và thơm vào nấu. Thêm nước me, nêm gia vị.',
      },
      {
        step: 4,
        description: 'Cho cá vào nấu chín, cuối cùng thêm giá đỗ và rau thơm. Tắt bếp.',
      },
    ],
    costBreakdown: {
      main: 18000,
      seasoning: 4000,
    },
  },
  {
    id: 8,
    name: 'Đậu hũ sốt cà chua',
    image: 'Vietnamese_tofu_tomato_sauce_8ef66d72.png',
    price: 15000,
    cookTime: 18,
    servings: 2,
    rating: 4.5,
    mealType: 'Bữa trưa',
    description: 'Món chay bổ dưỡng, giàu protein thực vật. Đậu hũ chiên giòn ăn kèm sốt cà chua chua ngọt đậm đà.',
    nutrition: {
      calories: 220,
      protein: 15,
      carbs: 18,
      fat: 12,
    },
    ingredients: [
      { name: 'Đậu hũ', amount: '2 miếng (300g)', substitute: 'Đậu phụ non' },
      { name: 'Cà chua', amount: '3 quả', substitute: null },
      { name: 'Hành lá', amount: '2 cây', substitute: null },
      { name: 'Tỏi', amount: '2 tép', substitute: null },
      { name: 'Tương ớt, nước tương', amount: 'Vừa đủ', substitute: 'Nước mắm' },
      { name: 'Dầu ăn, đường', amount: 'Vừa đủ', substitute: null },
    ],
    steps: [
      {
        step: 1,
        description: 'Đậu hũ rửa sạch, thái miếng vuông vừa ăn. Cà chua thái hạt lựu.',
      },
      {
        step: 2,
        description: 'Chiên đậu hũ vàng đều cả hai mặt, vớt ra để ráo dầu.',
      },
      {
        step: 3,
        description: 'Phi tỏi thơm, cho cà chua vào xào mềm. Nêm nếm gia vị cho vừa miệng.',
      },
      {
        step: 4,
        description: 'Cho đậu hũ chiên vào đảo đều với sốt. Rắc hành lá lên trên và tắt bếp.',
      },
    ],
    costBreakdown: {
      main: 11000,
      seasoning: 4000,
    },
  },
];
