
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Element } from "@/hooks/useElements";
import { Star, Clock, Target, AlertTriangle, BookOpen, Zap } from "lucide-react";

interface ElementDetailDialogProps {
  element: Element | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddToProtocol?: (element: Element) => void;
  showAddButton?: boolean;
}

const ElementDetailDialog = ({ 
  element, 
  open, 
  onOpenChange, 
  onAddToProtocol,
  showAddButton = false 
}: ElementDetailDialogProps) => {
  if (!element) return null;

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "low": return "text-green-500";
      case "medium": return "text-yellow-500";
      case "high": return "text-red-500";
      default: return "text-gray-500";
    }
  };

  const getEvidenceLevelColor = (level: string) => {
    switch (level) {
      case "A": return "bg-green-500";
      case "B": return "bg-blue-500";
      case "C": return "bg-yellow-500";
      case "D": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getTypeLabel = (type: string) => {
    const typeLabels = {
      pharma: "Фармацевтика",
      nutraceutical: "Нутрицевтик",
      physical: "Физическая практика",
      cognitive: "Когнитивная тренировка",
      environmental: "Факторы среды",
      tech: "Технологии",
      behavioral: "Поведенческий паттерн",
      recovery: "Восстановление"
    };
    return typeLabels[type as keyof typeof typeLabels] || type;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="text-xl mb-2">{element.name}</DialogTitle>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline">{getTypeLabel(element.type)}</Badge>
                <Badge variant="outline" className={getComplexityColor(element.complexity)}>
                  Сложность: {element.complexity}
                </Badge>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  <span className="text-sm font-medium">{element.efficacy || 0}/10</span>
                </div>
              </div>
            </div>
          </div>
          
          <DialogDescription className="text-base">
            {element.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Механизм действия */}
          {element.mechanism && (
            <div>
              <h4 className="font-semibold text-sm text-muted-foreground mb-2 flex items-center">
                <Zap className="h-4 w-4 mr-2" />
                МЕХАНИЗМ ДЕЙСТВИЯ
              </h4>
              <p className="text-sm">{element.mechanism}</p>
            </div>
          )}

          <Separator />

          {/* Цели */}
          {element.goals && Array.isArray(element.goals) && element.goals.length > 0 && (
            <div>
              <h4 className="font-semibold text-sm text-muted-foreground mb-2 flex items-center">
                <Target className="h-4 w-4 mr-2" />
                ЦЕЛИ И ОЖИДАЕМЫЕ РЕЗУЛЬТАТЫ
              </h4>
              <ul className="text-sm space-y-1">
                {element.goals.map((goal, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    {goal}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Separator />

          {/* Протокол применения */}
          {element.usage && (
            <div>
              <h4 className="font-semibold text-sm text-muted-foreground mb-3 flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                ПРОТОКОЛ ПРИМЕНЕНИЯ
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                {element.usage.dose && (
                  <div>
                    <span className="font-medium text-muted-foreground">Дозировка:</span>
                    <p>{element.usage.dose}</p>
                  </div>
                )}
                
                {element.usage.method && (
                  <div>
                    <span className="font-medium text-muted-foreground">Способ:</span>
                    <p>{element.usage.method}</p>
                  </div>
                )}
                
                {element.usage.freq && (
                  <div>
                    <span className="font-medium text-muted-foreground">Частота:</span>
                    <p>{element.usage.freq}</p>
                  </div>
                )}
                
                {element.usage.schedule && element.usage.schedule.length > 0 && (
                  <div>
                    <span className="font-medium text-muted-foreground">Время:</span>
                    <p>{element.usage.schedule.join(", ")}</p>
                  </div>
                )}
                
                {element.usage.duration && (
                  <div>
                    <span className="font-medium text-muted-foreground">Длительность:</span>
                    <p>{element.usage.duration}</p>
                  </div>
                )}
                
                {element.usage.stop_if && (
                  <div>
                    <span className="font-medium text-muted-foreground">Прекратить при:</span>
                    <p>{element.usage.stop_if}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Теги */}
          {element.tags && Array.isArray(element.tags) && element.tags.length > 0 && (
            <>
              <Separator />
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground mb-2">ТЕГИ</h4>
                <div className="flex flex-wrap gap-1">
                  {element.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Закрыть
          </Button>
          {showAddButton && onAddToProtocol && (
            <Button onClick={() => onAddToProtocol(element)}>
              Добавить в протокол
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ElementDetailDialog;
