
export const Footer = () => {
  const scrollToMenu = () => {
    const navigation = document.getElementById('main-navigation');
    if (navigation) {
      navigation.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8">
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
            <p className="text-gray-400 text-sm leading-relaxed">
              Professional laundry services and premium accessories delivered to your doorstep. Connecting customers with trusted local partners.
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

          {/* Support */}
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-lg font-semibold">Support</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <a href="/contact" className="block hover:text-white transition-colors">Help Center</a>
              <a href="/dashboard" className="block hover:text-white transition-colors">Track Order</a>
              <a href="/merchant-register" className="block hover:text-white transition-colors">Partner Support</a>
              <a href="/contact" className="block hover:text-white transition-colors">Quality Guarantee</a>
              <a href="/contact" className="block hover:text-white transition-colors">Contact Us</a>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-lg font-semibold">Contact</h3>
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                </svg>
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
                <span>support@washeasy.com</span>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                </svg>
                <span>Available in 50+ cities</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          {/* Mobile-first centered layout */}
          <div className="text-center space-y-4 md:hidden">
            <p className="text-sm text-gray-400">
              © 2025 WashEasy. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="/contact" className="hover:text-white transition-colors">FAQs</a>
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
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
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
