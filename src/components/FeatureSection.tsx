
import { BookOpen, FileText, Star, GitBranch, List, MessageSquare } from "lucide-react";

interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureItem = ({ icon, title, description }: FeatureItemProps) => {
  return (
    <div className="bg-card rounded-lg p-6 border border-border shadow-sm card-hover">
      <div className="feature-icon">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

const FeatureSection = () => {
  const features = [
    {
      icon: <FileText className="feature-icon" />,
      title: "Мои протоколы",
      description:
        "Создавайте, редактируйте и храните персональные протоколы биохакинга. Отслеживайте прогресс и делитесь результатами.",
    },
    {
      icon: <BookOpen className="feature-icon" />,
      title: "Библиотека",
      description:
        "Обширная библиотека знаний по темам биохакинга, здоровья, питания и оптимизации образа жизни.",
    },
    {
      icon: <List className="feature-icon" />,
      title: "Элементы протокола",
      description:
        "Каталог готовых элементов с описаниями и научным обоснованием для быстрого создания эффективных протоколов.",
    },
    {
      icon: <Star className="feature-icon" />,
      title: "Рейтинг",
      description:
        "Рейтинг самых популярных и эффективных протоколов по оценкам сообщества биохакеров.",
    },
    {
      icon: <GitBranch className="feature-icon" />,
      title: "Форки и версии",
      description:
        "Создавайте форки чужих протоколов, улучшайте их и публикуйте новые версии с полной историей изменений.",
    },
    {
      icon: <MessageSquare className="feature-icon" />,
      title: "ИИ-консультанты",
      description:
        "Получайте рекомендации от ИИ по улучшению ваших протоколов и персонализированные советы по биохакингу.",
    },
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title">Основные возможности</h2>
          <p className="section-subtitle">
            ProtoLab PORTAL — это полноценная экосистема для работы с протоколами биохакинга
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureItem
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
