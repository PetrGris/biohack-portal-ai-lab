
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, BookOpen, ExternalLink, Star, Filter } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Library = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const libraryItems = [
    {
      id: 1,
      title: "Сон и когнитивное восстановление",
      description: "Глубокое погружение в механизмы восстановления мозга во время сна и практические советы по оптимизации.",
      category: "Сон",
      tags: ["когнитивность", "восстановление", "мозг"],
      rating: 4.9,
      sources: 18
    },
    {
      id: 2,
      title: "Микробиом и его влияние на здоровье",
      description: "Всесторонний анализ кишечного микробиома, его связь с иммунитетом, воспалением и ментальным здоровьем.",
      category: "Пищеварение",
      tags: ["микробиом", "иммунитет", "воспаление"],
      rating: 4.7,
      sources: 23
    },
    {
      id: 3,
      title: "Гормональный баланс: ключ к оптимальной работе организма",
      description: "Подробный разбор основных гормональных систем и методов их оптимизации для улучшения энергии и здоровья.",
      category: "Гормоны",
      tags: ["эндокринология", "щитовидная железа", "тестостерон", "эстроген"],
      rating: 4.8,
      sources: 27
    },
    {
      id: 4,
      title: "Методы отслеживания биомаркеров",
      description: "Обзор современных методов измерения и анализа ключевых биомаркеров здоровья для персонализированной оптимизации.",
      category: "Диагностика",
      tags: ["кровь", "анализы", "биомаркеры", "отслеживание"],
      rating: 4.6,
      sources: 16
    },
    {
      id: 5,
      title: "Метаболическая гибкость и митохондриальное здоровье",
      description: "Исследование биохимических процессов метаболической гибкости и стратегий улучшения митохондриальной функции.",
      category: "Метаболизм",
      tags: ["митохондрии", "энергия", "кетоз", "гликолиз"],
      rating: 4.9,
      sources: 21
    },
    {
      id: 6,
      title: "Нейропластичность: как формировать новые навыки",
      description: "Научно обоснованные стратегии поддержки нейропластичности и эффективного формирования новых навыков.",
      category: "Нейронауки",
      tags: ["обучение", "мозг", "навыки", "нейропластичность"],
      rating: 4.8,
      sources: 19
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className="section-title">Библиотека знаний</h1>
              <p className="section-subtitle">
                Обширный справочник по темам биохакинга, здоровья и оптимизации
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 mt-4 md:mt-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Поиск в библиотеке..." 
                  className="pl-10 w-full sm:w-60"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" className="flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Категории
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {libraryItems.map((item) => (
              <Card key={item.id} className="card-hover overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <Badge variant="outline" className="bg-primary/10 text-primary">
                      {item.category}
                    </Badge>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="text-sm">{item.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="mt-2">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.description}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {item.tags.map((tag, idx) => (
                      <Badge key={idx} variant="secondary" className="bg-secondary/10 text-secondary-foreground">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t border-border pt-4 flex justify-between">
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 text-muted-foreground mr-2" />
                    <span className="text-sm text-muted-foreground">{item.sources} источников</span>
                  </div>
                  <Button variant="ghost" size="sm" className="flex items-center">
                    <span className="mr-1">Читать</span>
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Library;
