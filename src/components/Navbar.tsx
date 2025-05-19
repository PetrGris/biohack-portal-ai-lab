
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  Search,
  Bell,
  Settings,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-background border-b border-border py-4 sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <div className="h-8 w-8 rounded-md bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold mr-2">
                P
              </div>
              <span className="text-xl font-bold">ProtoLab</span>
            </a>
            <div className="hidden md:flex ml-10 space-x-1">
              <a href="#" className="nav-link">Новости</a>
              <a href="#" className="nav-link">Мои протоколы</a>
              <a href="#" className="nav-link">Библиотека</a>
              <a href="#" className="nav-link">Элементы</a>
              <a href="#" className="nav-link">Рейтинг</a>
              <a href="#" className="nav-link nav-link-active">
                ИИ-консультанты
              </a>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-500 hover:text-gray-700">
              <Search size={20} />
            </button>
            <button className="text-gray-500 hover:text-gray-700 relative">
              <Bell size={20} />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="text-gray-500 hover:text-gray-700">
              <Settings size={20} />
            </button>
            <Button size="sm" variant="default">
              Войти
            </Button>
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={cn(
            "md:hidden",
            isOpen ? "block" : "hidden"
          )}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="#"
              className="nav-link block"
            >
              Новости
            </a>
            <a
              href="#"
              className="nav-link block"
            >
              Мои протоколы
            </a>
            <a
              href="#"
              className="nav-link block"
            >
              Библиотека
            </a>
            <a
              href="#"
              className="nav-link block"
            >
              Элементы
            </a>
            <a
              href="#"
              className="nav-link block"
            >
              Рейтинг
            </a>
            <a
              href="#"
              className="nav-link nav-link-active block"
            >
              ИИ-консультанты
            </a>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <User size={24} className="text-gray-500" />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">
                  Гость
                </div>
                <Button size="sm" variant="default" className="mt-2">
                  Войти
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
