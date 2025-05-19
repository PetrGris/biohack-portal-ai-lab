
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Calendar, User, MessageSquare, Eye } from "lucide-react";
import NewsCard from "@/components/NewsCard";

const News = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const newsItems = [
    {
      id: 1,
      title: "Новое исследование о влиянии интервального голодания на продолжительность жизни",
      preview: "Ученые из Стэнфордского университета обнаружили положительное влияние интервального голодания на метаболизм и продолжительность жизни в долгосрочной перспективе.",
      date: "19 мая 2025",
      category: "Исследования",
      author: "Александр М.",
      commentsCount: 24,
      viewsCount: 1283,
      image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Влияние холодового воздействия на иммунитет: результаты 6-месячного эксперимента",
      preview: "Регулярное воздействие холода показало значительное положительное влияние на иммунную систему, выносливость и психологическую устойчивость участников эксперимента.",
      date: "16 мая 2025",
      category: "Эксперименты",
      author: "Мария К.",
      commentsCount: 18,
      viewsCount: 923,
      image: "https://images.unsplash.com/photo-1475503572774-15a45e5d60b9?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "ProtoLab запускает новый инструмент для анализа протоколов с использованием ИИ",
      preview: "Новый инструмент позволяет автоматически анализировать эффективность протоколов, предлагать оптимизации и обнаруживать потенциальные риски для различных типов пользователей.",
      date: "12 мая 2025",
      category: "Обновления",
      author: "Команда ProtoLab",
      commentsCount: 36,
      viewsCount: 2541,
      image: "https://images.unsplash.com/photo-1633613286991-611fe299c4be?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 4,
      title: "5 ключевых биомаркеров для отслеживания в 2025 году",
      preview: "Обзор самых важных биомаркеров, которые стоит отслеживать для оптимизации здоровья и производительности в текущем году.",
      date: "10 мая 2025",
      category: "Руководства",
      author: "Дмитрий В.",
      commentsCount: 29,
      viewsCount: 1865,
      image: "https://images.unsplash.com/photo-1631563019676-dfa7561c1c64?q=80&w=1000&auto=format&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className="section-title">Новости и обновления</h1>
              <p className="section-subtitle">
                Будьте в курсе последних исследований, трендов и обновлений платформы
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 mt-4 md:mt-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Поиск по новостям..." 
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsItems.map((news) => (
              <NewsCard key={news.id} {...news} />
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <Button variant="outline" size="lg">
              Загрузить ещё
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default News;
