import { Button } from '@/components/ui/button';
import heroImage from '@assets/generated_images/Vietnamese_student_meal_hero_e30b3c8d.png';
import { motion, useReducedMotion } from 'framer-motion';

interface HeroProps {
  onCtaClick?: () => void;
}

export default function Hero({ onCtaClick }: HeroProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative h-[70vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
      <motion.div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
        initial={shouldReduceMotion ? {} : { scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 1.2, ease: "easeOut" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/50 to-primary/70" />
      
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <motion.h1 
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-['Lexend']"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8, delay: 0.2 }}
        >
          Nấu Ăn Tiết Kiệm<br />Dành Cho Sinh Viên
        </motion.h1>
        <motion.p 
          className="text-lg md:text-xl text-white/95 mb-8 max-w-2xl mx-auto"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8, delay: 0.4 }}
        >
          Lập thực đơn khoa học, tính toán chi phí hợp lý, và học cách nấu những món ăn ngon lành từ công thức dễ làm
        </motion.p>
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8, delay: 0.6 }}
        >
          <Button 
  size="lg" 
  className="bg-accent hover:bg-accent text-accent-foreground text-lg px-8 py-6 shadow-lg border-spacing-1.5 border-black"
  onClick={onCtaClick}
  data-testid="button-cta-hero"
>
  LÊN THỰC ĐƠN NGAY
</Button>

        </motion.div>
      </div>
    </section>
  );
}
