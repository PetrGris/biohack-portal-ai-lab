
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Calendar, TrendingUp, Plus, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface ElementCardProps {
  id: number;
  title: string;
  description: string;
  category: string;
  popularity: number;
  difficulty: string;
  scienceRating: number;
  time: string;
  frequency: string;
  className?: string;
}

const ElementCard = ({
  title,
  description,
  category,
  popularity,
  difficulty,
  scienceRating,
  time,
  frequency,
  className,
}: ElementCardProps) => {
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

  const getCategoryIcon = (category: string) => {
    // Здесь можно было бы сделать более точный выбор иконок,
    // но для примера просто вернем заглушку
    return <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary" />;
  };

  return (
    <Card className={cn("overflow-hidden card-hover", className)}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            {getCategoryIcon(category)}
            <h3 className="font-bold text-lg ml-3">{title}</h3>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-muted-foreground mb-4">{description}</p>
        
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center">
            <TrendingUp className="h-4 w-4 text-primary mr-2" />
            <span>Популярность: <strong>{popularity}%</strong></span>
          </div>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 mr-2" />
            <span>Научная база: <strong>{scienceRating}</strong></span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 text-muted-foreground mr-2" />
            <span>Время: <strong>{time}</strong></span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
            <span>Частота: <strong>{frequency}</strong></span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="border-t border-border pt-4 flex justify-between">
        <div className={cn("text-sm font-medium", getDifficultyColor(difficulty))}>
          {difficulty}
        </div>
        <Button variant="outline" size="sm" className="flex items-center space-x-1">
          <Plus className="h-3 w-3" />
          <span>Добавить</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ElementCard;
