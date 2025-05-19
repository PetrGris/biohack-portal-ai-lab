
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, TrendingUp, Filter } from "lucide-react";
import ProtocolCard from "@/components/ProtocolCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Rating = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const topProtocols = [
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
      title: "Протокол метаболической гибкости",
      description: "Система питания и физических нагрузок для развития метаболической гибкости и оптимизации энергетических процессов.",
      author: "Антон М.",
      category: "Метаболизм",
      rating: 4.6,
      forks: 98,
      days: 30,
      difficulty: "Средняя" as const,
    },
    {
      title: "Комплексная оптимизация стресса",
      description: "Протокол для управления стрессом, повышения устойчивости и оптимизации работы вегетативной нервной системы.",
      author: "Елена С.",
      category: "Стресс",
      rating: 4.9,
      forks: 187,
      days: 21,
      difficulty: "Средняя" as const,
    },
    {
      title: "Утренний ритуал продуктивности",
      description: "Пошаговый протокол утренних действий для максимальной энергии и продуктивности в течение дня.",
      author: "Михаил К.",
      category: "Продуктивность",
      rating: 4.8,
      forks: 245,
      days: 7,
      difficulty: "Легкая" as const,
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className="section-title">Рейтинг протоколов</h1>
              <p className="section-subtitle">
                Самые эффективные и популярные протоколы от сообщества биохакеров
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 mt-4 md:mt-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Поиск протоколов..." 
                  className="pl-10 w-full sm:w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" className="flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Фильтры
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="top" className="mb-6">
            <TabsList>
              <TabsTrigger value="top">Топ рейтинга</TabsTrigger>
              <TabsTrigger value="trending">
                <TrendingUp className="h-4 w-4 mr-2" />
                Набирающие популярность
              </TabsTrigger>
              <TabsTrigger value="new">Новые</TabsTrigger>
              <TabsTrigger value="effective">С подтвержденной эффективностью</TabsTrigger>
            </TabsList>
            
            <TabsContent value="top" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {topProtocols.map((protocol, index) => (
                  <div key={index} className="relative">
                    {index < 3 && (
                      <div className="absolute -top-3 -left-3 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm">
                        {index + 1}
                      </div>
                    )}
                    <ProtocolCard {...protocol} />
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Rating;
