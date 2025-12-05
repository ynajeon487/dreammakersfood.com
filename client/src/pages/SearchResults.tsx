import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Search, ChefHat, Leaf, BookOpen } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { recipesData, type Recipe } from '@shared/recipes';
import { vietnameseIngredients } from '@/lib/ingredients';
import RecipeCard from '@/components/RecipeCard';
import AutoDismissBanner from '@/components/AutoDismissBanner';

interface SearchResult {
  type: 'recipe' | 'ingredient';
  id: string;
  title: string;
  description: string;
  link: string;
  category?: string;
}

export default function SearchResults() {
  const [location] = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get('q') || '';
    setSearchQuery(query);

    if (query.trim()) {
      performSearch(query.trim());
    }
  }, [location]);

  const performSearch = (query: string) => {
    const lowerQuery = query.toLowerCase();
    const allResults: SearchResult[] = [];

    // Tìm kiếm trong recipes
    recipesData.forEach((recipe) => {
      const searchableText = [
        recipe.name,
        recipe.description,
        recipe.mealType,
        ...recipe.ingredients.map(ing => ing.name),
      ].join(' ').toLowerCase();

      if (searchableText.includes(lowerQuery)) {
        allResults.push({
          type: 'recipe',
          id: `recipe-${recipe.id}`,
          title: recipe.name,
          description: recipe.description,
          link: `/recipe/${recipe.id}`,
          category: recipe.mealType,
        });
      }
    });

    // Tìm kiếm trong ingredients
    vietnameseIngredients.forEach((ingredient) => {
      if (
        ingredient.label.toLowerCase().includes(lowerQuery) ||
        ingredient.value.toLowerCase().includes(lowerQuery)
      ) {
        allResults.push({
          type: 'ingredient',
          id: `ingredient-${ingredient.value}`,
          title: ingredient.label,
          description: `Nguyên liệu thuộc nhóm ${ingredient.category}`,
          link: '/shopping',
          category: ingredient.category,
        });
      }
    });

    setResults(allResults);
  };

  const recipeResults = results.filter(r => r.type === 'recipe');
  const ingredientResults = results.filter(r => r.type === 'ingredient');
  
  const matchingRecipes = recipeResults.map(r => {
    const id = parseInt(r.id.replace('recipe-', ''));
    return recipesData.find(recipe => recipe.id === id);
  }).filter(Boolean);

  return (
    <div className="min-h-screen bg-background">
      <AutoDismissBanner />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Search className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Kết quả tìm kiếm
              </h1>
              <p className="text-muted-foreground">
                {searchQuery ? `Tìm kiếm: "${searchQuery}"` : 'Nhập từ khóa để tìm kiếm'}
              </p>
            </div>
          </div>

          {searchQuery && (
            <p className="text-sm text-muted-foreground">
              Tìm thấy {results.length} kết quả
            </p>
          )}
        </div>

        {/* No results */}
        {searchQuery && results.length === 0 && (
          <Card className="p-12 text-center" data-testid="card-no-results">
            <Search className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">Không tìm thấy kết quả</h3>
            <p className="text-muted-foreground mb-6">
              Không tìm thấy kết quả nào cho "{searchQuery}". Hãy thử với từ khóa khác.
            </p>
          </Card>
        )}

        {/* Recipe Results */}
        {recipeResults.length > 0 && (
          <div className="mb-12" data-testid="section-recipes">
            <div className="flex items-center gap-2 mb-6">
              <ChefHat className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold">Công thức nấu ăn ({recipeResults.length})</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {matchingRecipes.map((recipe, index) => (
                recipe && (
                  <RecipeCard
                    key={recipe.id}
                    id={recipe.id}
                    name={recipe.name}
                    image={`/attached_assets/generated_images/${recipe.image}`}
                    price={recipe.price}
                    cookTime={recipe.cookTime}
                    servings={recipe.servings}
                    rating={recipe.rating}
                    mealType={recipe.mealType}
                    index={index}
                  />
                )
              ))}
            </div>
          </div>
        )}

        {/* Ingredient Results */}
        {ingredientResults.length > 0 && (
          <div className="mb-12" data-testid="section-ingredients">
            <div className="flex items-center gap-2 mb-6">
              <Leaf className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold">Nguyên liệu ({ingredientResults.length})</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ingredientResults.map((result) => (
                <a
                  key={result.id}
                  href={result.link}
                  data-testid={`link-ingredient-${result.id}`}
                >
                  <Card className="p-4 hover-elevate active-elevate-2 cursor-pointer">
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Leaf className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground mb-1">
                          {result.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {result.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Search Tips */}
        {!searchQuery && (
          <Card className="p-8" data-testid="card-search-tips">
            <div className="flex items-start gap-4">
              <BookOpen className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold mb-3">Gợi ý tìm kiếm</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Tìm kiếm công thức: "trứng chiên", "cơm chiên", "canh chua"</li>
                  <li>• Tìm kiếm nguyên liệu: "thịt heo", "cà chua", "rau muống"</li>
                  <li>• Tìm kiếm theo bữa ăn: "bữa sáng", "bữa trưa", "bữa tối"</li>
                  <li>• Tìm kiếm theo loại: "món Việt", "món Hàn", "món Nhật"</li>
                </ul>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
