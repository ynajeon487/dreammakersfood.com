import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { parseMarkdown } from '@/lib/markdown';
import AutoDismissBanner from '@/components/AutoDismissBanner';

export default function MenuByMeal() {
  const [budget, setBudget] = useState('');
  const [servings, setServings] = useState('');
  const [diet, setDiet] = useState('');
  const [dishName, setDishName] = useState('');
  const [allergies, setAllergies] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedRecipe, setGeneratedRecipe] = useState('');
  const [errors, setErrors] = useState({
    budget: false,
    servings: false,
    diet: false,
  });
  const { toast } = useToast();

  const handleGenerateRecipe = async () => {
    // Validate required inputs
    const newErrors = {
      budget: !budget || budget.trim() === '',
      servings: !servings || servings.trim() === '',
      diet: !diet,
    };

    setErrors(newErrors);

    // Check if any required field is empty
    if (Object.values(newErrors).some(error => error)) {
      toast({
        title: "Chưa thể tạo công thức",
        description: "Hãy cung cấp thêm thông tin bạn nhé!",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }

    setIsLoading(true);
    setGeneratedRecipe('');

    try {
      const response = await fetch('/api/menu/generate-meal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          budget,
          servings,
          diet,
          dishName: dishName.trim(),
          allergies,
        }),
      });

      if (!response.ok) {
        throw new Error('Không thể tạo công thức');
      }

      const data = await response.json();
      setGeneratedRecipe(data.recipe);
      
      toast({
        title: "Thành công!",
        description: dishName.trim() 
          ? `Công thức cho ${dishName} đã sẵn sàng!` 
          : "Món ăn được gợi ý đã sẵn sàng!",
        duration: 2000,
      });
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể tạo công thức. Vui lòng thử lại sau.",
        variant: "destructive",
        duration: 2000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AutoDismissBanner />
      <section className="min-h-screen bg-background py-8 md:py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-3 font-['Lexend']">
            Tạo Công Thức Món Ăn
          </h1>
          <p className="text-foreground/80 text-base md:text-lg">
            Nhập thông tin để nhận công thức nấu chi tiết
          </p>
        </div>

        <Card className="p-6 md:p-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="budget" className={errors.budget ? 'text-destructive' : ''}>
                Ngân sách <span className="text-destructive">*</span>
              </Label>
              <Input
                id="budget"
                type="number"
                placeholder="Ví dụ: 30000"
                value={budget}
                onChange={(e) => {
                  setBudget(e.target.value);
                  setErrors(prev => ({ ...prev, budget: false }));
                }}
                className={errors.budget ? 'border-destructive focus:ring-destructive' : ''}
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
              <Label htmlFor="servings" className={errors.servings ? 'text-destructive' : ''}>
                Số người ăn <span className="text-destructive">*</span>
              </Label>
              <Input
                id="servings"
                type="number"
                placeholder="Ví dụ: 2"
                value={servings}
                onChange={(e) => {
                  setServings(e.target.value);
                  setErrors(prev => ({ ...prev, servings: false }));
                }}
                className={errors.servings ? 'border-destructive focus:ring-destructive' : ''}
                data-testid="input-servings"
              />
              {errors.servings && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  Vui lòng nhập số người
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="diet" className={errors.diet ? 'text-destructive' : ''}>
                Chế độ ăn <span className="text-destructive">*</span>
              </Label>
              <Select 
                value={diet} 
                onValueChange={(value) => {
                  setDiet(value);
                  setErrors(prev => ({ ...prev, diet: false }));
                }}
              >
                <SelectTrigger 
                  id="diet" 
                  className={errors.diet ? 'border-destructive focus:ring-destructive' : ''}
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

            <div className="space-y-2">
              <Label htmlFor="dishName">
                Món ăn muốn nấu <span className="text-muted-foreground text-sm">(Không bắt buộc)</span>
              </Label>
              <Textarea
                id="dishName"
                placeholder="Ví dụ: Cơm chiên trứng, Phở gà... (Để trống nếu muốn AI gợi ý)"
                value={dishName}
                onChange={(e) => setDishName(e.target.value)}
                rows={2}
                data-testid="input-dish-name"
              />
              <p className="text-xs text-muted-foreground">
                💡 Để trống để nhận gợi ý món ăn phù hợp với ngân sách
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="allergies">
                Dị ứng thực phẩm <span className="text-muted-foreground">(không bắt buộc)</span>
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
                Liệt kê các thực phẩm bạn dị ứng, cách nhau bằng dấu phẩy
              </p>
            </div>
          </div>

          <Button 
            className="w-full bg-primary text-primary-foreground text-lg py-6 mt-6"
            onClick={handleGenerateRecipe}
            disabled={isLoading}
            data-testid="button-generate-recipe"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Đang tạo công thức...
              </>
            ) : (
              dishName.trim() ? 'Tạo Công Thức' : 'Gợi Ý Món Ăn'
            )}
          </Button>
        </Card>

        {generatedRecipe && (
          <Card className="p-6 md:p-8 mt-8">
            <h3 className="text-2xl font-bold text-primary mb-4 font-['Lexend']">
              {dishName.trim() ? `Công Thức: ${dishName}` : 'Món Ăn Gợi Ý'}
            </h3>
            <div className="prose prose-sm max-w-none">
              <div 
                className="text-foreground leading-relaxed markdown-content"
                dangerouslySetInnerHTML={{ __html: parseMarkdown(generatedRecipe) }}
              />
            </div>
          </Card>
        )}
      </div>
    </section>
    </>
  );
}
