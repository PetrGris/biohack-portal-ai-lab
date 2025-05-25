
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Target, Puzzle, TrendingUp, Users } from "lucide-react";

const ProcessSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      icon: <Target className="h-12 w-12 text-primary" />,
      title: "1. Ставьте цели",
      description: "Определите, что хотите улучшить",
      example: "Например: улучшение качества сна, повышение энергии, снижение стресса",
      image: "🎯"
    },
    {
      icon: <Puzzle className="h-12 w-12 text-primary" />,
      title: "2. Собирайте протокол",
      description: "Выбирайте элементы из научно обоснованной базы",
      example: "Комбинируйте разные подходы: добавки, поведенческие практики, технологии",
      image: "🧩"
    },
    {
      icon: <TrendingUp className="h-12 w-12 text-primary" />,
      title: "3. Применяйте и улучшайте",
      description: "Следуйте протоколу и отслеживайте результаты",
      example: "Анализируйте эффективность, корректируйте дозировки и частоту",
      image: "📈"
    },
    {
      icon: <Users className="h-12 w-12 text-primary" />,
      title: "4. Делитесь с сообществом",
      description: "Публикуйте успешные протоколы и получайте обратную связь",
      example: "Помогайте другим, учитесь на чужом опыте, создавайте форки протоколов",
      image: "👥"
    }
  ];

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="py-16 bg-gradient-to-r from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title">Как работает ProtoLab Portal</h2>
          <p className="section-subtitle">
            Простой процесс создания и улучшения ваших протоколов биохакинга
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main slider content */}
          <div className="bg-white rounded-xl shadow-lg p-8 min-h-[400px] relative overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                {slides[currentSlide].icon}
                <div>
                  <h3 className="text-2xl font-bold">{slides[currentSlide].title}</h3>
                  <p className="text-lg text-muted-foreground">{slides[currentSlide].description}</p>
                </div>
              </div>
              <div className="text-6xl opacity-20">
                {slides[currentSlide].image}
              </div>
            </div>

            {/* Example content */}
            <div className="bg-muted/30 rounded-lg p-6 mb-6">
              <h4 className="font-semibold mb-2 text-primary">Пример:</h4>
              <p className="text-muted-foreground">{slides[currentSlide].example}</p>
              
              {/* Special content for step 2 - protocol example */}
              {currentSlide === 1 && (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="bg-white rounded-lg p-3 border border-primary/20">
                    <div className="text-xs text-primary font-medium mb-1">ДОБАВКИ</div>
                    <div className="text-sm">Магний глицинат</div>
                    <div className="text-xs text-muted-foreground">400 мг перед сном</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-secondary/20">
                    <div className="text-xs text-secondary font-medium mb-1">ПОВЕДЕНИЕ</div>
                    <div className="text-sm">Цифровой детокс</div>
                    <div className="text-xs text-muted-foreground">За 2 часа до сна</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-accent/20">
                    <div className="text-xs text-accent font-medium mb-1">СРЕДА</div>
                    <div className="text-sm">Температура 18°C</div>
                    <div className="text-xs text-muted-foreground">Всю ночь</div>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation controls */}
            <div className="flex items-center justify-between">
              <Button variant="outline" size="icon" onClick={prevSlide}>
                <ChevronLeft className="h-4 w-4" />
              </Button>

              {/* Slide indicators */}
              <div className="flex space-x-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentSlide ? 'bg-primary' : 'bg-muted'
                    }`}
                  />
                ))}
              </div>

              <Button variant="outline" size="icon" onClick={nextSlide}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-muted rounded-full h-1 mt-4">
            <div 
              className="bg-primary h-1 rounded-full transition-all duration-300"
              style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSlider;
