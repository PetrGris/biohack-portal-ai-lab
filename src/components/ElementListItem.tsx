import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Clock, Calendar, TrendingUp, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface ElementListItemProps {
  id: string; // Changed from number to string to match UUID from database
  title: string;
  description: string;
  category: string;
  popularity: number;
  difficulty: string;
  scienceRating: number;
  time: string;
  frequency: string;
  tags?: string[];
  onClick?: () => void;
}

const ElementListItem = ({
  title,
  description,
  category,
  popularity,
  difficulty,
  scienceRating,
  time,
  frequency,
  tags,
  onClick,
}: ElementListItemProps) => {
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

  const getCategoryLabel = (category: string) => {
    const categoryLabels = {
      pharma: "Лекарственные препараты",
      nutraceutical: "БАДы/нутрицевтики",
      physical: "Физические практики",
      cognitive: "Когнитивные тренировки",
      environmental: "Факторы среды",
      tech: "Устройства",
      behavioral: "Поведенческие паттерны",
      recovery: "Регенеративные методики"
    };
    return categoryLabels[category as keyof typeof categoryLabels] || category;
  };

  return (
    <TableRow className="cursor-pointer hover:bg-muted/50" onClick={onClick}>
      <TableCell>
        <div>
          <h3 className="font-semibold text-base">{title}</h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{description}</p>
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{tags.length - 3}
                </Badge>
              )}
            </div>
          )}
        </div>
      </TableCell>
      <TableCell>
        <Badge variant="secondary">{getCategoryLabel(category)}</Badge>
      </TableCell>
      <TableCell>
        <div className="flex items-center">
          <TrendingUp className="h-4 w-4 text-primary mr-1" />
          <span className="font-medium">{popularity}%</span>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center">
          <Star className="h-4 w-4 text-yellow-500 mr-1" />
          <span className="font-medium">{scienceRating}/5</span>
        </div>
      </TableCell>
      <TableCell>
        <div className={cn("font-medium", getDifficultyColor(difficulty))}>
          {difficulty}
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center text-sm">
          <Clock className="h-4 w-4 text-muted-foreground mr-1" />
          <span>{time}</span>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center text-sm">
          <Calendar className="h-4 w-4 text-muted-foreground mr-1" />
          <span>{frequency}</span>
        </div>
      </TableCell>
      <TableCell>
        <Button variant="outline" size="sm" onClick={(e) => {
          e.stopPropagation();
          onClick?.();
        }}>
          Подробнее
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default ElementListItem;
