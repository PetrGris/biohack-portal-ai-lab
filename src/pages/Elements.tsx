
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, Filter, ListFilter } from "lucide-react";
import ElementCard from "@/components/ElementCard";
import ElementDetailDialog from "@/components/ElementDetailDialog";
import CreateElementWizard from "@/components/CreateElementWizard";
import { allElements, ElementData } from "@/data/elements";

const Elements = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedElement, setSelectedElement] = useState<ElementData | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isCreateWizardOpen, setIsCreateWizardOpen] = useState(false);
  const [elements, setElements] = useState<ElementData[]>(allElements);

  // Filter elements based on search and category
  const filteredElements = elements.filter(element => {
    const matchesSearch = !searchTerm || 
      element.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      element.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      element.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      element.description.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesCategory = selectedCategory === "all" || element.type === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleViewElement = (element: ElementData) => {
    setSelectedElement(element);
    setIsDetailDialogOpen(true);
  };

  const handleElementCreated = (newElement: ElementData) => {
    setElements(prev => [...prev, newElement]);
  };

  // Group elements by category for the tabs
  const elementsByCategory = {
    all: filteredElements,
    behavioral: filteredElements.filter(e => e.type === "behavioral"),
    nutraceutical: filteredElements.filter(e => e.type === "nutraceutical"),
    physical: filteredElements.filter(e => e.type === "physical"),
    cognitive: filteredElements.filter(e => e.type === "cognitive"),
    environmental: filteredElements.filter(e => e.type === "environmental"),
    tech: filteredElements.filter(e => e.type === "tech"),
    recovery: filteredElements.filter(e => e.type === "recovery"),
    pharma: filteredElements.filter(e => e.type === "pharma")
  };

  const categoryLabels = {
    all: "Все элементы",
    behavioral: "Поведенческие",
    nutraceutical: "Добавки",
    physical: "Физические",
    cognitive: "Когнитивные",
    environmental: "Окружающая среда",
    tech: "Технологии",
    recovery: "Восстановление",
    pharma: "Фармацевтика"
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className="section-title">База элементов</h1>
              <p className="section-subtitle">
                Научно обоснованные элементы для создания ваших протоколов биохакинга
              </p>
            </div>
            
            <div className="flex mt-4 md:mt-0">
              <Button 
                className="flex items-center"
                onClick={() => setIsCreateWizardOpen(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Создать элемент
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="all" className="w-full" onValueChange={setSelectedCategory}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
              <TabsList className="w-full sm:w-auto overflow-x-auto">
                {Object.entries(categoryLabels).map(([key, label]) => (
                  <TabsTrigger key={key} value={key} className="whitespace-nowrap">
                    {label} ({elementsByCategory[key as keyof typeof elementsByCategory].length})
                  </TabsTrigger>
                ))}
              </TabsList>
              
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
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
                  <ListFilter className="h-4 w-4 mr-2" />
                  Сортировка
                </Button>
              </div>
            </div>
            
            {Object.entries(categoryLabels).map(([key, label]) => (
              <TabsContent key={key} value={key} className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {elementsByCategory[key as keyof typeof elementsByCategory].map((element) => (
                    <ElementCard 
                      key={element.id} 
                      {...element}
                      onClick={() => handleViewElement(element)}
                      className="cursor-pointer hover:shadow-md transition-shadow"
                    >
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewElement(element);
                        }}
                        className="w-full mt-2"
                      >
                        Подробнее
                      </Button>
                    </ElementCard>
                  ))}
                  
                  {elementsByCategory[key as keyof typeof elementsByCategory].length === 0 && (
                    <div className="col-span-full text-center p-8">
                      <p className="text-muted-foreground">
                        {selectedCategory === "all" 
                          ? "Элементы не найдены" 
                          : `Элементы категории "${label}" не найдены`
                        }
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
      
      {/* Element detail dialog */}
      <ElementDetailDialog
        element={selectedElement}
        open={isDetailDialogOpen}
        onOpenChange={setIsDetailDialogOpen}
        showAddButton={false}
      />
      
      {/* Create element wizard */}
      <CreateElementWizard
        open={isCreateWizardOpen}
        onOpenChange={setIsCreateWizardOpen}
        onElementCreated={handleElementCreated}
      />
      
      <Footer />
    </div>
  );
};

export default Elements;
