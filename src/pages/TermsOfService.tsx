import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>
          
          <div className="prose max-w-none">
            <p className="text-gray-600 mb-6">
              Last updated: January 1, 2025
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 mb-6">
              By accessing and using WashEasy's platform and services, you accept and agree to be bound 
              by the terms and provision of this agreement. If you do not agree to abide by the above, 
              please do not use this service.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. Description of Service</h2>
            <p className="text-gray-700 mb-4">
              WashEasy provides a platform that connects customers with professional laundry service providers. 
              Our services include:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>Wash & fold laundry services</li>
              <li>Dry cleaning services</li>
              <li>Pickup and delivery coordination</li>
              <li>Online ordering and payment processing</li>
              <li>Customer support and order tracking</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. User Responsibilities</h2>
            <p className="text-gray-700 mb-4">
              As a user of our service, you agree to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>Provide accurate and current information</li>
              <li>Be present for scheduled pickup and delivery times</li>
              <li>Follow care instructions and item limitations</li>
              <li>Pay for services in a timely manner</li>
              <li>Treat our staff and partners with respect</li>
              <li>Not use the service for illegal or harmful purposes</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">4. Service Limitations</h2>
            <p className="text-gray-700 mb-4">
              We reserve the right to refuse service for items that are:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>Heavily soiled, contaminated, or hazardous</li>
              <li>Valuable items (jewelry, cash, important documents)</li>
              <li>Items requiring special treatment beyond our capabilities</li>
              <li>Illegal substances or contraband</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">5. Pricing and Payment</h2>
            <p className="text-gray-700 mb-6">
              Prices are subject to change without notice. Payment is due upon completion of services. 
              We accept various payment methods including credit cards and digital payments. Additional 
              fees may apply for premium services, rush orders, or special requests.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">6. Liability and Insurance</h2>
            <p className="text-gray-700 mb-6">
              While we take great care in handling your items, we cannot be held responsible for 
              damage to items that are not properly labeled, are beyond normal wear, or result from 
              manufacturing defects. Our liability is limited to the fair market value of damaged items, 
              not to exceed $100 per item unless additional insurance is purchased.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">7. Cancellation and Refunds</h2>
            <p className="text-gray-700 mb-6">
              Orders can be cancelled up to 2 hours before the scheduled pickup time. Refunds for 
              services not yet performed will be processed within 5-7 business days. Once items 
              have been picked up and processing has begun, cancellation may not be possible.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">8. Privacy</h2>
            <p className="text-gray-700 mb-6">
              Your privacy is important to us. Please review our Privacy Policy, which also governs 
              your use of the service, to understand our practices.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">9. Modifications to Terms</h2>
            <p className="text-gray-700 mb-6">
              We reserve the right to modify these terms at any time. We will notify users of any 
              significant changes via email or through our platform. Continued use of the service 
              after such modifications constitutes acceptance of the updated terms.
            </p>

            <h2 className="text-2xl font-semibant text-gray-900 mt-8 mb-4">10. Contact Information</h2>
            <p className="text-gray-700 mb-4">
              For questions about these Terms of Service, please contact us:
            </p>
            <ul className="list-none text-gray-700 mb-6">
              <li>Email: legal@washeasy.com</li>
              <li>Phone: +1-555-123-4567</li>
              <li>Address: San Francisco, CA</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsOfService;