import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CancellationRefund() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 p-6 lg:p-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Cancellation & Refund Policy
        </h1>
        <p className="text-muted-foreground">
          Last updated on Sep 1st 2025
        </p>
      </div>

      <Card>
        <CardContent className="p-8 space-y-6">
          <p className="text-lg">
            Our company believes in helping its customers as far as possible, and has therefore a liberal cancellation policy. Under this policy:
          </p>

          <div className="space-y-4">
            <div className="border-l-4 border-primary pl-4">
              <p>
                Cancellations will be considered only if the request is made within <strong>Not Applicable</strong> of placing the order. However, the cancellation request may not be entertained if the orders have been communicated to the vendors/merchants and they have initiated the process of shipping them.
              </p>
            </div>

            <div className="border-l-4 border-primary pl-4">
              <p>
                We do not accept cancellation requests for perishable items like flowers, eatables etc. However, refund/replacement can be made if the customer establishes that the quality of product delivered is not good.
              </p>
            </div>

            <div className="border-l-4 border-primary pl-4">
              <p>
                In case of receipt of damaged or defective items please report the same to our Customer Service team. The request will, however, be entertained once the merchant has checked and determined the same at his own end. This should be reported within <strong>Not Applicable</strong> of receipt of the products.
              </p>
            </div>

            <div className="border-l-4 border-primary pl-4">
              <p>
                In case you feel that the product received is not as shown on the site or as per your expectations, you must bring it to the notice of our customer service within <strong>Not Applicable</strong> of receiving the product. The Customer Service Team after looking into your complaint will take an appropriate decision.
              </p>
            </div>

            <div className="border-l-4 border-primary pl-4">
              <p>
                In case of complaints regarding products that come with a warranty from manufacturers, please refer the issue to them.
              </p>
            </div>

            <div className="border-l-4 border-primary pl-4">
              <p>
                In case of any Refunds approved by us, it'll take <strong>Not Applicable</strong> for the refund to be processed to the end customer.
              </p>
            </div>
          </div>

          <div className="mt-8 p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Contact Information</h3>
            <div className="space-y-1 text-sm">
              <p><strong>Phone:</strong> 9325025730</p>
              <p><strong>Email:</strong> pratik@wysetree.com</p>
              <p><strong>Address:</strong> 2nd floor, Flat No. 8, Building D, S.No. 33/21, Wadgaon Budruk, Pune, Maharashtra, 411041</p>
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