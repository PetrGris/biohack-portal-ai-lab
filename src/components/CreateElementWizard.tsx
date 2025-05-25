
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { ElementData, allElements } from "@/data/elements";

interface CreateElementWizardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onElementCreated: (element: ElementData) => void;
}

const CreateElementWizard = ({ open, onOpenChange, onElementCreated }: CreateElementWizardProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [similarElements, setSimilarElements] = useState<ElementData[]>([]);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    desc: "",
    goals: [""],
    mechanism: "",
    dose: "",
    method: "",
    freq: "",
    schedule: [""],
    duration: "",
    stop_if: "",
    complexity: "",
    efficacy: 5,
    evidence_level: "",
    studies: [""],
    common_risks: [""],
    critical_risks: [""],
    tags: [""]
  });

  const steps = [
    { number: 1, title: "Основная информация", description: "Название, тип и описание" },
    { number: 2, title: "Проверка дубликатов", description: "Поиск похожих элементов" },
    { number: 3, title: "Детали применения", description: "Протокол и дозировки" },
    { number: 4, title: "Научная база", description: "Доказательства и риски" },
    { number: 5, title: "Финализация", description: "Проверка и сохранение" }
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

  const checkSimilarElements = () => {
    const similar = allElements.filter(element => 
      element.name.toLowerCase().includes(formData.name.toLowerCase()) ||
      element.desc.toLowerCase().includes(formData.name.toLowerCase()) ||
      (formData.desc && element.desc.toLowerCase().includes(formData.desc.toLowerCase()))
    );
    setSimilarElements(similar);
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (!formData.name || !formData.type || !formData.desc) {
        toast({
          title: "Заполните обязательные поля",
          description: "Название, тип и описание обязательны для заполнения",
          variant: "destructive"
        });
        return;
      }
      checkSimilarElements();
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

  const handleFinish = () => {
    const newElement: ElementData = {
      id: Math.max(...allElements.map(e => e.id)) + 1,
      name: formData.name,
      type: formData.type as any,
      desc: formData.desc,
      goals: formData.goals.filter(g => g.trim()),
      mechanism: formData.mechanism,
      usage: {
        dose: formData.dose,
        method: formData.method || undefined,
        freq: formData.freq || undefined,
        schedule: formData.schedule.filter(s => s.trim()) || undefined,
        duration: formData.duration || undefined,
        stop_if: formData.stop_if || undefined
      },
      complexity: formData.complexity as any,
      efficacy: formData.efficacy,
      evidence: {
        level: formData.evidence_level as any,
        studies: formData.studies.filter(s => s.trim())
      },
      risks: {
        common: formData.common_risks.filter(r => r.trim()),
        critical: formData.critical_risks.filter(r => r.trim())
      },
      tags: formData.tags.filter(t => t.trim()),
      // Legacy fields for backward compatibility
      title: formData.name,
      description: formData.desc,
      category: typeOptions.find(opt => opt.value === formData.type)?.label || "Разное",
      popularity: 50,
      difficulty: formData.complexity === "low" ? "Легкая" : formData.complexity === "medium" ? "Средняя" : "Сложная",
      scienceRating: formData.efficacy / 2,
      time: formData.duration || "Не указано",
      frequency: formData.freq || "По необходимости"
    };

    onElementCreated(newElement);
    toast({
      title: "Элемент создан",
      description: `Элемент "${formData.name}" успешно добавлен в базу`
    });
    onOpenChange(false);
    
    // Reset form
    setCurrentStep(1);
    setFormData({
      name: "",
      type: "",
      desc: "",
      goals: [""],
      mechanism: "",
      dose: "",
      method: "",
      freq: "",
      schedule: [""],
      duration: "",
      stop_if: "",
      complexity: "",
      efficacy: 5,
      evidence_level: "",
      studies: [""],
      common_risks: [""],
      critical_risks: [""],
      tags: [""]
    });
  };

  const updateArrayField = (field: string, index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field as keyof typeof prev].map((item: string, i: number) => 
        i === index ? value : item
      )
    }));
  };

  const addArrayField = (field: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field as keyof typeof prev], ""]
    }));
  };

  const removeArrayField = (field: string, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field as keyof typeof prev].filter((_: any, i: number) => i !== index)
    }));
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
                placeholder="Например: Магний глицинат (400 мг)"
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
              <Label htmlFor="desc">Краткое описание (Механизм → Эффект) *</Label>
              <Textarea
                id="desc"
                value={formData.desc}
                onChange={(e) => setFormData(prev => ({ ...prev, desc: e.target.value }))}
                placeholder="Например: Mg2+ → Блокада NMDA-рецепторов → Мышечная релаксация"
                rows={3}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Проверка на дубликаты</h4>
              {similarElements.length > 0 ? (
                <div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Найдены похожие элементы. Убедитесь, что ваш элемент уникален:
                  </p>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {similarElements.map(element => (
                      <div key={element.id} className="p-3 border rounded-lg">
                        <h5 className="font-medium">{element.name}</h5>
                        <p className="text-sm text-muted-foreground">{element.desc}</p>
                        <Badge variant="outline" className="mt-1">{element.type}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-sm text-green-600">
                  ✅ Похожих элементов не найдено. Ваш элемент уникален!
                </p>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="goals">Цели и ожидаемые результаты</Label>
              {formData.goals.map((goal, index) => (
                <div key={index} className="flex items-center space-x-2 mt-2">
                  <Input
                    value={goal}
                    onChange={(e) => updateArrayField('goals', index, e.target.value)}
                    placeholder="Например: Снижение времени засыпания на 35%"
                  />
                  {formData.goals.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeArrayField('goals', index)}
                    >
                      ✕
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addArrayField('goals')}
                className="mt-2"
              >
                + Добавить цель
              </Button>
            </div>

            <div>
              <Label htmlFor="mechanism">Механизм действия</Label>
              <Textarea
                id="mechanism"
                value={formData.mechanism}
                onChange={(e) => setFormData(prev => ({ ...prev, mechanism: e.target.value }))}
                placeholder="Детальный биохимический/физиологический путь"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dose">Дозировка/интенсивность</Label>
                <Input
                  id="dose"
                  value={formData.dose}
                  onChange={(e) => setFormData(prev => ({ ...prev, dose: e.target.value }))}
                  placeholder="Например: 400 мг/сут"
                />
              </div>
              
              <div>
                <Label htmlFor="method">Способ применения</Label>
                <Input
                  id="method"
                  value={formData.method}
                  onChange={(e) => setFormData(prev => ({ ...prev, method: e.target.value }))}
                  placeholder="Например: сублингвально"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="freq">Частота</Label>
                <Input
                  id="freq"
                  value={formData.freq}
                  onChange={(e) => setFormData(prev => ({ ...prev, freq: e.target.value }))}
                  placeholder="Например: 3 раза/день"
                />
              </div>
              
              <div>
                <Label htmlFor="duration">Длительность курса</Label>
                <Input
                  id="duration"
                  value={formData.duration}
                  onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                  placeholder="Например: 8 недель"
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="complexity">Сложность применения</Label>
                <Select value={formData.complexity} onValueChange={(value) => setFormData(prev => ({ ...prev, complexity: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите сложность" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Низкая (самостоятельно)</SelectItem>
                    <SelectItem value="medium">Средняя (самоконтроль)</SelectItem>
                    <SelectItem value="high">Высокая (медицинский надзор)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="evidence_level">Уровень доказательности</Label>
                <Select value={formData.evidence_level} onValueChange={(value) => setFormData(prev => ({ ...prev, evidence_level: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите уровень" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">A - Высокий (≥3 РКИ + мета-анализ)</SelectItem>
                    <SelectItem value="B">B - Средний (1 РКИ + когорты)</SelectItem>
                    <SelectItem value="C">C - Низкий (наблюдательные)</SelectItem>
                    <SelectItem value="D">D - Очень низкий (доклинические)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Ссылки на исследования</Label>
              {formData.studies.map((study, index) => (
                <div key={index} className="flex items-center space-x-2 mt-2">
                  <Input
                    value={study}
                    onChange={(e) => updateArrayField('studies', index, e.target.value)}
                    placeholder="DOI:10.xxxx/xxxx или PMID:xxxxxxxx"
                  />
                  {formData.studies.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeArrayField('studies', index)}
                    >
                      ✕
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addArrayField('studies')}
                className="mt-2"
              >
                + Добавить исследование
              </Button>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <div className="p-4 border rounded-lg bg-muted/30">
              <h4 className="font-semibold mb-2">Проверьте данные перед сохранением:</h4>
              <div className="space-y-2 text-sm">
                <div><strong>Название:</strong> {formData.name}</div>
                <div><strong>Тип:</strong> {typeOptions.find(opt => opt.value === formData.type)?.label}</div>
                <div><strong>Описание:</strong> {formData.desc}</div>
                <div><strong>Дозировка:</strong> {formData.dose}</div>
                <div><strong>Сложность:</strong> {formData.complexity}</div>
                <div><strong>Уровень доказательности:</strong> {formData.evidence_level}</div>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground">
              После создания элемент будет добавлен в общую базу данных и станет доступен для всех пользователей.
            </p>
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
          
          {/* Progress indicator */}
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
            <Button onClick={handleFinish}>
              <Check className="h-4 w-4 mr-2" />
              Создать элемент
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateElementWizard;
