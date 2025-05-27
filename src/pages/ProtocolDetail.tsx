
import { useParams } from "react-router-dom";
import { useProtocol } from "@/hooks/useProtocols";
import Navbar from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Star, GitFork, Calendar, Clock, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";

const ProtocolDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: protocol, isLoading, error } = useProtocol(id || "");

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Alert>
            <AlertDescription>
              Ошибка загрузки протокола: {error.message}
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-8 w-32 mb-6" />
          <Skeleton className="h-12 w-96 mb-4" />
          <Skeleton className="h-6 w-full mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="h-64 w-full" />
            </div>
            <div className="space-y-6">
              <Skeleton className="h-32 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!protocol) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Alert>
            <AlertDescription>
              Протокол не найден
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Легкая":
        return "bg-green-100 text-green-800";
      case "Средняя":
        return "bg-yellow-100 text-yellow-800";
      case "Сложная":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Активен":
        return "bg-green-100 text-green-800";
      case "В процессе":
        return "bg-blue-100 text-blue-800";
      case "Завершен":
        return "bg-gray-100 text-gray-800";
      case "Черновик":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/my-protocols">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Назад к протоколам
            </Button>
          </Link>

          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-4">{protocol.title}</h1>
              <p className="text-xl text-muted-foreground mb-4">{protocol.description}</p>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                <span>Автор: {protocol.author}</span>
                <span>•</span>
                <span>Категория: {protocol.category}</span>
                {protocol.last_updated && (
                  <>
                    <span>•</span>
                    <span>Обновлен: {protocol.last_updated}</span>
                  </>
                )}
              </div>

              <div className="flex items-center gap-3 mb-6">
                <Badge className={getDifficultyColor(protocol.difficulty)}>
                  {protocol.difficulty}
                </Badge>
                <Badge className={getStatusColor(protocol.status)}>
                  {protocol.status}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Элементы протокола</CardTitle>
                <CardDescription>
                  Список всех элементов, входящих в данный протокол
                </CardDescription>
              </CardHeader>
              <CardContent>
                {protocol.protocol_elements && protocol.protocol_elements.length > 0 ? (
                  <div className="space-y-4">
                    {protocol.protocol_elements
                      .sort((a, b) => a.order_position - b.order_position)
                      .map((protocolElement) => (
                        <div key={protocolElement.id} className="p-4 border rounded-lg">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-semibold">{protocolElement.elements.title}</h4>
                            <Badge variant="outline">{protocolElement.elements.category}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            {protocolElement.elements.description}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {protocolElement.elements.time}
                            </div>
                            <div className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {protocolElement.elements.frequency}
                            </div>
                          </div>
                          {protocolElement.custom_dosage && (
                            <div className="mt-2 p-2 bg-muted rounded text-sm">
                              <strong>Кастомная дозировка:</strong> {protocolElement.custom_dosage}
                            </div>
                          )}
                          {protocolElement.notes && (
                            <div className="mt-2 p-2 bg-muted rounded text-sm">
                              <strong>Заметки:</strong> {protocolElement.notes}
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">В протоколе пока нет элементов</p>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Статистика</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-2" />
                    <span className="text-sm">Рейтинг</span>
                  </div>
                  <span className="font-semibold">{protocol.rating}/5</span>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <GitFork className="h-4 w-4 text-blue-500 mr-2" />
                    <span className="text-sm">Форки</span>
                  </div>
                  <span className="font-semibold">{protocol.forks}</span>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">Длительность</span>
                  </div>
                  <span className="font-semibold">{protocol.days} дней</span>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <BarChart3 className="h-4 w-4 text-purple-500 mr-2" />
                    <span className="text-sm">Элементов</span>
                  </div>
                  <span className="font-semibold">
                    {protocol.protocol_elements?.length || 0}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Действия</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full">
                  Начать протокол
                </Button>
                <Button variant="outline" className="w-full">
                  Сделать форк
                </Button>
                <Button variant="outline" className="w-full">
                  Экспорт в PDF
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProtocolDetail;
