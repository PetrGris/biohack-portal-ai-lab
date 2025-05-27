
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import ElementCard from "./ElementCard";
import { useElements } from "@/hooks/useElements";

// Element categories definition
const elementCategories = [
  { id: "all", label: "Все" },
  { id: "behavioral", label: "Поведенческие" },
  { id: "nutraceutical", label: "Добавки" },
  { id: "physical", label: "Физические" },
  { id: "cognitive", label: "Когнитивные" },
  { id: "environmental", label: "Окружающая среда" },
  { id: "tech", label: "Технологии" },
  { id: "recovery", label: "Восстановление" },
  { id: "pharma", label: "Фармацевтика" }
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
  const [filteredElements, setFilteredElements] = useState<any[]>([]);
  const { toast } = useToast();
  const { data: elements, isLoading } = useElements();

  // Filter elements based on search and category
  useEffect(() => {
    if (!elements) {
      setFilteredElements([]);
      return;
    }

    let filtered = elements;
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(element => 
        element.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        element.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        element.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(element => element.type === selectedCategory);
    }
    
    setFilteredElements(filtered);
  }, [searchTerm, selectedCategory, elements]);

  // Check if element is already in protocol
  const isElementInProtocol = (elementId: string) => {
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

  if (isLoading) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Добавить элемент в протокол</DialogTitle>
            <DialogDescription>Загрузка элементов...</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }

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
                      id={element.id}
                      title={element.title}
                      description={element.description}
                      category={element.category}
                      popularity={element.popularity}
                      difficulty={element.difficulty}
                      scienceRating={element.science_rating}
                      time={element.time || "Не указано"}
                      frequency={element.frequency || "По необходимости"}
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
