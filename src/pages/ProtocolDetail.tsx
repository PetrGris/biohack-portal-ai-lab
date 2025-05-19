
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Star,
  GitBranch,
  Clock,
  Share2,
  ArrowLeft,
  Plus,
  Trash2,
  Copy,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ElementCard from "@/components/ElementCard";

// Sample protocols data - in a real app, this would come from an API
const protocolsData = [
  {
    id: "morning-ritual",
    title: "Утренний ритуал для продуктивности",
    description: "Персональный протокол для максимальной энергии и концентрации в первой половине дня.",
    author: "Я",
    category: "Продуктивность",
    rating: 4.5,
    forks: 0,
    days: 7,
    difficulty: "Легкая" as const,
    status: "В процессе",
    lastUpdated: "Вчера",
    elements: [
      {
        id: 1,
        title: "Контрастный душ",
        description: "Чередование горячей и холодной воды для улучшения кровообращения и бодрости",
        category: "Энергия",
        popularity: 85,
        difficulty: "Легкая",
        scienceRating: 4.2,
        time: "5 мин",
        frequency: "Ежедневно",
      },
      {
        id: 2,
        title: "Медитация осознанности",
        description: "Короткая практика для ментальной ясности и фокуса на предстоящий день",
        category: "Стресс",
        popularity: 92,
        difficulty: "Легкая",
        scienceRating: 4.7,
        time: "10 мин",
        frequency: "Ежедневно",
      },
      {
        id: 3,
        title: "Стакан воды с лимоном",
        description: "Гидратация и активация пищеварительной системы перед завтраком",
        category: "Питание",
        popularity: 78,
        difficulty: "Легкая",
        scienceRating: 3.8,
        time: "2 мин",
        frequency: "Ежедневно",
      }
    ]
  },
  {
    id: "sleep-optimization",
    title: "Оптимизация сна (форк)",
    description: "Адаптированный протокол для глубокого сна и быстрого засыпания с учетом моих особенностей.",
    author: "Я (форк от Алексей К.)",
    category: "Сон",
    rating: 5.0,
    forks: 2,
    days: 14,
    difficulty: "Средняя" as const,
    status: "Активен",
    lastUpdated: "3 дня назад",
    elements: [
      {
        id: 4,
        title: "Блокировка синего света",
        description: "Использование очков, блокирующих синий свет, за 2 часа до сна",
        category: "Сон",
        popularity: 89,
        difficulty: "Легкая",
        scienceRating: 4.8,
        time: "2 часа",
        frequency: "Ежедневно",
      },
      {
        id: 5,
        title: "Магниевая добавка",
        description: "Прием магния глицината для расслабления мышц и нервной системы",
        category: "Добавки",
        popularity: 76,
        difficulty: "Легкая",
        scienceRating: 4.5,
        time: "1 мин",
        frequency: "Ежедневно",
      }
    ]
  },
  {
    id: "vitamin-d",
    title: "Протокол микродозинга витамина D",
    description: "Экспериментальный протокол с ежедневным приемом небольших доз витамина D для улучшения иммунитета.",
    author: "Я",
    category: "Добавки",
    rating: 4.2,
    forks: 0,
    days: 30,
    difficulty: "Легкая" as const,
    status: "Завершен",
    lastUpdated: "2 недели назад",
    elements: [
      {
        id: 6,
        title: "Витамин D3",
        description: "Прием 1000 ME витамина D3 ежедневно в первой половине дня с жирной пищей",
        category: "Добавки",
        popularity: 94,
        difficulty: "Легкая",
        scienceRating: 4.9,
        time: "1 мин",
        frequency: "Ежедневно",
      },
      {
        id: 7,
        title: "Витамин K2",
        description: "Сочетание с витамином K2 для синергетического эффекта и правильного усвоения кальция",
        category: "Добавки",
        popularity: 72,
        difficulty: "Легкая",
        scienceRating: 4.6,
        time: "1 мин",
        frequency: "Ежедневно",
      }
    ]
  },
  {
    id: "cognitive-optimization",
    title: "Когнитивная оптимизация",
    description: "Комплексный протокол для улучшения памяти и ментальной энергии с использованием нутрицевтиков.",
    author: "Я (форк от Мария Л.)",
    category: "Когнитивность",
    rating: 4.7,
    forks: 1,
    days: 21,
    difficulty: "Сложная" as const,
    status: "Черновик",
    lastUpdated: "1 неделю назад",
    elements: [
      {
        id: 8,
        title: "Комплекс омега-3",
        description: "Высокая доза EPA/DHA для поддержки когнитивных функций и снижения воспаления",
        category: "Добавки",
        popularity: 88,
        difficulty: "Легкая",
        scienceRating: 4.7,
        time: "1 мин",
        frequency: "Ежедневно",
      },
      {
        id: 9,
        title: "Техника Помодоро",
        description: "Работа интервалами по 25 минут с короткими перерывами для оптимизации фокуса",
        category: "Продуктивность",
        popularity: 90,
        difficulty: "Средняя",
        scienceRating: 4.3,
        time: "25 мин",
        frequency: "По необходимости",
      }
    ]
  }
];

const ProtocolDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedElement, setSelectedElement] = useState<number | null>(null);
  
  // Find the protocol by ID
  const protocol = protocolsData.find(p => p.id === id);
  
  if (!protocol) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="text-center my-12">
            <h2 className="text-2xl font-bold mb-4">Протокол не найден</h2>
            <Button onClick={() => navigate(-1)} className="flex items-center">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Вернуться назад
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleBack = () => {
    navigate(-1);
  };

  const handleFork = () => {
    toast({
      title: "Протокол скопирован",
      description: `Форк протокола "${protocol.title}" создан в ваших протоколах`,
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Ссылка скопирована",
      description: "Ссылка на протокол скопирована в буфер обмена",
    });
  };

  const handleDeleteElement = (elementId: number) => {
    setSelectedElement(elementId);
    setIsDialogOpen(true);
  };

  const confirmDeleteElement = () => {
    toast({
      title: "Элемент удален",
      description: `Элемент успешно удален из протокола`,
    });
    setIsDialogOpen(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Легкая":
        return "text-green-500";
      case "Средняя":
        return "text-yellow-500";
      case "Сложная":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <Button variant="outline" onClick={handleBack} className="mb-6 flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Назад
          </Button>
          
          <div className="bg-white rounded-lg border border-border shadow-sm p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-start justify-between mb-4">
              <div>
                <div className="flex items-center mb-2">
                  <div className="inline-block px-2 py-1 rounded text-xs font-medium bg-primary/10 text-primary mr-3">
                    {protocol.category}
                  </div>
                  <div className={`text-sm font-medium ${getDifficultyColor(protocol.difficulty)}`}>
                    {protocol.difficulty}
                  </div>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">{protocol.title}</h1>
                <p className="text-muted-foreground mb-4 md:max-w-2xl">{protocol.description}</p>
              </div>
              
              <div className="flex flex-col space-y-2 mt-4 md:mt-0">
                <Button onClick={handleFork} className="flex items-center w-full md:w-auto">
                  <GitBranch className="h-4 w-4 mr-2" />
                  Сделать форк
                </Button>
                <Button variant="outline" onClick={handleShare} className="flex items-center w-full md:w-auto">
                  <Share2 className="h-4 w-4 mr-2" />
                  Поделиться
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Автор</span>
                <span className="font-medium">{protocol.author}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Длительность</span>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-muted-foreground mr-1" />
                  <span className="font-medium">{protocol.days} дней</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Рейтинг</span>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  <span className="font-medium">{protocol.rating}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between border-t border-b border-border py-4 my-6">
              <h2 className="font-bold text-xl">Элементы протокола</h2>
              <Button className="flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                Добавить элемент
              </Button>
            </div>
            
            {protocol.elements.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {protocol.elements.map((element) => (
                  <div key={element.id} className="relative">
                    <div className="absolute top-3 right-3 z-10 flex space-x-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90"
                        onClick={() => handleDeleteElement(element.id)}
                      >
                        <Trash2 className="h-4 w-4 text-muted-foreground" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90"
                      >
                        <Copy className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </div>
                    <ElementCard {...element} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-8 border border-dashed rounded-lg">
                <p className="text-muted-foreground">Этот протокол пока не содержит элементов</p>
                <Button className="mt-4 flex items-center mx-auto">
                  <Plus className="h-4 w-4 mr-2" />
                  Добавить первый элемент
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Удалить элемент?</DialogTitle>
            <DialogDescription>
              Это действие нельзя будет отменить. Элемент будет удален из протокола.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Отмена</Button>
            <Button variant="destructive" onClick={confirmDeleteElement}>Удалить</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default ProtocolDetail;
