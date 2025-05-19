
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, Filter, Droplets, Sun, Moon, Pill, Brain, Heart, Utensils, Activity } from "lucide-react";
import ElementCard from "@/components/ElementCard";

const Elements = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const elementCategories = [
    { id: "all", label: "Все", icon: <Plus className="h-4 w-4" /> },
    { id: "sleep", label: "Сон", icon: <Moon className="h-4 w-4" /> },
    { id: "nutrition", label: "Питание", icon: <Utensils className="h-4 w-4" /> },
    { id: "supplements", label: "Добавки", icon: <Pill className="h-4 w-4" /> },
    { id: "cognitive", label: "Когнитивность", icon: <Brain className="h-4 w-4" /> },
    { id: "physical", label: "Физическая активность", icon: <Activity className="h-4 w-4" /> },
    { id: "light", label: "Световые воздействия", icon: <Sun className="h-4 w-4" /> },
    { id: "cardiovascular", label: "Сердечно-сосудистая система", icon: <Heart className="h-4 w-4" /> },
    { id: "hydration", label: "Гидратация", icon: <Droplets className="h-4 w-4" /> }
  ];

  const elements = [
    {
      id: 1,
      title: "Холодовое воздействие",
      description: "Короткое воздействие холодом для активации иммунной системы и повышения устойчивости к стрессу.",
      category: "physical",
      popularity: 92,
      difficulty: "Средняя",
      scienceRating: 4.2,
      time: "5-10 мин",
      frequency: "Ежедневно"
    },
    {
      id: 2,
      title: "Магний глицинат перед сном",
      description: "Прием магния в форме глицината для улучшения качества сна и расслабления мышц.",
      category: "supplements",
      popularity: 88,
      difficulty: "Легкая",
      scienceRating: 4.7,
      time: "1 мин",
      frequency: "Ежедневно"
    },
    {
      id: 3,
      title: "Светотерапия утром",
      description: "Воздействие ярким светом в первый час после пробуждения для синхронизации циркадных ритмов.",
      category: "light",
      popularity: 85,
      difficulty: "Легкая",
      scienceRating: 4.9,
      time: "20-30 мин",
      frequency: "Ежедневно"
    },
    {
      id: 4,
      title: "Кардио натощак",
      description: "Кардиотренировка низкой интенсивности перед завтраком для метаболической гибкости.",
      category: "physical",
      popularity: 79,
      difficulty: "Средняя",
      scienceRating: 4.3,
      time: "20-40 мин",
      frequency: "3-4 раза в неделю"
    },
    {
      id: 5,
      title: "Медитация осознанности",
      description: "Практика осознанности для снижения стресса, улучшения концентрации и когнитивных функций.",
      category: "cognitive",
      popularity: 90,
      difficulty: "Средняя",
      scienceRating: 4.6,
      time: "10-20 мин",
      frequency: "Ежедневно"
    },
    {
      id: 6,
      title: "Омега-3 жирные кислоты",
      description: "Прием омега-3 жирных кислот для поддержки работы мозга и снижения воспаления.",
      category: "supplements",
      popularity: 94,
      difficulty: "Легкая",
      scienceRating: 4.8,
      time: "1 мин",
      frequency: "Ежедневно"
    },
    {
      id: 7,
      title: "Блокировка синего света",
      description: "Использование очков, блокирующих синий свет, для улучшения качества сна.",
      category: "sleep",
      popularity: 86,
      difficulty: "Легкая",
      scienceRating: 4.5,
      time: "2-3 часа",
      frequency: "Ежедневно вечером"
    },
    {
      id: 8,
      title: "Утренняя гидратация",
      description: "Выпивание стакана воды сразу после пробуждения для гидратации и запуска обмена веществ.",
      category: "hydration",
      popularity: 95,
      difficulty: "Легкая",
      scienceRating: 4.4,
      time: "1 мин",
      frequency: "Ежедневно"
    },
    {
      id: 9,
      title: "Интервальное голодание 16/8",
      description: "Ограничение приема пищи 8-часовым окном для метаболического здоровья и аутофагии.",
      category: "nutrition",
      popularity: 91,
      difficulty: "Средняя",
      scienceRating: 4.7,
      time: "16 часов",
      frequency: "Ежедневно/несколько раз в неделю"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className="section-title">Элементы протокола</h1>
              <p className="section-subtitle">
                Каталог действий и компонентов для создания эффективных протоколов биохакинга
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 mt-4 md:mt-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Поиск элементов..." 
                  className="pl-10 w-full sm:w-60"
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
          
          <Tabs defaultValue="all" className="mb-6">
            <div className="overflow-x-auto pb-2">
              <TabsList className="h-auto p-1">
                {elementCategories.map((category) => (
                  <TabsTrigger 
                    key={category.id} 
                    value={category.id}
                    className="flex items-center px-3 py-2 h-9"
                  >
                    {category.icon}
                    <span className="ml-1">{category.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            <TabsContent value="all" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {elements.map((element) => (
                  <ElementCard key={element.id} {...element} />
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

export default Elements;
