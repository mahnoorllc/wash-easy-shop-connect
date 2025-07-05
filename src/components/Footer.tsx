
import { Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => {
  const scrollToMenu = () => {
    const navigation = document.getElementById('main-navigation');
    if (navigation) {
      navigation.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
                  <path d="M3 4a1 1 0 00-1 1v1a1 1 0 001 1h1a1 1 0 001-1V5a1 1 0 00-1-1H3zM3 10a1 1 0 00-1 1v1a1 1 0 001 1h1a1 1 0 001-1v-1a1 1 0 00-1-1H3zM3 16a1 1 0 00-1 1v1a1 1 0 001 1h1a1 1 0 001-1v-1a1 1 0 00-1-1H3zM8 5a1 1 0 011-1h8a1 1 0 110 2H9a1 1 0 01-1-1zM8 11a1 1 0 011-1h8a1 1 0 110 2H9a1 1 0 01-1-1zM8 17a1 1 0 011-1h8a1 1 0 110 2H9a1 1 0 01-1-1z"/>
                </svg>
              </div>
              <span className="text-xl font-bold">WashEasy</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md mx-auto md:mx-0">
              Professional laundry services and premium accessories delivered to your doorstep.
            </p>
          </div>

          {/* Services */}
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-lg font-semibold">Services</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <a href="/residential" className="block hover:text-white transition-colors">Wash & Fold</a>
              <a href="/residential" className="block hover:text-white transition-colors">Dry Cleaning</a>
              <a href="/residential" className="block hover:text-white transition-colors">Premium Care</a>
              <a href="/commercial" className="block hover:text-white transition-colors">Commercial Laundry</a>
              <a href="/shop" className="block hover:text-white transition-colors">Accessory Shop</a>
            </div>
          </div>

          {/* Blog & Resources */}
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-lg font-semibold">Blog & Resources</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <a href="/blog" className="block hover:text-white transition-colors">All Articles</a>
              <a href="/blog/care-for-your-clothes-guide" className="block hover:text-white transition-colors">Care for Your Clothes</a>
              <a href="/blog/protect-hands-during-laundry" className="block hover:text-white transition-colors">Safe Washing Tips</a>
              <a href="/blog/eco-friendly-laundry-tips" className="block hover:text-white transition-colors">Eco-Friendly Laundry</a>
              <a href="/blog/stain-removal-secrets" className="block hover:text-white transition-colors">Stain Removal</a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:support@washeasy.com" className="hover:text-white transition-colors">
                  support@washeasy.com
                </a>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <Phone className="w-4 h-4" />
                <a href="https://wa.me/15551234567" className="hover:text-white transition-colors">
                  WhatsApp: +1-555-123-4567
                </a>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <MapPin className="w-4 h-4" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 md:mt-12 pt-6 md:pt-8">
          {/* Mobile-first centered layout */}
          <div className="text-center space-y-4 md:hidden">
            <p className="text-sm text-gray-400">
              © 2025 WashEasy. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
              <a href="/contact" className="hover:text-white transition-colors">Contact</a>
            </div>
            <button
              onClick={scrollToMenu}
              className="text-gray-400 hover:text-white flex items-center space-x-1 mx-auto text-sm"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd"/>
              </svg>
              <span>Go to Menu</span>
            </button>
          </div>

          {/* Desktop layout */}
          <div className="hidden md:flex justify-between items-center">
            <p className="text-sm text-gray-400">
              © 2025 WashEasy. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <div className="flex space-x-6">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
              </div>
              <button
                onClick={scrollToMenu}
                className="text-gray-400 hover:text-white flex items-center space-x-1 text-sm"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd"/>
                </svg>
                <span>Go to Menu</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
