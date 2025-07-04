
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
import { Menu, User, Store, Truck } from 'lucide-react';
import { AuthButton } from './AuthButton';

export const Navigation = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav id="main-navigation" className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Truck className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl">WashEasy</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link 
                    to="/"
                    className={`px-3 py-2 text-sm font-medium transition-colors hover:text-blue-600 ${
                      isActive('/') ? 'text-blue-600' : 'text-gray-700'
                    }`}
                  >
                    Home
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium">
                    Services
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <div className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                            href="/"
                          >
                            <div className="mb-2 mt-4 text-lg font-medium">
                              WashEasy Services
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              Professional laundry and dry cleaning services for homes and businesses.
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </div>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/residential"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Residential</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Home laundry services including wash & fold, dry cleaning, and express service.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/commercial"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Commercial</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Business laundry solutions for hotels, restaurants, and offices.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link 
                    to="/shop"
                    className={`px-3 py-2 text-sm font-medium transition-colors hover:text-blue-600 ${
                      isActive('/shop') ? 'text-blue-600' : 'text-gray-700'
                    }`}
                  >
                    Shop
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link 
                    to="/merchant-register"
                    className={`px-3 py-2 text-sm font-medium transition-colors hover:text-blue-600 ${
                      isActive('/merchant-register') ? 'text-blue-600' : 'text-gray-700'
                    }`}
                  >
                    Become a Partner
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link 
                    to="/contact"
                    className={`px-3 py-2 text-sm font-medium transition-colors hover:text-blue-600 ${
                      isActive('/contact') ? 'text-blue-600' : 'text-gray-700'
                    }`}
                  >
                    Contact
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <div className="flex items-center space-x-4">
              {/* Auth Button - Primary */}
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
              ) : (
                <Button size="sm" asChild className="bg-blue-600 hover:bg-blue-700">
                  <Link to="/auth">Login / Sign Up</Link>
                </Button>
              )}
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile Auth Button */}
            {!user && (
              <Button size="sm" asChild className="bg-blue-600 hover:bg-blue-700 text-xs px-3">
                <Link to="/auth">Login</Link>
              </Button>
            )}
            
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="h-10 w-10 p-0">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] flex flex-col">
                <div className="flex-1 overflow-y-auto">
                  <div className="flex flex-col space-y-6 mt-8 pb-8">
                    <Link
                      to="/"
                      onClick={() => setIsOpen(false)}
                      className={`px-4 py-3 text-lg font-medium transition-colors hover:text-blue-600 ${
                        isActive('/') ? 'text-blue-600 bg-blue-50 rounded-md' : 'text-gray-700'
                      }`}
                    >
                      Home
                    </Link>
                    
                    <div className="space-y-2">
                      <div className="px-4 py-2 text-lg font-semibold text-gray-900">Services</div>
                      <Link
                        to="/residential"
                        onClick={() => setIsOpen(false)}
                        className={`px-6 py-2 text-base font-medium transition-colors hover:text-blue-600 block ${
                          isActive('/residential') ? 'text-blue-600 bg-blue-50 rounded-md' : 'text-gray-600'
                        }`}
                      >
                        Residential
                      </Link>
                      <Link
                        to="/commercial"
                        onClick={() => setIsOpen(false)}
                        className={`px-6 py-2 text-base font-medium transition-colors hover:text-blue-600 block ${
                          isActive('/commercial') ? 'text-blue-600 bg-blue-50 rounded-md' : 'text-gray-600'
                        }`}
                      >
                        Commercial
                      </Link>
                    </div>
                    
                    <Link
                      to="/shop"
                      onClick={() => setIsOpen(false)}
                      className={`px-4 py-3 text-lg font-medium transition-colors hover:text-blue-600 ${
                        isActive('/shop') ? 'text-blue-600 bg-blue-50 rounded-md' : 'text-gray-700'
                      }`}
                    >
                      Shop
                    </Link>
                    
                    <Link
                      to="/merchant-register"
                      onClick={() => setIsOpen(false)}
                      className={`px-4 py-3 text-lg font-medium transition-colors hover:text-blue-600 ${
                        isActive('/merchant-register') ? 'text-blue-600 bg-blue-50 rounded-md' : 'text-gray-700'
                      }`}
                    >
                      Become a Partner
                    </Link>
                    
                    <Link
                      to="/contact"
                      onClick={() => setIsOpen(false)}
                      className={`px-4 py-3 text-lg font-medium transition-colors hover:text-blue-600 ${
                        isActive('/contact') ? 'text-blue-600 bg-blue-50 rounded-md' : 'text-gray-700'
                      }`}
                    >
                      Contact
                    </Link>
                    
                    {user && (
                      <>
                        <div className="border-t pt-4 space-y-2">
                          <Link
                            to="/dashboard"
                            onClick={() => setIsOpen(false)}
                            className="px-4 py-3 text-lg font-medium transition-colors hover:text-blue-600 flex items-center space-x-2 text-gray-700"
                          >
                            <User className="w-5 h-5" />
                            <span>Dashboard</span>
                          </Link>
                          <Link
                            to="/merchant-dashboard"
                            onClick={() => setIsOpen(false)}
                            className="px-4 py-3 text-lg font-medium transition-colors hover:text-blue-600 flex items-center space-x-2 text-gray-700"
                          >
                            <Store className="w-5 h-5" />
                            <span>Merchant Panel</span>
                          </Link>
                        </div>
                      </>
                    )}
                    
                    {user && (
                      <div className="px-4 pt-4 border-t">
                        <AuthButton />
                      </div>
                    )}
                    
                    {!user && (
                      <div className="px-4 pt-4 border-t">
                        <Button size="lg" asChild className="w-full bg-blue-600 hover:bg-blue-700">
                          <Link to="/auth" onClick={() => setIsOpen(false)}>Login / Sign Up</Link>
                        </Button>
                      </div>
                    )}
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
