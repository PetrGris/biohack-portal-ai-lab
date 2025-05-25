
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import ElementCard from "@/components/ElementCard";
import ElementDetailDialog from "@/components/ElementDetailDialog";
import CreateElementWizard from "@/components/CreateElementWizard";
import ElementFilters from "@/components/ElementFilters";
import { allElements, ElementData } from "@/data/elements";

const Elements = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedElement, setSelectedElement] = useState<ElementData | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isCreateWizardOpen, setIsCreateWizardOpen] = useState(false);
  const [elements, setElements] = useState<ElementData[]>(allElements);
  
  // Filter states
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("name");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [scienceFilter, setScienceFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("all");
  const [goalFilter, setGoalFilter] = useState("all");

  // Filter elements based on all criteria
  const filteredElements = elements.filter(element => {
    // Search filter
    const matchesSearch = !searchTerm || 
      element.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      element.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      element.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      element.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      element.mechanism?.toLowerCase().includes(searchTerm.toLowerCase());
      
    // Category filter
    const matchesCategory = selectedCategory === "all" || element.type === selectedCategory;
    
    // Tags filter
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.some(tag => element.tags?.includes(tag));
    
    // Difficulty filter
    const matchesDifficulty = difficultyFilter === "all" || element.difficulty === difficultyFilter;
    
    // Science filter
    const matchesScience = scienceFilter === "all" || 
      (scienceFilter === "high" && element.scienceRating >= 4) ||
      (scienceFilter === "medium" && element.scienceRating === 3) ||
      (scienceFilter === "low" && element.scienceRating <= 2);
    
    // Time filter
    const matchesTime = timeFilter === "all" || 
      (timeFilter === "quick" && element.time.includes("мин") && parseInt(element.time) <= 10) ||
      (timeFilter === "medium" && element.time.includes("мин") && parseInt(element.time) > 10 && parseInt(element.time) <= 30) ||
      (timeFilter === "long" && (element.time.includes("час") || (element.time.includes("мин") && parseInt(element.time) > 30)));
    
    // Goal filter
    const matchesGoal = goalFilter === "all" || 
      element.goals?.some(goal => goal.includes(goalFilter));
    
    return matchesSearch && matchesCategory && matchesTags && matchesDifficulty && 
           matchesScience && matchesTime && matchesGoal;
  });

  // Sort elements
  const sortedElements = [...filteredElements].sort((a, b) => {
    switch (sortBy) {
      case "popularity":
        return b.popularity - a.popularity;
      case "science":
        return b.scienceRating - a.scienceRating;
      case "difficulty":
        const difficultyOrder = { "Легкая": 1, "Средняя": 2, "Сложная": 3 };
        return difficultyOrder[a.difficulty as keyof typeof difficultyOrder] - 
               difficultyOrder[b.difficulty as keyof typeof difficultyOrder];
      case "time":
        const getTimeValue = (time: string) => {
          if (time.includes("час")) return parseInt(time) * 60;
          return parseInt(time) || 0;
        };
        return getTimeValue(a.time) - getTimeValue(b.time);
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const handleViewElement = (element: ElementData) => {
    setSelectedElement(element);
    setIsDetailDialogOpen(true);
  };

  const handleElementCreated = (newElement: ElementData) => {
    setElements(prev => [...prev, newElement]);
  };

  const handleClearFilters = () => {
    setSelectedTags([]);
    setSortBy("name");
    setDifficultyFilter("all");
    setScienceFilter("all");
    setTimeFilter("all");
    setGoalFilter("all");
    setSearchTerm("");
  };

  // Group elements by category for the tabs
  const elementsByCategory = {
    all: sortedElements,
    pharma: sortedElements.filter(e => e.type === "pharma"),
    nutraceutical: sortedElements.filter(e => e.type === "nutraceutical"),
    physical: sortedElements.filter(e => e.type === "physical"),
    cognitive: sortedElements.filter(e => e.type === "cognitive"),
    environmental: sortedElements.filter(e => e.type === "environmental"),
    tech: sortedElements.filter(e => e.type === "tech"),
    behavioral: sortedElements.filter(e => e.type === "behavioral"),
    recovery: sortedElements.filter(e => e.type === "recovery")
  };

  const categoryLabels = {
    all: "Все элементы",
    pharma: "Лекарственные препараты",
    nutraceutical: "БАДы/нутрицевтики", 
    physical: "Физические практики",
    cognitive: "Когнитивные тренировки",
    environmental: "Факторы среды",
    tech: "Устройства",
    behavioral: "Поведенческие паттерны",
    recovery: "Регенеративные методики"
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
          
          <ElementFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedTags={selectedTags}
            onTagsChange={setSelectedTags}
            sortBy={sortBy}
            onSortChange={setSortBy}
            difficultyFilter={difficultyFilter}
            onDifficultyChange={setDifficultyFilter}
            scienceFilter={scienceFilter}
            onScienceChange={setScienceFilter}
            timeFilter={timeFilter}
            onTimeChange={setTimeFilter}
            goalFilter={goalFilter}
            onGoalChange={setGoalFilter}
            onClearFilters={handleClearFilters}
          />
          
          <Tabs defaultValue="all" className="w-full mt-6" onValueChange={setSelectedCategory}>
            <TabsList className="w-full overflow-x-auto justify-start">
              {Object.entries(categoryLabels).map(([key, label]) => (
                <TabsTrigger key={key} value={key} className="whitespace-nowrap">
                  {label} ({elementsByCategory[key as keyof typeof elementsByCategory].length})
                </TabsTrigger>
              ))}
            </TabsList>
            
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
                          ? "Элементы не найдены по заданным критериям" 
                          : `Элементы категории "${label}" не найдены по заданным критериям`
                        }
                      </p>
                      {(selectedTags.length > 0 || difficultyFilter !== "all" || 
                        scienceFilter !== "all" || timeFilter !== "all" || goalFilter !== "all") && (
                        <Button variant="outline" className="mt-2" onClick={handleClearFilters}>
                          Сбросить фильтры
                        </Button>
                      )}
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
