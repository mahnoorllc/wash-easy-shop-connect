
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CheckoutDialog, CheckoutData } from "@/components/CheckoutDialog";
import { ShoppingBag, Search, Filter, Plus, Minus, User } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { useShopCart } from "@/hooks/useShopCart";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

const Shop = () => {
  const { products, loading, error } = useProducts();
  const { cart, addToCart, removeFromCart, getTotalItems, getTotalPrice, submitOrder, isSubmitting } = useShopCart();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { value: "all", label: "All Products" },
    { value: "detergents", label: "Detergents" },
    { value: "softeners", label: "Fabric Softeners" },
    { value: "accessories", label: "Accessories" },
    { value: "bags", label: "Laundry Bags" },
    { value: "hangers", label: "Hangers" },
    { value: "care-products", label: "Care Products" }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (product.description || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category?.toLowerCase().replace(' ', '-') === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCheckout = async (data: CheckoutData) => {
    if (!user) {
      return false;
    }
    return await submitOrder(products, data);
  };

  const getCartItems = () => {
    return Object.entries(cart).map(([productId, quantity]) => {
      const product = products.find(p => p.id === productId);
      return {
        name: product?.name || 'Unknown',
        quantity,
        price: Number(product?.price || 0)
      };
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div className="mb-4 lg:mb-0">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Laundry Accessories Shop</h1>
            <p className="text-gray-600">Premium products for all your laundry needs</p>
          </div>
          
          {getTotalItems() > 0 && (
            <Card className="border-0 shadow-lg w-full lg:w-auto">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
                  <div className="flex items-center space-x-2">
                    <ShoppingBag className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold">{getTotalItems()} items</span>
                  </div>
                  <div className="text-center sm:text-right">
                    <div className="text-sm text-gray-600">Total</div>
                    <div className="font-bold text-blue-600">${getTotalPrice(products).toFixed(2)}</div>
                  </div>
                  {user ? (
                    <CheckoutDialog
                      totalPrice={getTotalPrice(products)}
                      totalItems={getTotalItems()}
                      onCheckout={handleCheckout}
                      isSubmitting={isSubmitting}
                      cartItems={getCartItems()}
                    />
                  ) : (
                    <Link to="/login">
                      <Button className="bg-green-600 hover:bg-green-700 w-full sm:w-auto">
                        <User className="w-4 h-4 mr-2" />
                        Login to Checkout
                      </Button>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Filters - Mobile Optimized */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 text-base" // Larger text for mobile
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Products Grid - Mobile Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <div className="aspect-square bg-gray-100 rounded-t-lg relative overflow-hidden">
                <img 
                  src={product.image_url || "/placeholder.svg"} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-base md:text-lg font-semibold line-clamp-2">
                    {product.name}
                  </CardTitle>
                  <div className="text-right">
                    <div className="text-lg md:text-xl font-bold text-blue-600">
                      ${Number(product.price).toFixed(2)}
                    </div>
                  </div>
                </div>
                {product.description && (
                  <CardDescription className="text-sm text-gray-600 line-clamp-2">
                    {product.description}
                  </CardDescription>
                )}
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Category */}
                {product.category && (
                  <Badge variant="secondary" className="text-xs">
                    {product.category}
                  </Badge>
                )}

                {/* Add to Cart - Mobile Optimized */}
                <div className="flex items-center justify-between">
                  {cart[product.id] ? (
                    <div className="flex items-center space-x-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeFromCart(product.id)}
                        className="w-8 h-8 p-0"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="font-semibold min-w-[20px] text-center">{cart[product.id]}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addToCart(product.id)}
                        className="w-8 h-8 p-0"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      onClick={() => addToCart(product.id)}
                      className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
                      size="sm"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && !loading && (
          <div className="text-center py-12">
            <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Shop;
