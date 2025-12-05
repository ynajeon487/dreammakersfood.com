import { useEffect } from 'react';
import { useRoute, useLocation } from 'wouter';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Users, Star, Download } from 'lucide-react';
import { recipesData } from '@shared/recipes';
import { getRecipeImage } from '@/lib/recipeImages';
import { motion, useReducedMotion } from 'framer-motion';
import AutoDismissBanner from '@/components/AutoDismissBanner';

export default function RecipeDetail() {
  const [, params] = useRoute('/recipes/:id');
  const [, setLocation] = useLocation();
  const shouldReduceMotion = useReducedMotion();

  const recipeId = parseInt(params?.id || '1');
  const recipeData = recipesData.find((r) => r.id === recipeId);

  useEffect(() => {
    if (!recipeData) {
      setLocation('/recipes');
    }
  }, [recipeData, setLocation]);

  if (!recipeData) {
    return null;
  }

  const recipe = {
    ...recipeData,
    image: getRecipeImage(recipeData.image),
  };

  const handleDownloadIngredients = () => {
    console.log('Downloading ingredients list');
  };

  return (
    <>
      <AutoDismissBanner />
      <div className="flex-1 py-12 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT CONTENT */}
            <div className="lg:col-span-2 space-y-8">
              {/* IMAGE */}
              <motion.div
                className="relative aspect-video overflow-hidden rounded-lg"
                initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5 }}
              >
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* TITLE + PRICE */}
              <motion.div
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5, delay: 0.2 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <h1 className="text-3xl md:text-4xl font-bold text-primary font-['Lexend']">
                    {recipe.name}
                  </h1>
                  <Badge className="bg-accent text-accent-foreground text-lg px-4 py-2">
                    {recipe.price.toLocaleString('vi-VN')}đ
                  </Badge>
                </div>

                {/* META INFO */}
                <div className="flex items-center gap-6 text-muted-foreground mb-6">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    <span>{recipe.cookTime} phút</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    <span>{recipe.servings} người</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span>{recipe.rating}/5</span>
                  </div>
                  <Badge variant="secondary">{recipe.mealType}</Badge>
                </div>

                <p className="text-foreground leading-relaxed mb-8">
                  {recipe.description}
                </p>
              </motion.div>

              {/* INGREDIENTS */}
              <motion.div
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5, delay: 0.4 }}
              >
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-semibold text-primary font-['Lexend']">
                      Nguyên liệu
                    </h2>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleDownloadIngredients}
                      data-testid="button-download-ingredients"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Tải danh sách
                    </Button>
                  </div>
                  <ul className="space-y-3">
                    {recipe.ingredients.map((ingredient, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3"
                        data-testid={`ingredient-${index}`}
                      >
                        <label className="flex items-start gap-3 flex-1">
                          <input
                            type="checkbox"
                            className="mt-1 h-4 w-4 rounded border-input"
                            data-testid={`checkbox-ingredient-${index}`}
                            aria-label={`Chọn ${ingredient.name}`}
                          />
                          <div className="flex-1">
                            <span className="text-foreground font-medium">
                              {ingredient.name}
                            </span>
                            <span className="text-muted-foreground">
                              {' '}
                              - {ingredient.amount}
                            </span>
                            {ingredient.substitute && (
                              <div className="text-sm text-muted-foreground mt-1">
                                Thay thế: {ingredient.substitute}
                              </div>
                            )}
                          </div>
                        </label>
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>

              {/* STEPS */}
              <motion.div
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5, delay: 0.6 }}
              >
                <Card className="p-6">
                  <h2 className="text-2xl font-semibold text-primary mb-6 font-['Lexend']">
                    Cách thực hiện
                  </h2>
                  <div className="space-y-6">
                    {recipe.steps.map((step) => (
                      <div
                        key={step.step}
                        className="flex gap-4"
                        data-testid={`step-${step.step}`}
                      >
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                          {step.step}
                        </div>
                        <p className="text-foreground leading-relaxed flex-1 pt-1">
                          {step.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            </div>

            {/* RIGHT SIDEBAR */}
            <motion.div
              className="lg:col-span-1"
              initial={shouldReduceMotion ? {} : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5, delay: 0.3 }}
            >
              <Card className="p-6 sticky top-24">
                <h3 className="text-xl font-semibold text-primary mb-4 font-['Lexend']">
                  Thông tin dinh dưỡng
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Calories</span>
                    <span className="font-semibold text-foreground">
                      {recipe.nutrition.calories} kcal
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Protein</span>
                    <span className="font-semibold text-foreground">
                      {recipe.nutrition.protein}g
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Carbs</span>
                    <span className="font-semibold text-foreground">
                      {recipe.nutrition.carbs}g
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Fat</span>
                    <span className="font-semibold text-foreground">
                      {recipe.nutrition.fat}g
                    </span>
                  </div>
                </div>

                <div className="border-t border-card-border my-6" />

                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground mb-3">Chi phí phân bổ</h4>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Nguyên liệu chính</span>
                    <span className="text-foreground">
                      {recipe.costBreakdown.main.toLocaleString('vi-VN')}đ
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Gia vị</span>
                    <span className="text-foreground">
                      {recipe.costBreakdown.seasoning.toLocaleString('vi-VN')}đ
                    </span>
                  </div>
                  <div className="border-t border-card-border pt-3 mt-3">
                    <div className="flex justify-between items-center font-semibold">
                      <span className="text-foreground">Tổng</span>
                      <span className="text-accent text-lg">
                        {recipe.price.toLocaleString('vi-VN')}đ
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}