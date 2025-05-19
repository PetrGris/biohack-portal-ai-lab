
import { Calendar, User, MessageSquare, Eye } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface NewsCardProps {
  title: string;
  preview: string;
  date: string;
  category: string;
  author: string;
  commentsCount: number;
  viewsCount: number;
  image?: string;
  className?: string;
}

const NewsCard = ({
  title,
  preview,
  date,
  category,
  author,
  commentsCount,
  viewsCount,
  image,
  className,
}: NewsCardProps) => {
  return (
    <Card className={cn("overflow-hidden card-hover", className)}>
      {image && (
        <div className="w-full h-48 overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center mb-2">
          <Badge variant="outline" className="bg-primary/10 text-primary">
            {category}
          </Badge>
          <div className="flex items-center text-muted-foreground text-xs">
            <Calendar className="h-3 w-3 mr-1" />
            <span>{date}</span>
          </div>
        </div>
        <h3 className="font-bold text-lg">{title}</h3>
      </CardHeader>
      
      <CardContent>
        <p className="text-muted-foreground line-clamp-3">{preview}</p>
      </CardContent>
      
      <CardFooter className="border-t border-border pt-4 flex justify-between text-xs text-muted-foreground">
        <div className="flex items-center">
          <User className="h-3 w-3 mr-1" />
          <span>{author}</span>
        </div>
        
        <div className="flex space-x-4">
          <div className="flex items-center">
            <MessageSquare className="h-3 w-3 mr-1" />
            <span>{commentsCount}</span>
          </div>
          <div className="flex items-center">
            <Eye className="h-3 w-3 mr-1" />
            <span>{viewsCount}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default NewsCard;
