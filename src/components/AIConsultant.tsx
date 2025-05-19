
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, Send } from "lucide-react";

const AIConsultant = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the message to an AI service
    console.log("Sending message:", message);
    setMessage("");
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-12 mb-8 md:mb-0">
            <h2 className="section-title">
              ИИ-консультанты <span className="gradient-text">BioCodec</span>
            </h2>
            <p className="section-subtitle">
              Получите персонализированные рекомендации от ИИ-консультантов, специализирующихся на различных аспектах биохакинга
            </p>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-start">
                <div className="bg-primary/10 p-2 rounded-full mr-3">
                  <Bot className="h-5 w-5 text-primary" />
                </div>
                <div className="bg-muted rounded-lg p-4 rounded-tl-none">
                  <p className="text-sm">
                    Привет! Я ИИ-консультант BioCodec. Я могу помочь вам с анализом ваших протоколов биохакинга, 
                    дать рекомендации по оптимизации и ответить на вопросы по различным темам здоровья и самооптимизации.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 p-2 rounded-full mr-3">
                  <Bot className="h-5 w-5 text-primary" />
                </div>
                <div className="bg-muted rounded-lg p-4 rounded-tl-none">
                  <p className="text-sm">
                    Расскажите, какие цели биохакинга вас интересуют, и я помогу подобрать оптимальные протоколы и элементы.
                  </p>
                </div>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="flex">
              <Input
                type="text"
                placeholder="Спросите ИИ-консультанта..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="rounded-r-none"
              />
              <Button type="submit" className="rounded-l-none">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
          
          <div className="md:w-1/2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-card rounded-lg p-4 border border-border shadow-sm card-hover">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center mr-3">
                    <Bot className="h-5 w-5 text-secondary" />
                  </div>
                  <h3 className="font-semibold">NutriBot</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Специализируется на вопросах питания, микронутриентах и пищевых протоколах
                </p>
              </div>
              
              <div className="bg-card rounded-lg p-4 border border-border shadow-sm card-hover">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center mr-3">
                    <Bot className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="font-semibold">SleepBot</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Эксперт по оптимизации сна, циркадным ритмам и восстановлению
                </p>
              </div>
              
              <div className="bg-card rounded-lg p-4 border border-border shadow-sm card-hover">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                    <Bot className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold">FitBot</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Фокусируется на физической активности, тренировках и восстановлении
                </p>
              </div>
              
              <div className="bg-card rounded-lg p-4 border border-border shadow-sm card-hover">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center mr-3">
                    <Bot className="h-5 w-5 text-destructive" />
                  </div>
                  <h3 className="font-semibold">StressBot</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Помогает с управлением стрессом, ментальными практиками и когнитивной оптимизацией
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIConsultant;
