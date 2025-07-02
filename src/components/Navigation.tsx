
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, X, ShoppingBag, Truck, LayoutDashboard, Building2, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthButton } from "@/components/AuthButton";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Truck className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">WashEasy</span>
            <Badge variant="secondary" className="text-xs">BETA</Badge>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-gray-700 hover:text-blue-600 transition-colors flex items-center space-x-1">
                  <span>Services</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="bg-white border border-gray-200 shadow-lg">
                <DropdownMenuItem onClick={() => navigate('/#services')}>
                  Residential Services
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/commercial-services')}>
                  <Building2 className="w-4 h-4 mr-2" />
                  Commercial Services
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 transition-colors">How it Works</a>
            <button 
              onClick={() => navigate('/shop')}
              className="text-gray-700 hover:text-blue-600 transition-colors flex items-center space-x-1"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Shop</span>
            </button>
            {user && (
              <button 
                onClick={() => navigate('/customer-dashboard')}
                className="text-gray-700 hover:text-blue-600 transition-colors flex items-center space-x-1"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </button>
            )}
            <button 
              onClick={() => navigate('/contact')}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Contact
            </button>
          </div>

          {/* Auth Button */}
          <div className="hidden md:flex items-center">
            <AuthButton />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-blue-100">
            <a 
              href="#services" 
              className="block text-gray-700 hover:text-blue-600 transition-colors py-2"
              onClick={closeMenu}
            >
              Residential Services
            </a>
            <button 
              onClick={() => {
                navigate('/commercial-services');
                closeMenu();
              }}
              className="block text-gray-700 hover:text-blue-600 transition-colors py-2 w-full text-left"
            >
              Commercial Services
            </button>
            <a 
              href="#how-it-works" 
              className="block text-gray-700 hover:text-blue-600 transition-colors py-2"
              onClick={closeMenu}
            >
              How it Works
            </a>
            <button 
              onClick={() => {
                navigate('/shop');
                closeMenu();
              }}
              className="block text-gray-700 hover:text-blue-600 transition-colors py-2 w-full text-left"
            >
              Shop
            </button>
            {user && (
              <button 
                onClick={() => {
                  navigate('/customer-dashboard');
                  closeMenu();
                }}
                className="block text-gray-700 hover:text-blue-600 transition-colors py-2 w-full text-left"
              >
                Dashboard
              </button>
            )}
            <button 
              onClick={() => {
                navigate('/contact');
                closeMenu();
              }}
              className="block text-gray-700 hover:text-blue-600 transition-colors py-2 w-full text-left"
            >
              Contact
            </button>
            <div className="pt-4 border-t border-blue-100">
              <AuthButton />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
