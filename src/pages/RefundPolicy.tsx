import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Refund & Return Policy</h1>
          
          <div className="prose max-w-none">
            <p className="text-gray-600 mb-6">
              Last updated: January 1, 2025
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Our Commitment</h2>
            <p className="text-gray-700 mb-6">
              At WashEasy, we are committed to providing exceptional laundry services. If you're not 
              completely satisfied with our service, we're here to make it right.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Service Guarantee</h2>
            <p className="text-gray-700 mb-4">
              We guarantee the quality of our laundry services. If you're not satisfied with the 
              results, we offer:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>Free re-cleaning of unsatisfactory items</li>
              <li>Full refund for services that don't meet our quality standards</li>
              <li>Replacement or compensation for damaged items (subject to our liability terms)</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Refund Eligibility</h2>
            <p className="text-gray-700 mb-4">
              You may be eligible for a refund in the following situations:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>Service was not performed as requested</li>
              <li>Items were damaged due to our negligence</li>
              <li>Delivery was significantly delayed without prior notice</li>
              <li>Items were lost in our care</li>
              <li>Service was cancelled within our cancellation window</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Refund Process</h2>
            <p className="text-gray-700 mb-4">
              To request a refund:
            </p>
            <ol className="list-decimal pl-6 text-gray-700 mb-6">
              <li>Contact our customer service within 48 hours of service completion</li>
              <li>Provide your order number and detailed description of the issue</li>
              <li>Allow our team to investigate and attempt to resolve the issue</li>
              <li>If applicable, return items in their original condition</li>
              <li>Refunds will be processed within 5-7 business days to your original payment method</li>
            </ol>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Cancellation Policy</h2>
            <p className="text-gray-700 mb-4">
              Order cancellations are handled as follows:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li><strong>Before pickup:</strong> Full refund if cancelled 2+ hours before scheduled pickup</li>
              <li><strong>After pickup:</strong> Partial refund may be available for services not yet performed</li>
              <li><strong>During processing:</strong> Refunds not available once cleaning has begun</li>
              <li><strong>Emergency cancellations:</strong> Considered case-by-case</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Non-Refundable Items</h2>
            <p className="text-gray-700 mb-4">
              Certain items and services are non-refundable:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>Gift cards and promotional credits</li>
              <li>Services already completed to satisfaction</li>
              <li>Rush or premium service fees (if service was delivered as requested)</li>
              <li>Delivery fees for completed deliveries</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Damage Claims</h2>
            <p className="text-gray-700 mb-6">
              If your items are damaged during our service, please report it immediately. We will 
              investigate all damage claims and provide appropriate compensation up to the fair market 
              value of the item, not exceeding $100 per item unless additional insurance was purchased.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Store Credit</h2>
            <p className="text-gray-700 mb-6">
              In some cases, we may offer store credit instead of a cash refund. Store credit never 
              expires and can be used for any of our services. Store credit may be offered when a 
              full refund is not warranted but we want to ensure customer satisfaction.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Contact Us</h2>
            <p className="text-gray-700 mb-4">
              For refund requests or questions about this policy, please contact us:
            </p>
            <ul className="list-none text-gray-700 mb-6">
              <li>Email: refunds@washeasy.com</li>
              <li>Phone: +1-555-123-4567</li>
              <li>Customer Service Hours: Monday-Sunday, 8:00 AM - 8:00 PM</li>
            </ul>

            <p className="text-gray-600 text-sm mt-8">
              This refund policy is subject to change. We will notify customers of any significant 
              changes via email or through our platform.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RefundPolicy;