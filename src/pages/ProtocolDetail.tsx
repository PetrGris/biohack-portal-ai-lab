import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
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
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Star,
  GitBranch,
  Clock,
  Share2,
  ArrowLeft,
  Plus,
  Trash2,
  FileText,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AddElementDialog from "@/components/AddElementDialog";
import ElementDetailDialog from "@/components/ElementDetailDialog";
import { allElements } from "@/data/elements";

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
      allElements.find(e => e.id === 21) || allElements[0], // Контрастный душ
      allElements.find(e => e.id === 14) || allElements[1], // Медитация
      allElements.find(e => e.id === 24) || allElements[2]  // Утренняя гидратация
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
      allElements.find(e => e.id === 9) || allElements[0],  // Blue light blocking очки
      allElements.find(e => e.id === 8) || allElements[1]   // Магний глицинат
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
      allElements.find(e => e.id === 25) || allElements[0]  // Витамин D3 + K2
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
      allElements.find(e => e.id === 22) || allElements[0], // Омега-3
      allElements.find(e => e.id === 23) || allElements[1]  // Техника Помодоро
    ]
  }
];

const ProtocolDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedElement, setSelectedElement] = useState<number | null>(null);
  const [isElementDetailOpen, setIsElementDetailOpen] = useState(false);
  const [currentElement, setCurrentElement] = useState<any>(null);
  const [isAddElementDialogOpen, setIsAddElementDialogOpen] = useState(false);
  
  // Find the protocol by ID
  const [protocol, setProtocol] = useState(() => {
    const found = protocolsData.find(p => p.id === id);
    return found ? {...found} : null;
  });
  
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
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteElement = () => {
    if (selectedElement !== null && protocol) {
      const updatedElements = protocol.elements.filter(element => element.id !== selectedElement);
      setProtocol({...protocol, elements: updatedElements});
      
      toast({
        title: "Элемент удален",
        description: `Элемент успешно удален из протокола`,
      });
    }
    setIsDeleteDialogOpen(false);
  };
  
  const handleViewElement = (element: any) => {
    setCurrentElement(element);
    setIsElementDetailOpen(true);
  };

  const handleAddElementToProtocol = (element: any) => {
    if (protocol) {
      // Check if element is already in the protocol
      if (protocol.elements.some(e => e.id === element.id)) {
        toast({
          title: "Элемент уже добавлен",
          description: "Этот элемент уже есть в протоколе",
          variant: "destructive"
        });
        return;
      }
      
      // Add element to protocol
      const updatedProtocol = {
        ...protocol,
        elements: [...protocol.elements, element]
      };
      
      setProtocol(updatedProtocol);
    }
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
              <Button 
                className="flex items-center"
                onClick={() => setIsAddElementDialogOpen(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Добавить элемент
              </Button>
            </div>
            
            {protocol.elements.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableCaption>Список шагов протокола {protocol.title}</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">№</TableHead>
                      <TableHead>Название</TableHead>
                      <TableHead className="max-w-xs">Описание</TableHead>
                      <TableHead>Частота</TableHead>
                      <TableHead>Время</TableHead>
                      <TableHead>Сложность</TableHead>
                      <TableHead className="text-right">Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {protocol.elements.map((element, index) => (
                      <TableRow 
                        key={element.id} 
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => handleViewElement(element)}
                      >
                        <TableCell className="font-medium">{index + 1}</TableCell>
                        <TableCell className="font-medium">{element.name || element.title}</TableCell>
                        <TableCell className="max-w-xs">
                          <div className="truncate" title={element.desc || element.description}>
                            {element.desc || element.description}
                          </div>
                        </TableCell>
                        <TableCell>{element.usage?.freq || element.frequency}</TableCell>
                        <TableCell>{element.usage?.duration || element.time}</TableCell>
                        <TableCell className={getDifficultyColor(element.difficulty)}>
                          {element.complexity === "low" ? "Легкая" : 
                           element.complexity === "medium" ? "Средняя" :
                           element.complexity === "high" ? "Сложная" : element.difficulty}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2" onClick={(e) => e.stopPropagation()}>
                            <Button 
                              variant="outline" 
                              size="icon" 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteElement(element.id);
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="icon" 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleViewElement(element);
                              }}
                            >
                              <FileText className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center p-8 border border-dashed rounded-lg">
                <p className="text-muted-foreground">Этот протокол пока не содержит элементов</p>
                <Button 
                  className="mt-4 flex items-center mx-auto"
                  onClick={() => setIsAddElementDialogOpen(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Добавить первый элемент
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      {/* Delete element confirmation dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Удалить элемент?</DialogTitle>
            <DialogDescription>
              Это действие нельзя будет отменить. Элемент будет удален из протокола.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Отмена</Button>
            <Button variant="destructive" onClick={confirmDeleteElement}>Удалить</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Element detail dialog with full information */}
      <ElementDetailDialog
        element={currentElement}
        open={isElementDetailOpen}
        onOpenChange={setIsElementDetailOpen}
        onAddToProtocol={handleAddElementToProtocol}
        showAddButton={false}
      />
      
      {/* Add element dialog */}
      <AddElementDialog 
        open={isAddElementDialogOpen}
        onOpenChange={setIsAddElementDialogOpen}
        onAddElement={handleAddElementToProtocol}
        currentProtocolElements={protocol.elements}
      />
      
      <Footer />
    </div>
  );
};

export default ProtocolDetail;
