
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  Search,
  Bell,
  Settings,
  User,
  Newspaper,
  FileText,
  BookOpen,
  List,
  Star,
  MessageSquare
} from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { path: "/news", label: "Новости", icon: <Newspaper className="h-4 w-4 mr-2" /> },
    { path: "/my-protocols", label: "Мои протоколы", icon: <FileText className="h-4 w-4 mr-2" /> },
    { path: "/library", label: "Библиотека", icon: <BookOpen className="h-4 w-4 mr-2" /> },
    { path: "/elements", label: "Элементы", icon: <List className="h-4 w-4 mr-2" /> },
    { path: "/rating", label: "Рейтинг", icon: <Star className="h-4 w-4 mr-2" /> },
    { path: "/ai-consultants", label: "ИИ-консультанты", icon: <MessageSquare className="h-4 w-4 mr-2" /> }
  ];

  return (
    <nav className="bg-background border-b border-border py-4 sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="h-8 w-8 rounded-md bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold mr-2">
                P
              </div>
              <span className="text-xl font-bold">ProtoLab</span>
            </Link>
            <div className="hidden md:flex ml-10 space-x-1">
              {navItems.map((item) => (
                <Link 
                  key={item.path} 
                  to={item.path}
                  className={cn(
                    "nav-link flex items-center",
                    location.pathname === item.path && "nav-link-active"
                  )}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
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
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "nav-link flex items-center block",
                  location.pathname === item.path && "nav-link-active"
                )}
                onClick={() => setIsOpen(false)}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
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
