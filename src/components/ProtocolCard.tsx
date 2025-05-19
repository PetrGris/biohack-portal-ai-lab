
import { BookOpen, Star, GitBranch, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface ProtocolCardProps {
  id?: string;
  title: string;
  description: string;
  author: string;
  category: string;
  rating: number;
  forks: number;
  days: number;
  difficulty: "Легкая" | "Средняя" | "Сложная";
  className?: string;
}

const ProtocolCard = ({
  id = "protocol-" + Math.random().toString(36).substr(2, 9),
  title,
  description,
  author,
  category,
  rating,
  forks,
  days,
  difficulty,
  className,
}: ProtocolCardProps) => {
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
    <Link to={`/protocol/${id}`} className="block">
      <div className={cn("protocol-card flex flex-col", className)}>
        <div className="flex items-start justify-between mb-2">
          <div>
            <div className="inline-block px-2 py-1 rounded text-xs font-medium bg-primary/10 text-primary mb-2">
              {category}
            </div>
            <h3 className="font-bold text-lg">{title}</h3>
          </div>
          <Button variant="ghost" size="icon" onClick={(e) => e.preventDefault()}>
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
        
        <p className="text-muted-foreground text-sm mb-4 flex-grow">
          {description}
        </p>
        
        <div className="text-xs text-muted-foreground mb-3">
          Автор: <span className="font-medium text-foreground">{author}</span>
        </div>
        
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-500 mr-1" />
              <span className="text-sm">{rating}</span>
            </div>
            <div className="flex items-center">
              <GitBranch className="h-4 w-4 text-primary mr-1" />
              <span className="text-sm">{forks}</span>
            </div>
            <div className="flex items-center">
              <BookOpen className="h-4 w-4 text-muted-foreground mr-1" />
              <span className="text-sm">{days} дн.</span>
            </div>
          </div>
          <div className={cn("text-sm font-medium", getDifficultyColor(difficulty))}>
            {difficulty}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProtocolCard;
