import LegalPage, { LegalSection } from "@/components/legal-page";

export const metadata = {
  title: "Terms of Service | YungDrip",
  description: "Terms and conditions for using the YungDrip online store."
};

const LAST_UPDATED = "June 13, 2026";

export default function TermsOfServicePage() {
  return (
    <LegalPage
      title="Terms of Service"
      description="Please read these terms carefully before using YungDrip. By accessing our site or placing an order, you agree to these terms."
      lastUpdated={LAST_UPDATED}
    >
      <LegalSection title="1. Agreement">
        <p>
          These Terms of Service govern your use of the YungDrip website, account features, and purchase of products
          offered through the store. If you do not agree to these terms, please do not use the site.
        </p>
      </LegalSection>

      <LegalSection title="2. Eligibility">
        <p>
          You must be at least 18 years old, or the age of majority in your jurisdiction, to create an account or place
          an order. By using YungDrip, you represent that the information you provide is accurate and that you are
          authorized to use the payment method submitted at checkout.
        </p>
      </LegalSection>

      <LegalSection title="3. Products and pricing">
        <p>
          We strive to display product images, descriptions, sizes, and prices accurately. Minor variations in color,
          fabric, or fit may occur. Prices are shown in the store currency and may change without notice. Applicable
          taxes and shipping charges are calculated at checkout.
        </p>
        <p>
          All orders are subject to availability. If an item becomes unavailable after you place an order, we will
          contact you and offer a refund or suitable alternative.
        </p>
      </LegalSection>

      <LegalSection title="4. Orders and payment">
        <p>
          Placing an order constitutes an offer to purchase. We reserve the right to refuse or cancel any order for
          reasons including suspected fraud, pricing errors, inventory issues, or violations of these terms.
        </p>
        <p>
          Payment is processed securely through Razorpay. Your order is confirmed once payment is successfully
          authorized and verified on our systems. You are responsible for any fees charged by your bank or payment
          provider.
        </p>
      </LegalSection>

      <LegalSection title="5. Shipping and delivery">
        <p>
          We ship to addresses provided at checkout within supported service areas. Delivery timelines shown on the site
          are estimates and may vary based on location, carrier capacity, and holidays.
        </p>
        <p>
          Risk of loss passes to you once the order is handed to the carrier. Please inspect packages on delivery and
          report visible damage or missing items promptly.
        </p>
      </LegalSection>

      <LegalSection title="6. Returns and refunds">
        <p>
          Returns and refunds are governed by our separate{" "}
          <a href="/returns-refunds" className="underline underline-offset-2">
            Returns &amp; Refunds Policy
          </a>
          , which is incorporated into these terms by reference.
        </p>
      </LegalSection>

      <LegalSection title="7. Accounts">
        <p>
          You are responsible for maintaining the confidentiality of your account credentials and for all activity under
          your account. Notify us immediately if you suspect unauthorized access. We may suspend or terminate accounts
          that violate these terms or create security risk.
        </p>
      </LegalSection>

      <LegalSection title="8. Acceptable use">
        <p>You agree not to:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>use the site for unlawful, fraudulent, or abusive purposes;</li>
          <li>attempt to interfere with site security, inventory systems, or payment flows;</li>
          <li>scrape, copy, or resell site content without permission;</li>
          <li>submit false orders, chargebacks, or return requests in bad faith.</li>
        </ul>
      </LegalSection>

      <LegalSection title="9. Intellectual property">
        <p>
          All content on YungDrip, including branding, photography, product designs, text, and software, is owned by
          YungDrip or its licensors and is protected by applicable intellectual property laws. You may not reproduce or
          exploit site content without prior written consent.
        </p>
      </LegalSection>

      <LegalSection title="10. Disclaimers">
        <p>
          The site and products are provided on an &quot;as is&quot; and &quot;as available&quot; basis to the fullest
          extent permitted by law. We disclaim warranties not expressly stated here, including implied warranties of
          merchantability and fitness for a particular purpose.
        </p>
      </LegalSection>

      <LegalSection title="11. Limitation of liability">
        <p>
          To the maximum extent permitted by law, YungDrip is not liable for indirect, incidental, special,
          consequential, or punitive damages arising from your use of the site or purchase of products. Our total
          liability for any claim related to an order is limited to the amount you paid for that order.
        </p>
      </LegalSection>

      <LegalSection title="12. Governing law">
        <p>
          These terms are governed by the laws of India, without regard to conflict-of-law principles. Disputes will be
          subject to the exclusive jurisdiction of courts located in India, unless applicable consumer protection law
          requires otherwise.
        </p>
      </LegalSection>

      <LegalSection title="13. Changes and contact">
        <p>
          We may update these terms from time to time. Continued use of the site after changes become effective
          constitutes acceptance of the revised terms.
        </p>
        <p>
          Questions about these terms can be sent to{" "}
          <a href="mailto:legal@yungdrip.com" className="underline underline-offset-2">
            legal@yungdrip.com
          </a>
          .
        </p>
      </LegalSection>
    </LegalPage>
  );
}
