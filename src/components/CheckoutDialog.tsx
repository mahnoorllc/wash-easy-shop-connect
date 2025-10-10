
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface CheckoutDialogProps {
  totalPrice: number;
  totalItems: number;
  onCheckout: (data: CheckoutData) => Promise<boolean>;
  isSubmitting: boolean;
  cartItems?: { name: string; quantity: number; price: number }[];
}

export interface CheckoutData {
  deliveryAddress: string;
  phone: string;
  deliveryNotes?: string;
  paymentMethod: 'cod' | 'online';
}

export const CheckoutDialog = ({ totalPrice, totalItems, onCheckout, isSubmitting, cartItems = [] }: CheckoutDialogProps) => {
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [deliveryNotes, setDeliveryNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'online'>('cod');
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!deliveryAddress.trim() || !phone.trim()) return;
    
    const success = await onCheckout({
      deliveryAddress,
      phone,
      deliveryNotes,
      paymentMethod
    });
    
    if (success) {
      setIsOpen(false);
      setDeliveryAddress("");
      setPhone("");
      setDeliveryNotes("");
      setPaymentMethod('cod');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90">
          Checkout
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Complete Your Order</DialogTitle>
          <DialogDescription>
            Review your order and provide delivery details
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Order Summary */}
          <div className="border rounded-lg p-4 bg-muted/50">
            <h3 className="font-semibold mb-3">Order Summary</h3>
            <div className="space-y-2 mb-3">
              {cartItems.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>{item.name} x {item.quantity}</span>
                  <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-2 flex justify-between font-semibold">
              <span>Total ({totalItems} items)</span>
              <span className="text-primary">${totalPrice.toFixed(2)}</span>
            </div>
          </div>

          {/* Delivery Information */}
          <div className="space-y-4">
            <h3 className="font-semibold">Delivery Information</h3>
            
            <div>
              <Label htmlFor="delivery-address">Delivery Address *</Label>
              <Textarea
                id="delivery-address"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                placeholder="Enter your complete delivery address"
                required
                rows={3}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="delivery-notes">Delivery Notes (Optional)</Label>
              <Textarea
                id="delivery-notes"
                value={deliveryNotes}
                onChange={(e) => setDeliveryNotes(e.target.value)}
                placeholder="Any special instructions for delivery"
                rows={2}
                className="mt-1"
              />
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <Label className="mb-3 block">Payment Method *</Label>
            <RadioGroup value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as 'cod' | 'online')}>
              <div className="flex items-center space-x-2 border rounded-lg p-3">
                <RadioGroupItem value="cod" id="cod" />
                <Label htmlFor="cod" className="flex-1 cursor-pointer">
                  <div className="font-medium">Cash on Delivery</div>
                  <div className="text-sm text-muted-foreground">Pay when you receive your order</div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 border rounded-lg p-3 opacity-50">
                <RadioGroupItem value="online" id="online" disabled />
                <Label htmlFor="online" className="flex-1">
                  <div className="font-medium">Online Payment</div>
                  <div className="text-sm text-muted-foreground">Coming soon</div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting || !deliveryAddress.trim() || !phone.trim()}
            >
              {isSubmitting ? "Processing..." : `Place Order - $${totalPrice.toFixed(2)}`}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
