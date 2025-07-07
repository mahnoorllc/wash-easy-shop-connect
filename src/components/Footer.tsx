
import { Mail, Phone, MapPin, ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { FAQDialog } from "./FAQDialog";

export const Footer = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Fixed Scroll to Top Button */}
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Go to Top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* FAQ Button - Fixed position */}
      <FAQDialog />

      <footer className="bg-gray-900 text-white relative">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

            {/* Support & Contact Info */}
            <div className="space-y-4 text-center md:text-left">
              <h3 className="text-lg font-semibold">Support & Contact</h3>
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
                <div className="pt-2">
                  <a href="/contact" className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium">
                    Contact Support →
                  </a>
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
              </div>
            </div>

            {/* Desktop layout */}
            <div className="hidden md:flex justify-between items-center">
              <p className="text-sm text-gray-400">
                © 2025 WashEasy. All rights reserved.
              </p>
              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
