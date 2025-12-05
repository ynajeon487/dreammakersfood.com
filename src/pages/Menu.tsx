import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, UtensilsCrossed, ShoppingBasket } from 'lucide-react';
import { Link } from 'wouter';
import { motion, useReducedMotion } from 'framer-motion';
import AutoDismissBanner from '@/components/AutoDismissBanner';

export default function Menu() {
  const shouldReduceMotion = useReducedMotion();

  const menuOptions = [
    {
      icon: Calendar,
      title: 'Theo Ngày',
      description: 'Tạo thực đơn đầy đủ cho cả ngày với nhiều bữa ăn',
      features: [
        'Lập kế hoạch cho 1-3 bữa/ngày',
        'Phân bổ ngân sách hợp lý',
        'Cân bằng dinh dưỡng'
      ],
      href: '/menu/by-day',
      testId: 'button-menu-by-day'
    },
    {
      icon: UtensilsCrossed,
      title: 'Theo Bữa Ăn Lẻ',
      description: 'Tạo công thức cho 1 món ăn cụ thể',
      features: [
        'Hướng dẫn nấu chi tiết',
        'Tính toán cho nhiều người',
        'Gợi ý hoặc tùy chọn món'
      ],
      href: '/menu/by-meal',
      testId: 'button-menu-by-meal'
    },
    {
      icon: ShoppingBasket,
      title: 'Đã Có Nguyên Liệu?',
      description: 'Gợi ý món từ nguyên liệu sẵn có',
      features: [
        'Chọn nguyên liệu có sẵn',
        'Tối ưu ngân sách',
        'Tránh lãng phí thực phẩm'
      ],
      href: '/menu/by-ingredients',
      testId: 'button-menu-by-ingredients'
    }
  ];

  return (
    <>
      <AutoDismissBanner />
      <section className="min-h-screen bg-background py-8 md:py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          className="text-center mb-8 md:mb-12"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-3 font-['Lexend']">
            Tạo Thực Đơn
          </h1>
          <p className="text-foreground/80 text-base md:text-lg max-w-2xl mx-auto">
            Chọn loại thực đơn bạn muốn tạo
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {menuOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <motion.div
                key={index}
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={shouldReduceMotion ? { duration: 0 } : {
                  duration: 0.5,
                  delay: 0.2 + index * 0.1,
                  ease: "easeOut"
                }}
                whileHover={shouldReduceMotion ? {} : { y: -8 }}
              >
                <Card className={`p-8 cursor-pointer group h-full ${
                  shouldReduceMotion ? '' : 'hover-elevate transition-all'
                }`}>
                  <Link href={option.href}>
                    <div className="flex flex-col items-center text-center h-full">
                      <motion.div 
                        className={`w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4 ${
                          shouldReduceMotion ? 'group-hover:bg-primary/20' : 'group-hover:bg-primary/20 transition-colors'
                        }`}
                        whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
                        transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.3 }}
                      >
                        <Icon className="h-10 w-10 text-primary" />
                      </motion.div>
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-primary mb-2 font-['Lexend']">
                          {option.title}
                        </h2>
                        <p className="text-muted-foreground mb-4">
                          {option.description}
                        </p>
                        <ul className="text-sm text-foreground/80 space-y-1">
                          {option.features.map((feature, featureIndex) => (
                            <li key={featureIndex}>• {feature}</li>
                          ))}
                        </ul>
                      </div>
                      <Button 
                        className="w-full mt-6"
                        data-testid={option.testId}
                      >
                        Bắt đầu
                      </Button>
                    </div>
                  </Link>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
    </>
  );
}
