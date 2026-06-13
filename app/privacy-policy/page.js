import LegalPage, { LegalSection } from "@/components/legal-page";

export const metadata = {
  title: "Privacy Policy | YungDrip",
  description: "How YungDrip collects, uses, and protects your personal information."
};

const LAST_UPDATED = "June 13, 2026";

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      description="This policy explains what information we collect when you shop with YungDrip, how we use it, and the choices you have."
      lastUpdated={LAST_UPDATED}
    >
      <LegalSection title="1. Who we are">
        <p>
          YungDrip operates this online clothing storefront. When this policy refers to &quot;we,&quot; &quot;us,&quot; or
          &quot;our,&quot; it means YungDrip and the team responsible for running the store.
        </p>
        <p>
          If you have questions about this policy or your data, contact us at{" "}
          <a href="mailto:privacy@yungdrip.com" className="underline underline-offset-2">
            privacy@yungdrip.com
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="2. Information we collect">
        <p>We collect information you provide directly and information generated when you use the site:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Account details:</strong> name, email address, phone number, and password (stored in hashed form).
          </li>
          <li>
            <strong>Order and checkout details:</strong> shipping address, items purchased, payment status, and order
            history.
          </li>
          <li>
            <strong>Cart data:</strong> products, sizes, colors, and quantities you add to your cart.
          </li>
          <li>
            <strong>Communications:</strong> messages you send us and transactional emails we send to you.
          </li>
          <li>
            <strong>Technical data:</strong> browser type, device information, IP address, and usage data needed to keep
            the site secure and reliable.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="3. How we use your information">
        <p>We use the information we collect to:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>create and manage your account;</li>
          <li>process orders, payments, shipping, and returns;</li>
          <li>send order confirmations, delivery updates, and account-related messages;</li>
          <li>provide customer support and respond to your requests;</li>
          <li>prevent fraud, abuse, and unauthorized access;</li>
          <li>improve our products, storefront, and shopping experience.</li>
        </ul>
        <p>
          We do not sell your personal information. We share data only with service providers that help us operate the
          store, such as payment processors, email delivery providers, and hosting infrastructure, and only as needed to
          provide those services.
        </p>
      </LegalSection>

      <LegalSection title="4. Payments">
        <p>
          Payments are processed through Razorpay. When you checkout, payment information is handled directly by Razorpay
          according to their privacy practices. We receive payment status and limited transaction details needed to
          fulfill your order.
        </p>
      </LegalSection>

      <LegalSection title="5. Cookies and local storage">
        <p>
          We use essential cookies and browser storage to keep you signed in, maintain your cart, and protect the site.
          These are required for core storefront functionality. We do not use advertising cookies on this site today.
        </p>
      </LegalSection>

      <LegalSection title="6. Data retention">
        <p>
          We keep account and order records for as long as needed to fulfill orders, meet legal obligations, resolve
          disputes, and enforce our agreements. You may request deletion of your account, subject to records we must
          retain for tax, accounting, or legal reasons.
        </p>
      </LegalSection>

      <LegalSection title="7. Security">
        <p>
          We use industry-standard safeguards including encrypted connections, hashed passwords, secure session cookies,
          and access controls on administrative tools. No method of transmission or storage is completely secure, but we
          work to protect your information with reasonable technical and organizational measures.
        </p>
      </LegalSection>

      <LegalSection title="8. Your rights and choices">
        <p>You can:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>review and update account details from your account page;</li>
          <li>request access to or correction of personal information we hold about you;</li>
          <li>request account deletion, where permitted by law;</li>
          <li>opt out of non-essential marketing emails by using the unsubscribe link in those messages.</li>
        </ul>
        <p>
          If you are located in a region with additional privacy rights, you may contact us to exercise those rights. We
          will respond within a reasonable timeframe.
        </p>
      </LegalSection>

      <LegalSection title="9. Children">
        <p>
          YungDrip is not directed to children under 18, and we do not knowingly collect personal information from
          children. If you believe a child has provided us information, contact us and we will take appropriate steps to
          remove it.
        </p>
      </LegalSection>

      <LegalSection title="10. Changes to this policy">
        <p>
          We may update this Privacy Policy from time to time. When we do, we will revise the &quot;Last updated&quot;
          date at the top of this page. Material changes may also be communicated by email or a notice on the site.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
