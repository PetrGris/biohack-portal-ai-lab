
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import ElementCard from "./ElementCard";

// Element categories definition
const elementCategories = [
  { id: "all", label: "Все" },
  { id: "sleep", label: "Сон" },
  { id: "nutrition", label: "Питание" },
  { id: "supplements", label: "Добавки" },
  { id: "cognitive", label: "Когнитивность" },
  { id: "physical", label: "Физическая активность" },
  { id: "light", label: "Световые воздействия" },
  { id: "cardiovascular", label: "Сердечно-сосудистая система" },
  { id: "hydration", label: "Гидратация" }
];

// Sample elements data
const allElements = [
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

interface AddElementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddElement: (element: any) => void;
  currentProtocolElements: any[];
}

const AddElementDialog = ({
  open,
  onOpenChange,
  onAddElement,
  currentProtocolElements
}: AddElementDialogProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredElements, setFilteredElements] = useState(allElements);
  const { toast } = useToast();

  // Filter elements based on search and category
  useEffect(() => {
    let filtered = allElements;
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(element => 
        element.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        element.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(element => element.category === selectedCategory);
    }
    
    setFilteredElements(filtered);
  }, [searchTerm, selectedCategory]);

  // Check if element is already in protocol
  const isElementInProtocol = (elementId: number) => {
    return currentProtocolElements.some(element => element.id === elementId);
  };

  // Handle adding element to protocol
  const handleAddElement = (element: any) => {
    if (!isElementInProtocol(element.id)) {
      onAddElement(element);
      toast({
        title: "Элемент добавлен",
        description: `${element.title} добавлен в протокол`
      });
    } else {
      toast({
        title: "Элемент уже добавлен",
        description: "Этот элемент уже есть в протоколе",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Добавить элемент в протокол</DialogTitle>
          <DialogDescription>
            Выберите элементы для добавления в ваш протокол
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex items-center space-x-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Поиск элементов..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Фильтры
          </Button>
        </div>

        <Tabs defaultValue="all" className="flex-1" onValueChange={setSelectedCategory}>
          <div className="overflow-x-auto pb-2">
            <TabsList className="h-auto p-1">
              {elementCategories.map((category) => (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id}
                  className="flex items-center px-3 py-2 h-9"
                >
                  <span className="ml-1">{category.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          <ScrollArea className="flex-1 max-h-[50vh] pr-4">
            <TabsContent value={selectedCategory} className="mt-4 h-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredElements.map((element) => (
                  <div key={element.id} className="relative">
                    <ElementCard 
                      {...element}
                      className={isElementInProtocol(element.id) ? "border-primary/50 bg-primary/5" : ""}
                    >
                      <Button 
                        onClick={() => handleAddElement(element)} 
                        disabled={isElementInProtocol(element.id)}
                        variant={isElementInProtocol(element.id) ? "outline" : "default"}
                        size="sm"
                        className="mt-2"
                      >
                        {isElementInProtocol(element.id) ? "Уже добавлен" : "Добавить"}
                      </Button>
                    </ElementCard>
                  </div>
                ))}
                
                {filteredElements.length === 0 && (
                  <div className="col-span-2 text-center p-4">
                    <p className="text-muted-foreground">Элементы не найдены</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>

        <DialogFooter className="pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Закрыть</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddElementDialog;
