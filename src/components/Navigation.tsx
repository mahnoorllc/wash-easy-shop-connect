
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/useProfile';
import { Button } from '@/components/ui/button';
import { 
  NavigationMenu, 
  NavigationMenuContent, 
  NavigationMenuItem, 
  NavigationMenuLink, 
  NavigationMenuList, 
  NavigationMenuTrigger 
} from '@/components/ui/navigation-menu';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, User, Store, Truck, ChevronDown, Package, MapPin, CreditCard, MessageCircle, Settings, BarChart3, LogOut } from 'lucide-react';

export const Navigation = () => {
  const { user, signOut } = useAuth();
  const { profile, loading: profileLoading } = useProfile();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  // Determine user role and display name
  const userRole = profile?.role || 'guest';
  const isMerchant = userRole === 'merchant';
  const isCustomer = userRole === 'customer';
  const displayName = profile?.full_name || user?.email?.split('@')[0] || 'User';

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
  };

  const CustomerDropdown = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
          <span>{displayName}</span>
          <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem asChild>
          <Link to="/dashboard" className="flex items-center">
            <Package className="w-4 h-4 mr-2" />
            My Orders
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/dashboard" className="flex items-center">
            <MapPin className="w-4 h-4 mr-2" />
            Track Order
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/dashboard" className="flex items-center">
            <User className="w-4 h-4 mr-2" />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} className="text-red-600 focus:text-red-600">
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const MerchantDropdown = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
          <span>{displayName}</span>
          <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem asChild>
          <Link to="/merchant-dashboard" className="flex items-center">
            <Store className="w-4 h-4 mr-2" />
            Store Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/merchant-dashboard" className="flex items-center">
            <BarChart3 className="w-4 h-4 mr-2" />
            Earnings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/merchant-dashboard" className="flex items-center">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} className="text-red-600 focus:text-red-600">
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

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


                {/* Show Contact for all except merchants get different positioning */}
                {!isMerchant && (
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
                )}

                {/* Merchant Panel for merchants only */}
                {isMerchant && (
                  <>
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
                    <NavigationMenuItem>
                      <Link 
                        to="/merchant-dashboard"
                        className={`px-3 py-2 text-sm font-medium transition-colors hover:text-blue-600 ${
                          isActive('/merchant-dashboard') ? 'text-blue-600' : 'text-gray-700'
                        }`}
                      >
                        Merchant Panel
                      </Link>
                    </NavigationMenuItem>
                  </>
                )}
              </NavigationMenuList>
            </NavigationMenu>

            {/* Auth Section */}
            <div className="flex items-center space-x-4">
              {!user ? (
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/auth">Login</Link>
                  </Button>
                  <Button size="sm" asChild className="bg-blue-600 hover:bg-blue-700">
                    <Link to="/auth">Sign Up</Link>
                  </Button>
                </div>
              ) : isCustomer ? (
                <CustomerDropdown />
              ) : isMerchant ? (
                <MerchantDropdown />
              ) : (
                <Button variant="ghost" size="sm" onClick={handleSignOut}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              )}
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile Auth Button for guests */}
            {!user && (
              <div className="flex items-center space-x-1">
                <Button variant="ghost" size="sm" asChild className="text-xs px-2">
                  <Link to="/auth">Login</Link>
                </Button>
                <Button size="sm" asChild className="bg-blue-600 hover:bg-blue-700 text-xs px-3">
                  <Link to="/auth">Sign Up</Link>
                </Button>
              </div>
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
                      to="/contact"
                      onClick={() => setIsOpen(false)}
                      className={`px-4 py-3 text-lg font-medium transition-colors hover:text-blue-600 ${
                        isActive('/contact') ? 'text-blue-600 bg-blue-50 rounded-md' : 'text-gray-700'
                      }`}
                    >
                      Contact
                    </Link>
                    
                    {/* User-specific sections */}
                    {user && (
                      <div className="border-t pt-4 space-y-2">
                        {isCustomer && (
                          <>
                            <div className="px-4 py-2 text-lg font-semibold text-gray-900">My Account</div>
                            <Link
                              to="/dashboard"
                              onClick={() => setIsOpen(false)}
                              className="px-6 py-2 text-base font-medium transition-colors hover:text-blue-600 flex items-center space-x-2 text-gray-700"
                            >
                              <Package className="w-4 h-4" />
                              <span>My Orders</span>
                            </Link>
                            <Link
                              to="/dashboard"
                              onClick={() => setIsOpen(false)}
                              className="px-6 py-2 text-base font-medium transition-colors hover:text-blue-600 flex items-center space-x-2 text-gray-700"
                            >
                              <MapPin className="w-4 h-4" />
                              <span>Track Order</span>
                            </Link>
                            <Link
                              to="/dashboard"
                              onClick={() => setIsOpen(false)}
                              className="px-6 py-2 text-base font-medium transition-colors hover:text-blue-600 flex items-center space-x-2 text-gray-700"
                            >
                              <User className="w-4 h-4" />
                              <span>Profile</span>
                            </Link>
                          </>
                        )}
                        
                        {isMerchant && (
                          <>
                            <div className="px-4 py-2 text-lg font-semibold text-gray-900">Merchant Panel</div>
                            <Link
                              to="/merchant-dashboard"
                              onClick={() => setIsOpen(false)}
                              className="px-6 py-2 text-base font-medium transition-colors hover:text-blue-600 flex items-center space-x-2 text-gray-700"
                            >
                              <Store className="w-4 h-4" />
                              <span>Store Profile</span>
                            </Link>
                            <Link
                              to="/merchant-dashboard"
                              onClick={() => setIsOpen(false)}
                              className="px-6 py-2 text-base font-medium transition-colors hover:text-blue-600 flex items-center space-x-2 text-gray-700"
                            >
                              <BarChart3 className="w-4 h-4" />
                              <span>Earnings</span>
                            </Link>
                            <Link
                              to="/merchant-dashboard"
                              onClick={() => setIsOpen(false)}
                              className="px-6 py-2 text-base font-medium transition-colors hover:text-blue-600 flex items-center space-x-2 text-gray-700"
                            >
                              <Settings className="w-4 h-4" />
                              <span>Settings</span>
                            </Link>
                          </>
                        )}
                      </div>
                    )}
                    
                    {/* Auth section for mobile */}
                    {user ? (
                      <div className="px-4 pt-4 border-t">
                        <Button
                          onClick={handleSignOut}
                          variant="outline"
                          className="w-full flex items-center justify-center space-x-2 text-red-600 border-red-200 hover:bg-red-50"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </Button>
                      </div>
                    ) : (
                      <div className="px-4 pt-4 border-t space-y-2">
                        <Button size="lg" asChild className="w-full bg-blue-600 hover:bg-blue-700">
                          <Link to="/auth" onClick={() => setIsOpen(false)}>Sign Up</Link>
                        </Button>
                        <Button variant="outline" size="lg" asChild className="w-full">
                          <Link to="/auth" onClick={() => setIsOpen(false)}>Login</Link>
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
