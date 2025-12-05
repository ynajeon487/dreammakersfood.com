import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Loader2, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { parseMarkdown } from "@/lib/markdown";
import { motion, useReducedMotion } from "framer-motion";
import AutoDismissBanner from "@/components/AutoDismissBanner";

export default function MenuByDay() {
  const shouldReduceMotion = useReducedMotion();
  const [budget, setBudget] = useState("");
  const [servings, setServings] = useState("");
  const [mealsPerDay, setMealsPerDay] = useState("");
  const [diet, setDiet] = useState("");
  const [skillLevel, setSkillLevel] = useState("");
  const [allergies, setAllergies] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [generatedMenu, setGeneratedMenu] = useState("");
  const [errors, setErrors] = useState({
    budget: false,
    servings: false,
    mealsPerDay: false,
    diet: false,
    skillLevel: false,
  });
  const { toast } = useToast();

  const handleGenerateMenu = async () => {
    const newErrors = {
      budget: !budget || budget.trim() === "",
      servings: !servings || servings.trim() === "",
      mealsPerDay: !mealsPerDay,
      diet: !diet,
      skillLevel: !skillLevel,
    };
    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) {
      toast({
        title: "Chưa thể tạo thực đơn",
        description: "Hãy cung cấp thêm thông tin bạn nhé!",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }

    setIsLoading(true);
    setGeneratedMenu("");

    try {
      const response = await fetch("/api/generate-menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          budget,
          servings,
          mealsPerDay,
          diet,
          skillLevel,
          allergies,
        }),
      });

      if (!response.ok) throw new Error("Failed to generate menu");
      const data = await response.json();
      setGeneratedMenu(data.menu);
    } catch (error) {
      console.error("Error generating menu:", error);
      setGeneratedMenu(
        "Xin lỗi, đã có lỗi xảy ra khi tạo thực đơn. Vui lòng thử lại sau.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AutoDismissBanner />
      <section className="py-16 px-4 bg-background">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-10"
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              shouldReduceMotion ? { duration: 0 } : { duration: 0.5 }
            }
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-['Lexend']">
              Tạo Thực Đơn Của Bạn
            </h2>
            <p className="text-muted-foreground text-lg">
              Điền thông tin dưới đây để nhận thực đơn phù hợp với nhu cầu của
              bạn
            </p>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.5, delay: 0.2 }
            }
          >
            <Card className="p-6 md:p-8">
              {/* Hàng 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="budget"
                    className={errors.budget ? "text-destructive" : ""}
                  >
                    Ngân sách (VNĐ/ngày){" "}
                    <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="budget"
                    type="number"
                    placeholder="Ví dụ: 50000"
                    value={budget}
                    onChange={(e) => {
                      setBudget(e.target.value);
                      setErrors((prev) => ({ ...prev, budget: false }));
                    }}
                    className={
                      errors.budget
                        ? "border-destructive focus-visible:ring-destructive"
                        : ""
                    }
                    data-testid="input-budget"
                  />
                  {errors.budget && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      Vui lòng nhập ngân sách
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="servings"
                    className={errors.servings ? "text-destructive" : ""}
                  >
                    Số người <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="servings"
                    type="number"
                    placeholder="Ví dụ: 2"
                    value={servings}
                    onChange={(e) => {
                      setServings(e.target.value);
                      setErrors((prev) => ({ ...prev, servings: false }));
                    }}
                    className={
                      errors.servings
                        ? "border-destructive focus-visible:ring-destructive"
                        : ""
                    }
                    data-testid="input-servings"
                  />
                  {errors.servings && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      Vui lòng nhập số người
                    </p>
                  )}
                </div>
              </div>

              {/* Hàng 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="meals"
                    className={errors.mealsPerDay ? "text-destructive" : ""}
                  >
                    Số bữa/ngày <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={mealsPerDay}
                    onValueChange={(value) => {
                      setMealsPerDay(value);
                      setErrors((prev) => ({ ...prev, mealsPerDay: false }));
                    }}
                  >
                    <SelectTrigger
                      id="meals"
                      className={
                        errors.mealsPerDay
                          ? "border-destructive focus:ring-destructive"
                          : ""
                      }
                      data-testid="select-meals"
                    >
                      <SelectValue placeholder="Chọn số bữa" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 bữa</SelectItem>
                      <SelectItem value="2">2 bữa</SelectItem>
                      <SelectItem value="3">3 bữa</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.mealsPerDay && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      Vui lòng chọn số bữa
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="diet"
                    className={errors.diet ? "text-destructive" : ""}
                  >
                    Chế độ ăn <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={diet}
                    onValueChange={(value) => {
                      setDiet(value);
                      setErrors((prev) => ({ ...prev, diet: false }));
                    }}
                  >
                    <SelectTrigger
                      id="diet"
                      className={
                        errors.diet
                          ? "border-destructive focus:ring-destructive"
                          : ""
                      }
                      data-testid="select-diet"
                    >
                      <SelectValue placeholder="Chọn chế độ ăn" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Bình thường</SelectItem>
                      <SelectItem value="vegetarian">Ăn chay</SelectItem>
                      <SelectItem value="low-carb">Ít tinh bột</SelectItem>
                      <SelectItem value="high-protein">Nhiều đạm</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.diet && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      Vui lòng chọn chế độ ăn
                    </p>
                  )}
                </div>
              </div>

              {/* Hàng 3: KỸ NĂNG & DỊ ỨNG (cùng hàng) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="skill"
                    className={errors.skillLevel ? "text-destructive" : ""}
                  >
                    Mức độ kỹ năng <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={skillLevel}
                    onValueChange={(value) => {
                      setSkillLevel(value);
                      setErrors((prev) => ({ ...prev, skillLevel: false }));
                    }}
                  >
                    <SelectTrigger
                      id="skill"
                      className={
                        errors.skillLevel
                          ? "border-destructive focus:ring-destructive"
                          : ""
                      }
                      data-testid="select-skill"
                    >
                      <SelectValue placeholder="Chọn kỹ năng" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Mới bắt đầu</SelectItem>
                      <SelectItem value="intermediate">Trung bình</SelectItem>
                      <SelectItem value="advanced">Thành thạo</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.skillLevel && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      Vui lòng chọn kỹ năng
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="allergies">
                    Dị ứng thực phẩm{" "}
                    <span className="text-muted-foreground">
                      (không bắt buộc)
                    </span>
                  </Label>
                  <Input
                    id="allergies"
                    type="text"
                    placeholder="VD: Tôm, Cua, Sữa, Đậu phộng..."
                    value={allergies}
                    onChange={(e) => setAllergies(e.target.value)}
                    data-testid="input-allergies"
                  />
                  <p className="text-sm text-muted-foreground">
                    Liệt kê các thực phẩm bạn dị ứng, cách nhau bằng dấu phẩy.
                  </p>
                </div>
              </div>

              <Button
                className="w-full bg-primary text-primary-foreground text-lg py-6"
                onClick={handleGenerateMenu}
                disabled={isLoading}
                data-testid="button-generate-menu"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Đang tạo thực đơn...
                  </>
                ) : (
                  "Tạo Thực Đơn"
                )}
              </Button>
            </Card>
          </motion.div>

          {generatedMenu && (
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                shouldReduceMotion ? { duration: 0 } : { duration: 0.5 }
              }
            >
              <Card className="p-6 md:p-8 mt-8">
                <h3 className="text-2xl font-bold text-primary mb-4 font-['Lexend']">
                  Thực Đơn Của Bạn
                </h3>
                <div className="prose prose-sm max-w-none">
                  <div
                    className="text-foreground leading-relaxed markdown-content"
                    dangerouslySetInnerHTML={{
                      __html: parseMarkdown(generatedMenu),
                    }}
                  />
                </div>
              </Card>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
