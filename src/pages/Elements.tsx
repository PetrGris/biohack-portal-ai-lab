
import { useState } from "react";
import { useElements } from "@/hooks/useElements";
import Navbar from "@/components/Navbar";
import ElementFilters from "@/components/ElementFilters";
import ElementCard from "@/components/ElementCard";
import ElementListItem from "@/components/ElementListItem";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Elements = () => {
  const { data: elements, isLoading, error } = useElements();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("name");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [scienceFilter, setScienceFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("all");
  const [goalFilter, setGoalFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const handleClearFilters = () => {
    setSelectedTags([]);
    setDifficultyFilter("all");
    setScienceFilter("all");
    setTimeFilter("all");
    setGoalFilter("all");
    setSearchTerm("");
  };

  // Функция фильтрации и сортировки
  const getFilteredAndSortedElements = () => {
    if (!elements) return [];

    let filtered = elements.filter(element => {
      // Поиск по тексту
      const searchMatch = !searchTerm || 
        element.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        element.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        element.mechanism?.toLowerCase().includes(searchTerm.toLowerCase());

      // Фильтр по тегам
      const tagsMatch = selectedTags.length === 0 || 
        selectedTags.some(tag => element.tags.includes(tag));

      // Фильтр по сложности
      const difficultyMatch = difficultyFilter === "all" || 
        element.difficulty === difficultyFilter;

      // Фильтр по научной базе
      const scienceMatch = scienceFilter === "all" || 
        (scienceFilter === "high" && element.science_rating >= 4) ||
        (scienceFilter === "medium" && element.science_rating >= 3 && element.science_rating < 4) ||
        (scienceFilter === "low" && element.science_rating < 3);

      // Фильтр по времени
      const timeMatch = timeFilter === "all" || 
        (timeFilter === "quick" && element.time && (element.time.includes("мин") && parseInt(element.time) <= 10)) ||
        (timeFilter === "medium" && element.time && (element.time.includes("мин") && parseInt(element.time) > 10 && parseInt(element.time) <= 30)) ||
        (timeFilter === "long" && element.time && (element.time.includes("час") || (element.time.includes("мин") && parseInt(element.time) > 30)));

      // Фильтр по целям
      const goalMatch = goalFilter === "all" || 
        element.goals.some(goal => goal.toLowerCase().includes(goalFilter.toLowerCase()));

      return searchMatch && tagsMatch && difficultyMatch && scienceMatch && timeMatch && goalMatch;
    });

    // Сортировка
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "popularity":
          return b.popularity - a.popularity;
        case "science":
          return b.science_rating - a.science_rating;
        case "difficulty":
          const difficultyOrder = { "Легкая": 1, "Средняя": 2, "Сложная": 3 };
          return difficultyOrder[a.difficulty as keyof typeof difficultyOrder] - 
                 difficultyOrder[b.difficulty as keyof typeof difficultyOrder];
        case "time":
          return a.time.localeCompare(b.time);
        case "name":
        default:
          return a.title.localeCompare(b.title);
      }
    });

    return filtered;
  };

  const filteredElements = getFilteredAndSortedElements();

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Alert>
            <AlertDescription>
              Ошибка загрузки элементов: {error.message}
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">База элементов</h1>
          <p className="text-xl text-muted-foreground">
            Изучайте и выбирайте элементы для своих протоколов
          </p>
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
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-48 w-full" />
            ))}
          </div>
        ) : (
          <div className="mb-4">
            <p className="text-sm text-muted-foreground mb-6">
              Найдено элементов: {filteredElements.length} из {elements?.length || 0}
            </p>

            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredElements.map((element) => (
                  <ElementCard
                    key={element.id}
                    id={parseInt(element.id)}
                    title={element.title}
                    description={element.description}
                    category={element.category}
                    popularity={element.popularity}
                    difficulty={element.difficulty}
                    scienceRating={element.science_rating}
                    time={element.time}
                    frequency={element.frequency}
                    tags={element.tags}
                  />
                ))}
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Элемент</TableHead>
                    <TableHead>Категория</TableHead>
                    <TableHead>Популярность</TableHead>
                    <TableHead>Научность</TableHead>
                    <TableHead>Сложность</TableHead>
                    <TableHead>Время</TableHead>
                    <TableHead>Частота</TableHead>
                    <TableHead>Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredElements.map((element) => (
                    <ElementListItem
                      key={element.id}
                      id={parseInt(element.id)}
                      title={element.title}
                      description={element.description}
                      category={element.category}
                      popularity={element.popularity}
                      difficulty={element.difficulty}
                      scienceRating={element.science_rating}
                      time={element.time}
                      frequency={element.frequency}
                      tags={element.tags}
                    />
                  ))}
                </TableBody>
              </Table>
            )}

            {filteredElements.length === 0 && !isLoading && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Элементы не найдены. Попробуйте изменить фильтры поиска.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Elements;
