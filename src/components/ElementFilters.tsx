
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, X, Filter } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface ElementFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  difficultyFilter: string;
  onDifficultyChange: (value: string) => void;
  scienceFilter: string;
  onScienceChange: (value: string) => void;
  timeFilter: string;
  onTimeChange: (value: string) => void;
  goalFilter: string;
  onGoalChange: (value: string) => void;
  onClearFilters: () => void;
}

const availableTags = [
  "мозг", "сон", "энергия", "фокус", "память", "настроение", "стресс", "восстановление",
  "иммунитет", "детокс", "антиэйдж", "производительность", "концентрация", "мотивация",
  "биохакинг", "долголетие", "здоровье", "спорт", "питание", "медитация"
];

const goals = [
  "Улучшение когнитивных функций",
  "Повышение энергии", 
  "Улучшение сна",
  "Снижение стресса",
  "Укрепление иммунитета",
  "Повышение физической выносливости",
  "Улучшение настроения",
  "Замедление старения"
];

const ElementFilters = ({
  searchTerm,
  onSearchChange,
  selectedTags,
  onTagsChange,
  sortBy,
  onSortChange,
  difficultyFilter,
  onDifficultyChange,
  scienceFilter,
  onScienceChange,
  timeFilter,
  onTimeChange,
  goalFilter,
  onGoalChange,
  onClearFilters
}: ElementFiltersProps) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter(t => t !== tag));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

  const hasActiveFilters = selectedTags.length > 0 || difficultyFilter !== "all" || 
    scienceFilter !== "all" || timeFilter !== "all" || goalFilter !== "all";

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Поиск по названию, описанию, механизму действия..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Сортировка" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">По названию</SelectItem>
              <SelectItem value="popularity">По популярности</SelectItem>
              <SelectItem value="science">По научности</SelectItem>
              <SelectItem value="difficulty">По сложности</SelectItem>
              <SelectItem value="time">По времени</SelectItem>
            </SelectContent>
          </Select>
          
          <Button 
            variant="outline" 
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Фильтры
            {hasActiveFilters && (
              <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                {selectedTags.length + 
                 (difficultyFilter !== "all" ? 1 : 0) + 
                 (scienceFilter !== "all" ? 1 : 0) + 
                 (timeFilter !== "all" ? 1 : 0) + 
                 (goalFilter !== "all" ? 1 : 0)}
              </Badge>
            )}
          </Button>
        </div>
      </div>

      <Collapsible open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
        <CollapsibleContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Цель</label>
              <Select value={goalFilter} onValueChange={onGoalChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Все цели" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все цели</SelectItem>
                  {goals.map(goal => (
                    <SelectItem key={goal} value={goal}>{goal}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Сложность</label>
              <Select value={difficultyFilter} onValueChange={onDifficultyChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Любая" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Любая</SelectItem>
                  <SelectItem value="Легкая">Легкая</SelectItem>
                  <SelectItem value="Средняя">Средняя</SelectItem>
                  <SelectItem value="Сложная">Сложная</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Научная база</label>
              <Select value={scienceFilter} onValueChange={onScienceChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Любая" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Любая</SelectItem>
                  <SelectItem value="high">Высокая (4-5)</SelectItem>
                  <SelectItem value="medium">Средняя (3)</SelectItem>
                  <SelectItem value="low">Низкая (1-2)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Время выполнения</label>
              <Select value={timeFilter} onValueChange={onTimeChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Любое" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Любое</SelectItem>
                  <SelectItem value="quick">Быстро (до 10 мин)</SelectItem>
                  <SelectItem value="medium">Среднее (10-30 мин)</SelectItem>
                  <SelectItem value="long">Долго (30+ мин)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Теги</label>
            <div className="flex flex-wrap gap-2">
              {availableTags.map(tag => (
                <Badge 
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary/80"
                  onClick={() => handleTagToggle(tag)}
                >
                  {tag}
                  {selectedTags.includes(tag) && (
                    <X className="h-3 w-3 ml-1" />
                  )}
                </Badge>
              ))}
            </div>
          </div>

          {hasActiveFilters && (
            <div className="flex justify-between items-center pt-2 border-t">
              <div className="text-sm text-muted-foreground">
                Активных фильтров: {selectedTags.length + 
                 (difficultyFilter !== "all" ? 1 : 0) + 
                 (scienceFilter !== "all" ? 1 : 0) + 
                 (timeFilter !== "all" ? 1 : 0) + 
                 (goalFilter !== "all" ? 1 : 0)}
              </div>
              <Button variant="ghost" size="sm" onClick={onClearFilters}>
                Очистить все фильтры
              </Button>
            </div>
          )}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default ElementFilters;
