
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-b from-background to-muted py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              ProtoLab <span className="gradient-text">PORTAL</span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              Современный портал для работы с протоколами биохакинга
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Создавайте, публикуйте и улучшайте протоколы биохакинга в едином пространстве. 
              Используйте ИИ для анализа и улучшения ваших протоколов. 
              Делитесь опытом и учитесь у сообщества.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="rounded-full">
                Начать бесплатно
              </Button>
              <Button size="lg" variant="outline" className="rounded-full">
                Узнать больше
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 mt-10 md:mt-0">
            <div className="rounded-lg bg-card border border-border shadow-xl overflow-hidden">
              <div className="bg-primary/10 p-3 border-b border-border flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <div className="ml-4 text-sm text-muted-foreground font-mono">protocol-sleep-recovery.bio</div>
              </div>
              <div className="p-6 bg-white">
                <div className="mb-4">
                  <h3 className="font-bold text-xl">Протокол восстановления сна</h3>
                  <div className="flex items-center mt-2 text-sm text-muted-foreground">
                    <span className="font-mono">v3.2.1</span>
                    <span className="mx-2">•</span>
                    <span>Обновлено 3 дня назад</span>
                    <span className="mx-2">•</span>
                    <span>128 форков</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-3 border border-border rounded bg-muted/30">
                    <div className="font-medium">1. Синхронизация циркадных ритмов</div>
                    <div className="text-sm text-muted-foreground mt-1">Воздействие на солнечный свет утром и вечером</div>
                  </div>
                  
                  <div className="p-3 border border-border rounded bg-muted/30">
                    <div className="font-medium">2. Вечерний протокол</div>
                    <div className="text-sm text-muted-foreground mt-1">Блокировка синего света + снижение температуры</div>
                  </div>
                  
                  <div className="p-3 border border-border rounded bg-muted/30">
                    <div className="font-medium">3. Добавки</div>
                    <div className="text-sm text-muted-foreground mt-1">Магний + Glycine + Theanine вечером</div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-dashed border-border">
                  <div className="flex items-center justify-between text-sm">
                    <div className="text-muted-foreground">Эффективность: <span className="text-green-500 font-semibold">92%</span></div>
                    <div className="text-muted-foreground">Сложность: <span className="text-yellow-500 font-semibold">Средняя</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
    </div>
  );
};

export default Hero;
