
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Navigation } from "@/components/Navigation";
import { ShoppingBag, Search, Filter, Star, Plus, Minus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Shop = () => {
  const { toast } = useToast();
  const [cart, setCart] = useState<{[key: string]: number}>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { value: "all", label: "All Products" },
    { value: "detergents", label: "Detergents" },
    { value: "softeners", label: "Fabric Softeners" },
    { value: "accessories", label: "Accessories" },
    { value: "bags", label: "Laundry Bags" },
    { value: "hangers", label: "Hangers" }
  ];

  const products = [
    {
      id: "1",
      name: "Premium Liquid Detergent",
      description: "High-efficiency concentrated detergent for all fabric types",
      category: "detergents",
      price: 24.99,
      image: "/placeholder.svg",
      rating: 4.8,
      reviews: 156,
      stock: 45,
      features: ["Concentrated formula", "Eco-friendly", "All fabric types"]
    },
    {
      id: "2",
      name: "Luxury Fabric Softener",
      description: "Premium fabric softener with long-lasting freshness",
      category: "softeners",
      price: 18.99,
      image: "/placeholder.svg",
      rating: 4.9,
      reviews: 203,
      stock: 32,
      features: ["Long-lasting scent", "Gentle on skin", "Reduces static"]
    },
    {
      id: "3",
      name: "Mesh Laundry Bag Set",
      description: "Set of 3 premium mesh bags for delicate items",
      category: "bags",
      price: 15.99,
      image: "/placeholder.svg",
      rating: 4.7,
      reviews: 89,
      stock: 78,
      features: ["3 different sizes", "Durable mesh", "Zipper closure"]
    },
    {
      id: "4",
      name: "Stain Remover Spray",
      description: "Powerful stain remover for tough stains",
      category: "accessories",
      price: 12.99,
      image: "/placeholder.svg",
      rating: 4.6,
      reviews: 124,
      stock: 56,
      features: ["Works on all stains", "Safe for colors", "Easy spray bottle"]
    },
    {
      id: "5",
      name: "Premium Wooden Hangers",
      description: "Set of 10 solid wood hangers with non-slip coating",
      category: "hangers",
      price: 29.99,
      image: "/placeholder.svg",
      rating: 4.9,
      reviews: 78,
      stock: 23,
      features: ["Solid wood", "Non-slip coating", "Contoured shape"]
    },
    {
      id: "6",
      name: "Color-Safe Bleach",
      description: "Gentle bleach alternative safe for colored fabrics",
      category: "detergents",
      price: 16.99,
      image: "/placeholder.svg",
      rating: 4.5,
      reviews: 67,
      stock: 41,
      features: ["Color-safe formula", "Brightens whites", "Removes odors"]
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (productId: string) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
    toast({
      title: "Added to Cart",
      description: "Product has been added to your cart",
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[productId] > 1) {
        newCart[productId]--;
      } else {
        delete newCart[productId];
      }
      return newCart;
    });
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, count) => sum + count, 0);
  };

  const getTotalPrice = () => {
    return Object.entries(cart).reduce((sum, [productId, count]) => {
      const product = products.find(p => p.id === productId);
      return sum + (product ? product.price * count : 0);
    }, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="mb-4 md:mb-0">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Laundry Accessories Shop</h1>
            <p className="text-gray-600">Premium products for all your laundry needs</p>
          </div>
          
          {getTotalItems() > 0 && (
            <Card className="border-0 shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <ShoppingBag className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold">{getTotalItems()} items</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Total</div>
                    <div className="font-bold text-blue-600">${getTotalPrice().toFixed(2)}</div>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Checkout
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
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

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <div className="aspect-square bg-gray-100 rounded-t-lg relative overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.stock < 30 && (
                  <Badge className="absolute top-3 right-3 bg-orange-100 text-orange-800">
                    Low Stock
                  </Badge>
                )}
              </div>
              
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg font-semibold line-clamp-2">
                    {product.name}
                  </CardTitle>
                  <div className="text-right">
                    <div className="text-xl font-bold text-blue-600">
                      ${product.price}
                    </div>
                  </div>
                </div>
                <CardDescription className="text-sm text-gray-600 line-clamp-2">
                  {product.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Rating */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="font-medium">{product.rating}</span>
                    <span className="text-gray-500">({product.reviews})</span>
                  </div>
                  <span className="text-gray-500">{product.stock} in stock</span>
                </div>

                {/* Features */}
                <div className="space-y-1">
                  {product.features.slice(0, 2).map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-xs text-gray-600">
                      <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Add to Cart */}
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
                      <span className="font-semibold">{cart[product.id]}</span>
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
                      className="bg-blue-600 hover:bg-blue-700"
                      size="sm"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
