
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, Filter, ListFilter } from "lucide-react";
import ProtocolCard from "@/components/ProtocolCard";

const MyProtocols = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const myProtocols = [
    {
      title: "Утренний ритуал для продуктивности",
      description: "Персональный протокол для максимальной энергии и концентрации в первой половине дня.",
      author: "Я",
      category: "Продуктивность",
      rating: 4.5,
      forks: 0,
      days: 7,
      difficulty: "Легкая" as const,
      status: "В процессе",
      lastUpdated: "Вчера"
    },
    {
      title: "Оптимизация сна (форк)",
      description: "Адаптированный протокол для глубокого сна и быстрого засыпания с учетом моих особенностей.",
      author: "Я (форк от Алексей К.)",
      category: "Сон",
      rating: 5.0,
      forks: 2,
      days: 14,
      difficulty: "Средняя" as const,
      status: "Активен",
      lastUpdated: "3 дня назад"
    },
    {
      title: "Протокол микродозинга витамина D",
      description: "Экспериментальный протокол с ежедневным приемом небольших доз витамина D для улучшения иммунитета.",
      author: "Я",
      category: "Добавки",
      rating: 4.2,
      forks: 0,
      days: 30,
      difficulty: "Легкая" as const,
      status: "Завершен",
      lastUpdated: "2 недели назад"
    },
    {
      title: "Когнитивная оптимизация",
      description: "Комплексный протокол для улучшения памяти и ментальной энергии с использованием нутрицевтиков.",
      author: "Я (форк от Мария Л.)",
      category: "Когнитивность",
      rating: 4.7,
      forks: 1,
      days: 21,
      difficulty: "Сложная" as const,
      status: "Черновик",
      lastUpdated: "1 неделю назад"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className="section-title">Мои протоколы</h1>
              <p className="section-subtitle">
                Создавайте, отслеживайте и улучшайте свои персональные протоколы
              </p>
            </div>
            
            <div className="flex mt-4 md:mt-0">
              <Button className="flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                Новый протокол
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
            <Tabs defaultValue="all" className="w-full sm:w-auto">
              <TabsList>
                <TabsTrigger value="all">Все</TabsTrigger>
                <TabsTrigger value="active">Активные</TabsTrigger>
                <TabsTrigger value="draft">Черновики</TabsTrigger>
                <TabsTrigger value="completed">Завершенные</TabsTrigger>
                <TabsTrigger value="forked">Форки</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Поиск протоколов..." 
                  className="pl-10 w-full sm:w-60"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" className="flex items-center">
                <ListFilter className="h-4 w-4 mr-2" />
                Сортировка
              </Button>
            </div>
          </div>
          
          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myProtocols.map((protocol, index) => (
                <div key={index} className="relative">
                  <div className="absolute top-3 right-3 z-10 px-2 py-1 rounded-full text-xs font-medium bg-background/80 backdrop-blur-sm border border-border">
                    {protocol.status}
                  </div>
                  <ProtocolCard {...protocol} />
                </div>
              ))}
            </div>
          </TabsContent>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MyProtocols;
