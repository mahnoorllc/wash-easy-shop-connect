import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  NavigationMenu, 
  NavigationMenuContent, 
  NavigationMenuItem, 
  NavigationMenuLink, 
  NavigationMenuList, 
  NavigationMenuTrigger 
} from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, ShoppingCart, User, Store } from 'lucide-react';
import { AuthButton } from './AuthButton';

export const Navigation = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navigationLinks = [
    { href: '/', label: 'Home' },
    { href: '/shop', label: 'Shop' },
    { href: '/commercial', label: 'Commercial' },
    { href: '/contact', label: 'Contact' }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">L</span>
            </div>
            <span className="font-bold text-xl">LaundryApp</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavigationMenu>
              <NavigationMenuList>
                {navigationLinks.map((link) => (
                  <NavigationMenuItem key={link.href}>
                    <NavigationMenuLink asChild>
                      <Link 
                        to={link.href}
                        className={`px-3 py-2 text-sm font-medium transition-colors hover:text-blue-600 ${
                          isActive(link.href) ? 'text-blue-600' : 'text-gray-700'
                        }`}
                      >
                        {link.label}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate('/dashboard')}
                    className="flex items-center space-x-1"
                  >
                    <User className="w-4 h-4" />
                    <span>Dashboard</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate('/merchant-dashboard')}
                    className="flex items-center space-x-1"
                  >
                    <Store className="w-4 h-4" />
                    <span>Merchant</span>
                  </Button>
                </div>
              ) : null}
              <AuthButton />
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col space-y-4 mt-8">
                  {navigationLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`px-4 py-2 text-sm font-medium transition-colors hover:text-blue-600 ${
                        isActive(link.href) ? 'text-blue-600' : 'text-gray-700'
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                  {user && (
                    <>
                      <Link
                        to="/dashboard"
                        onClick={() => setIsOpen(false)}
                        className="px-4 py-2 text-sm font-medium transition-colors hover:text-blue-600 flex items-center space-x-2"
                      >
                        <User className="w-4 h-4" />
                        <span>Dashboard</span>
                      </Link>
                      <Link
                        to="/merchant-dashboard"
                        onClick={() => setIsOpen(false)}
                        className="px-4 py-2 text-sm font-medium transition-colors hover:text-blue-600 flex items-center space-x-2"
                      >
                        <Store className="w-4 h-4" />
                        <span>Merchant</span>
                      </Link>
                    </>
                  )}
                  <div className="px-4">
                    <AuthButton />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};
