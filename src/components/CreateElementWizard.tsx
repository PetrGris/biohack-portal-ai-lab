
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface CreateElementWizardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onElementCreated: () => void;
}

interface FormData {
  name: string;
  title: string;
  type: string;
  description: string;
  mechanism: string;
  category: string;
}

const CreateElementWizard = ({ open, onOpenChange, onElementCreated }: CreateElementWizardProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    title: "",
    type: "",
    description: "",
    mechanism: "",
    category: ""
  });

  const steps = [
    { number: 1, title: "Основная информация", description: "Название, тип и описание" },
    { number: 2, title: "Детали", description: "Механизм и категория" },
    { number: 3, title: "Подтверждение", description: "Проверка и создание" }
  ];

  const typeOptions = [
    { value: "pharma", label: "Фармацевтика" },
    { value: "nutraceutical", label: "Нутрицевтик" },
    { value: "physical", label: "Физическая практика" },
    { value: "cognitive", label: "Когнитивная тренировка" },
    { value: "environmental", label: "Факторы среды" },
    { value: "tech", label: "Технологии" },
    { value: "behavioral", label: "Поведенческий паттерн" },
    { value: "recovery", label: "Восстановление" }
  ];

  const categoryOptions = [
    { value: "pharma", label: "Лекарственные препараты" },
    { value: "nutraceutical", label: "БАДы/нутрицевтики" },
    { value: "physical", label: "Физические практики" },
    { value: "cognitive", label: "Когнитивные тренировки" },
    { value: "environmental", label: "Факторы среды" },
    { value: "tech", label: "Устройства" },
    { value: "behavioral", label: "Поведенческие паттерны" },
    { value: "recovery", label: "Регенеративные методики" }
  ];

  const handleNext = () => {
    if (currentStep === 1) {
      if (!formData.name || !formData.type || !formData.description) {
        toast({
          title: "Заполните обязательные поля",
          description: "Название, тип и описание обязательны для заполнения",
          variant: "destructive"
        });
        return;
      }
    }
    
    if (currentStep === 2) {
      if (!formData.category) {
        toast({
          title: "Заполните категорию",
          description: "Категория обязательна для заполнения",
          variant: "destructive"
        });
        return;
      }
    }
    
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Создаем элемент со статусом "candidate"
      const { data: newElement, error: createError } = await supabase
        .from('elements')
        .insert({
          name: formData.name,
          title: formData.title || formData.name,
          type: formData.type,
          description: formData.description,
          mechanism: formData.mechanism,
          category: formData.category,
          status: 'candidate',
          difficulty: 'Средняя',
          complexity: 'medium'
        })
        .select()
        .single();

      if (createError) throw createError;

      toast({
        title: "Элемент создан",
        description: `Элемент "${formData.name}" создан и отправлен на ИИ анализ`,
      });

      // Запускаем ИИ анализ
      setIsAnalyzing(true);
      
      // Обновляем статус на "ai_review"
      await supabase
        .from('elements')
        .update({ status: 'ai_review' })
        .eq('id', newElement.id);

      try {
        const response = await fetch('/api/v1/analyze-element', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ elementId: newElement.id }),
        });

        if (!response.ok) {
          throw new Error('Ошибка ИИ анализа');
        }

        toast({
          title: "ИИ анализ завершен",
          description: "Элемент дополнен и готов к использованию",
        });
      } catch (aiError) {
        console.error('AI analysis error:', aiError);
        toast({
          title: "Ошибка ИИ анализа",
          description: "Элемент создан, но анализ не выполнен",
          variant: "destructive"
        });
      }

      onElementCreated();
      handleReset();
      
    } catch (error) {
      console.error('Error creating element:', error);
      toast({
        title: "Ошибка создания",
        description: "Не удалось создать элемент",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setCurrentStep(1);
    setFormData({
      name: "",
      title: "",
      type: "",
      description: "",
      mechanism: "",
      category: ""
    });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Название элемента *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Например: Магний глицинат"
              />
            </div>
            
            <div>
              <Label htmlFor="type">Тип элемента *</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите тип" />
                </SelectTrigger>
                <SelectContent>
                  {typeOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="description">Краткое описание *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Опишите основной эффект элемента"
                rows={3}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="category">Категория *</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите категорию" />
                </SelectTrigger>
                <SelectContent>
                  {categoryOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="mechanism">Механизм действия (опционально)</Label>
              <Textarea
                id="mechanism"
                value={formData.mechanism}
                onChange={(e) => setFormData(prev => ({ ...prev, mechanism: e.target.value }))}
                placeholder="Укажите известный механизм действия (будет дополнен ИИ)"
                rows={3}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="p-4 border rounded-lg bg-muted/30">
              <h4 className="font-semibold mb-2">Проверьте данные перед созданием:</h4>
              <div className="space-y-2 text-sm">
                <div><strong>Название:</strong> {formData.name}</div>
                <div><strong>Тип:</strong> {typeOptions.find(opt => opt.value === formData.type)?.label}</div>
                <div><strong>Категория:</strong> {categoryOptions.find(opt => opt.value === formData.category)?.label}</div>
                <div><strong>Описание:</strong> {formData.description}</div>
                {formData.mechanism && <div><strong>Механизм:</strong> {formData.mechanism}</div>}
              </div>
            </div>
            
            <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-950">
              <h4 className="font-semibold mb-2">Что произойдет дальше:</h4>
              <ol className="text-sm space-y-1">
                <li>1. Элемент будет создан со статусом "Кандидат"</li>
                <li>2. Запустится ИИ анализ для дополнения информации</li>
                <li>3. После анализа элемент перейдет в статус "К использованию"</li>
              </ol>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Создание нового элемента</DialogTitle>
          
          <div className="flex items-center justify-between mt-4">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= step.number 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {currentStep > step.number ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    step.number
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-2 ${
                    currentStep > step.number ? 'bg-primary' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
          
          <div className="text-center mt-2">
            <h3 className="font-medium">{steps[currentStep - 1]?.title}</h3>
            <p className="text-sm text-muted-foreground">{steps[currentStep - 1]?.description}</p>
          </div>
        </DialogHeader>

        <div className="mt-6">
          {renderStep()}
        </div>

        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Назад
          </Button>
          
          {currentStep < steps.length ? (
            <Button onClick={handleNext}>
              Далее
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit} 
              disabled={isSubmitting || isAnalyzing}
            >
              {isSubmitting || isAnalyzing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {isAnalyzing ? 'ИИ анализ...' : 'Создание...'}
                </>
              ) : (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Создать элемент
                </>
              )}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateElementWizard;
