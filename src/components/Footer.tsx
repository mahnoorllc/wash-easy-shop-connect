
import { Button } from "@/components/ui/button";
import { Truck, Mail, Phone, MapPin, Facebook, Twitter, Instagram, MessageCircle, ArrowUp } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const Footer = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

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
                <Truck className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">WashEasy</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Professional laundry services and premium accessories delivered to your doorstep. Connecting customers with trusted local partners.
            </p>
            <div className="flex justify-center md:justify-start space-x-3">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <Instagram className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-lg font-semibold">Services</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <a href="#" className="block hover:text-white transition-colors">Wash & Fold</a>
              <a href="#" className="block hover:text-white transition-colors">Dry Cleaning</a>
              <a href="#" className="block hover:text-white transition-colors">Premium Care</a>
              <a href="#" className="block hover:text-white transition-colors">Commercial Laundry</a>
              <a href="#" className="block hover:text-white transition-colors">Accessory Shop</a>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-lg font-semibold">Support</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <a href="#" className="block hover:text-white transition-colors">Help Center</a>
              <a href="#" className="block hover:text-white transition-colors">Track Order</a>
              <a href="#" className="block hover:text-white transition-colors">Partner Support</a>
              <a href="#" className="block hover:text-white transition-colors">Quality Guarantee</a>
              <a href="#" className="block hover:text-white transition-colors">Contact Us</a>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-lg font-semibold">Contact</h3>
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <Mail className="w-4 h-4" />
                <span>support@washeasy.com</span>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Available in 50+ cities</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400 text-center md:text-left">
            © 2024 WashEasy. All rights reserved.
          </p>
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 text-sm text-gray-400 mt-4 md:mt-0">
            <div className="flex space-x-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
            <Button
              onClick={scrollToMenu}
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white flex items-center space-x-1"
            >
              <ArrowUp className="w-4 h-4" />
              <span>Go to Menu</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Instant Chat/FAQ Button */}
      <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
        <DialogTrigger asChild>
          <Button
            className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg z-50 flex items-center justify-center"
            size="lg"
          >
            <MessageCircle className="w-6 h-6" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Quick Help</DialogTitle>
            <DialogDescription>
              Get instant answers to common questions
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-3">
              <h4 className="font-medium">Frequently Asked Questions</h4>
              <div className="space-y-2 text-sm">
                <details className="border rounded p-2">
                  <summary className="cursor-pointer font-medium">How do I track my order?</summary>
                  <p className="mt-2 text-gray-600">You can track your order from your dashboard or use the tracking link sent to your email.</p>
                </details>
                <details className="border rounded p-2">
                  <summary className="cursor-pointer font-medium">What are your pickup hours?</summary>
                  <p className="mt-2 text-gray-600">We offer 24/7 pickup and delivery services in most areas.</p>
                </details>
                <details className="border rounded p-2">
                  <summary className="cursor-pointer font-medium">How do I become a partner?</summary>
                  <p className="mt-2 text-gray-600">Visit our registration page and fill out the merchant application form.</p>
                </details>
              </div>
            </div>
            <div className="pt-4 border-t">
              <p className="text-sm text-gray-600">
                Need more help? Contact us at{" "}
                <a href="mailto:support@washeasy.com" className="text-blue-600 hover:underline">
                  support@washeasy.com
                </a>
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </footer>
  );
};
