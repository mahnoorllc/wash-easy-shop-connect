
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqData = [
  {
    question: "How long does the pickup and delivery take?",
    answer: "Our standard turnaround time is 24-48 hours. We offer same-day service for express orders placed before 10 AM. Pickup and delivery times are flexible and can be scheduled according to your convenience."
  },
  {
    question: "What items do you accept for cleaning?",
    answer: "We accept most clothing items, bedding, curtains, and household textiles. We specialize in wash & fold, dry cleaning, and delicate care. Items like leather, fur, wedding dresses, and heavily soiled items may require special handling."
  },
  {
    question: "How do I track my order?",
    answer: "Once you place an order, you'll receive SMS and email updates at each stage: pickup confirmation, processing, and delivery notification. You can also check your order status through your customer dashboard."
  },
  {
    question: "What if I'm not satisfied with the service?",
    answer: "Customer satisfaction is our priority. If you're not happy with the results, contact us within 24 hours of delivery. We'll re-clean the items at no extra charge or provide a full refund for unsatisfactory service."
  }
];

export const FAQDialog = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className="fixed bottom-20 right-6 z-50 bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="FAQ & Help"
        >
          <HelpCircle className="w-5 h-5" />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Frequently Asked Questions
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </DialogContent>
    </Dialog>
  );
};
