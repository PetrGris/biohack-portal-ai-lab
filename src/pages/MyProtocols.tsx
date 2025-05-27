
import { useProtocols } from "@/hooks/useProtocols";
import Navbar from "@/components/Navbar";
import ProtocolCard from "@/components/ProtocolCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";

const MyProtocols = () => {
  const { data: protocols, isLoading, error } = useProtocols();

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Alert>
            <AlertDescription>
              Ошибка загрузки протоколов: {error.message}
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
          <h1 className="text-4xl font-bold mb-4">Мои протоколы</h1>
          <p className="text-xl text-muted-foreground">
            Управляйте своими персональными протоколами оптимизации
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-64 w-full" />
            ))}
          </div>
        ) : (
          <>
            {protocols && protocols.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {protocols.map((protocol) => (
                  <ProtocolCard
                    key={protocol.id}
                    id={protocol.slug}
                    title={protocol.title}
                    description={protocol.description}
                    author={protocol.author}
                    category={protocol.category}
                    rating={protocol.rating}
                    forks={protocol.forks}
                    days={protocol.days}
                    difficulty={protocol.difficulty}
                    status={protocol.status}
                    lastUpdated={protocol.last_updated}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  У вас пока нет протоколов. Создайте свой первый протокол!
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MyProtocols;
