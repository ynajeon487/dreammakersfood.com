import { useLocation } from 'wouter';
import Hero from '@/components/Hero';
import FeatureCards from '@/components/FeatureCards';
import RecipeCard from '@/components/RecipeCard';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { motion, useReducedMotion } from 'framer-motion';
import AutoDismissBanner from '@/components/AutoDismissBanner';

import eggTomatoImage from '@assets/generated_images/Scrambled_eggs_with_tomatoes_21887b7f.png';
import morningGloryImage from '@assets/generated_images/Stir-fried_morning_glory_b8c1df15.png';
import friedRiceImage from '@assets/generated_images/Vietnamese_fried_rice_170f31d9.png';
import noodlesImage from '@assets/generated_images/Upgraded_instant_noodles_75cdd539.png';

export default function Home() {
  const [, setLocation] = useLocation();
  const shouldReduceMotion = useReducedMotion();

  const featuredRecipes = [
    {
      id: 1,
      name: 'Trứng chiên cà chua',
      image: eggTomatoImage,
      price: 15000,
      cookTime: 15,
      servings: 1,
      rating: 4.8,
      mealType: 'Bữa sáng',
    },
    {
      id: 2,
      name: 'Rau muống xào tỏi',
      image: morningGloryImage,
      price: 12000,
      cookTime: 10,
      servings: 2,
      rating: 4.6,
      mealType: 'Bữa trưa',
    },
    {
      id: 3,
      name: 'Cơm chiên trứng',
      image: friedRiceImage,
      price: 20000,
      cookTime: 20,
      servings: 1,
      rating: 4.9,
      mealType: 'Bữa tối',
    },
    {
      id: 4,
      name: 'Mì tôm nâng cấp',
      image: noodlesImage,
      price: 18000,
      cookTime: 12,
      servings: 1,
      rating: 4.7,
      mealType: 'Ăn vặt',
    },
  ];

  return (
    <>
      <AutoDismissBanner />
      <Hero onCtaClick={() => setLocation('/menu')} />
      <FeatureCards />
      
      <section className="py-16 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-10"
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-['Lexend']">
              Món Ăn Nổi Bật
            </h2>
            <p className="text-muted-foreground text-lg">
              Những công thức phổ biến và được yêu thích nhất
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredRecipes.map((recipe, index) => (
              <RecipeCard
                key={recipe.id}
                {...recipe}
                index={index}
                onClick={() => setLocation(`/recipes/${recipe.id}`)}
              />
            ))}
          </div>
          
          <motion.div 
            className="text-center mt-10"
            initial={shouldReduceMotion ? {} : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5, delay: 0.4 }}
          >
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => setLocation('/recipes')}
              data-testid="button-view-all-recipes"
            >
              Xem Tất Cả Công Thức
            </Button>
          </motion.div>
        </div>
      </section>
      <Footer />
    </>
  );
}
