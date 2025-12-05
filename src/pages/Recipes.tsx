import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import Footer from "@/components/Footer";
import RecipeFilter from "@/components/RecipeFilter";
import RecipeCard from "@/components/RecipeCard";
import { recipesData } from "@shared/recipes";
import { getRecipeImage } from "@/lib/recipeImages";
import { motion, useReducedMotion } from "framer-motion";
import AutoDismissBanner from "@/components/AutoDismissBanner";

export default function Recipes() {
  const [location, setLocation] = useLocation();
  const shouldReduceMotion = useReducedMotion();
  const [searchQuery, setSearchQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("all");
  const [mealTypeFilter, setMealTypeFilter] = useState("all");
  const [hasSearched, setHasSearched] = useState(false);
  const [displayedRecipes, setDisplayedRecipes] = useState<typeof recipesData>(
    [],
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const searchParam = params.get("search");
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [location]);

  const allRecipes = recipesData.map((recipe) => ({
    ...recipe,
    image: getRecipeImage(recipe.image),
  }));

  const handleSearch = () => {
    const filtered = allRecipes.filter((recipe) => {
      // Search query filter
      if (
        searchQuery &&
        !recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Price filter
      if (priceFilter !== "all") {
        const price = recipe.price;
        switch (priceFilter) {
          case "under-10k":
            if (price >= 10000) return false;
            break;
          case "10k-15k":
            if (price < 10000 || price >= 15000) return false;
            break;
          case "15k-20k":
            if (price < 15000 || price >= 20000) return false;
            break;
          case "20k-25k":
            if (price < 20000 || price >= 25000) return false;
            break;
          case "25k-30k":
            if (price < 25000 || price >= 30000) return false;
            break;
          case "30k-40k":
            if (price < 30000 || price >= 40000) return false;
            break;
          case "40k-50k":
            if (price < 40000 || price >= 50000) return false;
            break;
          case "over-50k":
            if (price < 50000) return false;
            break;
        }
      }

      // Time filter
      if (timeFilter !== "all") {
        const cookTime = recipe.cookTime;
        switch (timeFilter) {
          case "under-15":
            if (cookTime >= 15) return false;
            break;
          case "15-30":
            if (cookTime < 15 || cookTime >= 30) return false;
            break;
          case "30-60":
            if (cookTime < 30 || cookTime >= 60) return false;
            break;
          case "over-60":
            if (cookTime < 60) return false;
            break;
        }
      }

      // Meal type filter
      if (mealTypeFilter !== "all") {
        const mealTypeMap: Record<string, string> = {
          breakfast: "Bữa sáng",
          lunch: "Bữa trưa",
          dinner: "Bữa tối",
          snack: "Ăn vặt",
        };
        if (recipe.mealType !== mealTypeMap[mealTypeFilter]) {
          return false;
        }
      }

      return true;
    });

    setDisplayedRecipes(filtered);
    setHasSearched(true);
  };

  return (
    <>
      <AutoDismissBanner />
      <div className="flex-1 py-12 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="mb-8"
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              shouldReduceMotion ? { duration: 0 } : { duration: 0.5 }
            }
          >
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-['Lexend']">
              Công Thức Món Ăn
            </h1>
            <p className="text-muted-foreground text-lg">
              Khám phá hàng trăm công thức nấu ăn tiết kiệm và dễ làm
            </p>
          </motion.div>

          <RecipeFilter
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            priceFilter={priceFilter}
            onPriceChange={setPriceFilter}
            timeFilter={timeFilter}
            onTimeChange={setTimeFilter}
            mealTypeFilter={mealTypeFilter}
            onMealTypeChange={setMealTypeFilter}
            onSearch={handleSearch}
          />

          {!hasSearched ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg mb-2">
                Sử dụng bộ lọc và nhấn "Tìm kiếm món ăn" để xem các công thức
                phù hợp
              </p>
              <p className="text-muted-foreground">
                Bạn có thể lọc theo giá, thời gian nấu và loại bữa ăn
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {displayedRecipes.map((recipe, index) => (
                  <RecipeCard
                    key={recipe.id}
                    {...recipe}
                    index={index}
                    onClick={() => setLocation(`/recipes/${recipe.id}`)}
                  />
                ))}
              </div>

              {displayedRecipes.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">
                    Hiện trang web chưa cập nhật các công thức phù hợp với bộ
                    lọc của bạn. Hãy cho chúng tôi biết để chúng tôi có thể cập
                    nhật sớm nhất có thể!
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
