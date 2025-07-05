
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, Search, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="text-center max-w-md mx-auto p-8">
        <div className="mb-8">
          <div className="text-8xl font-bold text-blue-600 mb-4">404</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h1>
          <p className="text-lg text-gray-600 mb-8">
            Sorry, we couldn't find the page you're looking for. The page might have been moved, deleted, or the URL might be incorrect.
          </p>
        </div>

        <div className="space-y-4">
          <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
            <Link to="/" className="flex items-center justify-center space-x-2">
              <Home className="w-4 h-4" />
              <span>Go to Homepage</span>
            </Link>
          </Button>
          
          <Button variant="outline" asChild className="w-full">
            <Link to="/contact" className="flex items-center justify-center space-x-2">
              <Search className="w-4 h-4" />
              <span>Contact Support</span>
            </Link>
          </Button>

          <Button 
            variant="ghost" 
            onClick={() => window.history.back()}
            className="w-full flex items-center justify-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </Button>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>Error Code: 404</p>
          <p>Requested URL: {location.pathname}</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
