import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Star, Users } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

interface RecipeCardProps {
  id: number;
  name: string;
  image: string;
  price: number;
  cookTime: number;
  servings: number;
  rating: number;
  mealType: string;
  onClick?: () => void;
  index?: number;
}

export default function RecipeCard({
  id,
  name,
  image,
  price,
  cookTime,
  servings,
  rating,
  mealType,
  onClick,
  index = 0,
}: RecipeCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={shouldReduceMotion ? { duration: 0 } : { 
        duration: 0.4, 
        delay: index * 0.1,
        ease: "easeOut"
      }}
      whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
      whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
    >
      <Card 
        className={`overflow-hidden cursor-pointer h-full ${
          shouldReduceMotion ? '' : 'hover-elevate active-elevate-2 transition-all hover:-translate-y-1'
        }`}
        onClick={onClick}
        data-testid={`card-recipe-${id}`}
      >
        <div className="relative aspect-video overflow-hidden">
          <motion.img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover"
            whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.3 }}
          />
        <Badge 
          className="absolute top-2 right-2 bg-accent text-accent-foreground"
          data-testid={`badge-price-${id}`}
        >
          {price.toLocaleString('vi-VN')}đ
        </Badge>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 font-['Lexend']">
          {name}
        </h3>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{cookTime} phút</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{servings} người</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span>{rating.toFixed(1)}</span>
          </div>
        </div>
        
        <Badge variant="secondary" className="text-xs">
          {mealType}
        </Badge>
      </div>
      </Card>
    </motion.div>
  );
}
