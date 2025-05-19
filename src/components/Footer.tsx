
import { Github, Twitter, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="h-8 w-8 rounded-md bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold mr-2">
                P
              </div>
              <span className="text-xl font-bold">ProtoLab</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Современный портал для работы с протоколами биохакинга, экспериментальный проект, созданный при помощи ИИ.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Сервисы</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-foreground">Новости</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground">Мои протоколы</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground">Библиотека</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground">Элементы</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground">Рейтинг</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground">ИИ-консультанты</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Компания</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-foreground">О нас</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground">Команда</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground">Карьера</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground">Блог</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground">Партнеры</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Поддержка</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-foreground">Документация</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground">Часто задаваемые вопросы</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground">Форум сообщества</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground">Техническая поддержка</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground">Правила использования</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground">Политика конфиденциальности</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-muted-foreground mb-4 md:mb-0">
            © 2025 ProtoLab PORTAL. Все права защищены.
          </div>
          
          <div className="flex space-x-4">
            <a href="#" className="text-muted-foreground hover:text-foreground">
              <Github size={20} />
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              <Linkedin size={20} />
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              <Instagram size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
