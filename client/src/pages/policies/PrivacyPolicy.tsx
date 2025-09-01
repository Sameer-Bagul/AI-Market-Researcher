import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 p-6 lg:p-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-muted-foreground">
          Last updated on Sep 1st 2025
        </p>
      </div>

      <Card>
        <CardContent className="p-8 space-y-6">
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">Information We Collect</h2>
              <div className="space-y-2">
                <p>We collect information you provide directly to us, such as when you:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Create or modify your account</li>
                  <li>Request customer support</li>
                  <li>Communicate with us via third-party social media sites</li>
                  <li>Request information about our services</li>
                  <li>Use our services and provide information through our platform</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">How We Use Your Information</h2>
              <div className="space-y-2">
                <p>We may use information about you for various purposes, including to:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process transactions and send related information</li>
                  <li>Send technical notices, updates, security alerts, and support messages</li>
                  <li>Respond to your comments, questions, and customer service requests</li>
                  <li>Communicate with you about products, services, and events</li>
                  <li>Monitor and analyze trends, usage, and activities</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Information Sharing</h2>
              <p>
                We may share information about you as follows or as otherwise described in this Privacy Policy:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                <li>With vendors, consultants, and other service providers</li>
                <li>In response to a request for information if we believe disclosure is required by law</li>
                <li>In connection with any merger, sale of company assets, or acquisition</li>
                <li>With your consent or at your direction</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Data Security</h2>
              <p>
                We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Data Retention</h2>
              <p>
                We store the information we collect about you for as long as is necessary for the purpose(s) for which we originally collected it or for other legitimate business purposes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Your Rights</h2>
              <p>You may have the right to:</p>
              <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                <li>Access, update, or delete your personal information</li>
                <li>Receive a copy of your personal information</li>
                <li>Restrict or object to certain processing of your information</li>
                <li>Withdraw consent where we rely on consent to process your information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Cookies and Similar Technologies</h2>
              <p>
                We use cookies and similar tracking technologies to track activity on our service and hold certain information to improve our service and analyze usage.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Changes to Privacy Policy</h2>
              <p>
                We may change this Privacy Policy from time to time. If we make changes, we will notify you by revising the date at the top of the policy.
              </p>
            </section>
          </div>

          <div className="mt-8 p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Contact Us</h3>
            <p className="mb-2">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <div className="space-y-1 text-sm">
              <p><strong>Phone:</strong> 9325025730</p>
              <p><strong>Email:</strong> pratik@wysetree.com</p>
              <p><strong>Address:</strong> 2nd floor, Flat No. 8, Building D, S.No. 33/21, Wadgaon Budruk, Pune, Maharashtra, 411041</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}