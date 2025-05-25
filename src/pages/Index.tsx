
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeatureSection from "@/components/FeatureSection";
import ProcessSlider from "@/components/ProcessSlider";
import ProtocolCard from "@/components/ProtocolCard";
import AIConsultant from "@/components/AIConsultant";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const Index = () => {
  const popularProtocols = [
    {
      title: "Оптимизация сна и восстановления",
      description: "Комплексный протокол для улучшения качества сна и восстановления организма после физических и ментальных нагрузок.",
      author: "Алексей К.",
      category: "Сон",
      rating: 4.9,
      forks: 156,
      days: 28,
      difficulty: "Средняя" as const,
    },
    {
      title: "Улучшение когнитивных функций",
      description: "Протокол для повышения концентрации, памяти и общих когнитивных способностей с помощью нутрицевтиков и техник.",
      author: "Мария Л.",
      category: "Когнитивность",
      rating: 4.7,
      forks: 124,
      days: 21,
      difficulty: "Сложная" as const,
    },
    {
      title: "Базовый иммунный протокол",
      description: "Протокол для поддержки и укрепления иммунной системы с помощью диеты, добавок и образа жизни.",
      author: "Дмитрий В.",
      category: "Иммунитет",
      rating: 4.8,
      forks: 201,
      days: 14,
      difficulty: "Легкая" as const,
    },
    {
      title: "Протокол энергии и выносливости",
      description: "Комбинация добавок, физических практик и техник дыхания для повышения энергетического уровня.",
      author: "Елена С.",
      category: "Энергия", 
      rating: 4.6,
      forks: 89,
      days: 14,
      difficulty: "Средняя" as const,
    },
    {
      title: "Антистресс протокол",
      description: "Научно обоснованные методы снижения стресса и тревожности с помощью адаптогенов и медитативных практик.",
      author: "Андрей Н.",
      category: "Стресс",
      rating: 4.5,
      forks: 67,
      days: 21,
      difficulty: "Легкая" as const,
    },
    {
      title: "Протокол долголетия",
      description: "Комплексный подход к замедлению процессов старения через питание, добавки и практики образа жизни.",
      author: "Ирина В.",
      category: "Долголетие",
      rating: 4.8,
      forks: 143,
      days: 90,
      difficulty: "Сложная" as const,
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        
        <ProcessSlider />
        
        <FeatureSection />
        
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="section-title">Популярные протоколы</h2>
                <p className="section-subtitle">
                  Самые востребованные протоколы от сообщества биохакеров
                </p>
              </div>
              <Button variant="outline">
                Смотреть все
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularProtocols.map((protocol, index) => (
                <ProtocolCard key={index} {...protocol} />
              ))}
            </div>
          </div>
        </section>
        
        <AIConsultant />
        
        <section className="py-16 bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="section-title mb-6">
              Готовы начать свой путь в мире биохакинга?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Присоединяйтесь к растущему сообществу биохакеров, делитесь своим опытом 
              и улучшайте свое здоровье с помощью проверенных протоколов.
            </p>
            <Button size="lg" className="rounded-full">
              Начать бесплатно
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
