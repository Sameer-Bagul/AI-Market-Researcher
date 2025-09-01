import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ShippingPolicy() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 p-6 lg:p-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Shipping & Delivery Policy
        </h1>
        <p className="text-muted-foreground">
          Last updated on Sep 1st 2025
        </p>
      </div>

      <Card>
        <CardContent className="p-8 space-y-6">
          <div className="space-y-4">
            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold mb-2">International Orders</h3>
              <p>
                For International buyers, orders are shipped and delivered through registered international courier companies and/or International speed post only.
              </p>
            </div>

            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold mb-2">Domestic Orders</h3>
              <p>
                For domestic buyers, orders are shipped through registered domestic courier companies and/or speed post only.
              </p>
            </div>

            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold mb-2">Shipping Timeline</h3>
              <p>
                Orders are shipped within <strong>0-7 days</strong> or as per the delivery date agreed at the time of order confirmation and delivering of the shipment subject to Courier Company / post office norms.
              </p>
            </div>

            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold mb-2">Delivery Guarantee</h3>
              <p>
                We are not liable for any delay in delivery by the courier company / postal authorities and only guarantees to hand over the consignment to the courier company or postal authorities within <strong>0-7 days</strong> from the date of the order and payment or as per the delivery date agreed at the time of order confirmation.
              </p>
            </div>

            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold mb-2">Delivery Address</h3>
              <p>
                Delivery of all orders will be to the address provided by the buyer. Delivery of our services will be confirmed on your mail ID as specified during registration.
              </p>
            </div>
          </div>

          <div className="mt-8 p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Need Help?</h3>
            <p className="mb-2">
              For any issues in utilizing our services you may contact our helpdesk:
            </p>
            <div className="space-y-1 text-sm">
              <p><strong>Phone:</strong> 9325025730</p>
              <p><strong>Email:</strong> pratik@wysetree.com</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              <strong>Disclaimer:</strong> The above content is created at our sole discretion. Razorpay shall not be liable for any content provided here and shall not be responsible for any claims and liability that may arise due to merchant's non-adherence to it.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}