const stats = [
  { value: '2,500+', label: 'Người dùng' },
  { value: '150+', label: 'Công thức' },
  { value: '4,800+', label: 'Đánh giá' },
  { value: '25k đ', label: 'Chi phí TB/ngày' },
];

export default function StatsBar() {
  return (
    <section className="py-12 md:py-16 bg-card border-y border-card-border">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="text-center"
              data-testid={`stat-${index}`}
            >
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2 font-['Lexend']">
                {stat.value}
              </div>
              <div className="text-sm md:text-base text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
