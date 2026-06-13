import LegalPage, { LegalSection } from "@/components/legal-page";

export const metadata = {
  title: "Returns & Refunds | YungDrip",
  description: "YungDrip return, exchange, and refund policy."
};

const LAST_UPDATED = "June 13, 2026";

export default function ReturnsRefundsPage() {
  return (
    <LegalPage
      title="Returns & Refunds"
      description="We want you to love what you ordered. If something is not right, here is how returns, exchanges, and refunds work."
      lastUpdated={LAST_UPDATED}
    >
      <LegalSection title="1. Return window">
        <p>
          You may request a return or exchange within <strong>7 days</strong> of delivery for eligible items. The return
          window begins on the date shown in your delivery confirmation or carrier tracking record.
        </p>
        <p>
          To qualify, items must be unworn, unwashed, and in original condition with all tags and packaging intact.
          Items that show signs of wear, damage caused after delivery, or missing tags are not eligible.
        </p>
      </LegalSection>

      <LegalSection title="2. Non-returnable items">
        <p>The following are generally not eligible for return or exchange:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>items marked final sale or clearance at the time of purchase;</li>
          <li>undergarments, socks, and other intimate apparel for hygiene reasons;</li>
          <li>customized, altered, or made-to-order pieces;</li>
          <li>gift cards or promotional credits;</li>
          <li>items returned after the 7-day window.</li>
        </ul>
      </LegalSection>

      <LegalSection title="3. How to start a return">
        <p>To request a return or exchange:</p>
        <ol className="list-decimal space-y-2 pl-5">
          <li>
            Email{" "}
            <a href="mailto:support@yungdrip.com" className="underline underline-offset-2">
              support@yungdrip.com
            </a>{" "}
            with your order number, the item(s) you wish to return, and the reason for the request.
          </li>
          <li>Our team will confirm eligibility and provide return instructions within 2 business days.</li>
          <li>Pack items securely in their original packaging where possible and ship them as directed.</li>
        </ol>
        <p>
          Please do not send returns to our office without prior approval. Unauthorized returns may be refused or
          delayed.
        </p>
      </LegalSection>

      <LegalSection title="4. Exchanges">
        <p>
          If you need a different size or color, we will help you exchange the item subject to availability. If the
          replacement item is unavailable, we will offer a refund to your original payment method or store credit, at
          your choice.
        </p>
      </LegalSection>

      <LegalSection title="5. Refund processing">
        <p>
          Once we receive and inspect your return, approved refunds are initiated within <strong>5 business days</strong>
          . Refunds are returned to the original payment method used at checkout.
        </p>
        <p>
          Depending on your bank or card issuer, it may take an additional 5–10 business days for the refunded amount
          to appear in your account. Shipping fees are non-refundable unless the return is due to our error or a
          defective product.
        </p>
      </LegalSection>

      <LegalSection title="6. Damaged or incorrect items">
        <p>
          If you receive a damaged, defective, or incorrect item, contact us within <strong>48 hours</strong> of
          delivery with photos of the product and packaging. We will arrange a replacement or full refund, including
          any applicable shipping costs, at no charge to you.
        </p>
      </LegalSection>

      <LegalSection title="7. Cancellations">
        <p>
          Orders may be cancelled before they are packed for shipment. If your order has already shipped, it must be
          returned under this policy once delivered. To request a cancellation, email support with your order number as
          soon as possible.
        </p>
      </LegalSection>

      <LegalSection title="8. Lost or undelivered packages">
        <p>
          If tracking shows delivery but you did not receive your package, contact us within 7 days so we can
          investigate with the carrier. We will work with you to resolve the issue with a replacement or refund where
          appropriate.
        </p>
      </LegalSection>

      <LegalSection title="9. Store credit">
        <p>
          In some cases we may offer store credit instead of a refund to your payment method. Store credit does not
          expire and can be applied to future purchases on YungDrip. Store credit is non-transferable and has no cash
          value.
        </p>
      </LegalSection>

      <LegalSection title="10. Questions">
        <p>
          For help with a return, exchange, or refund, reach out to{" "}
          <a href="mailto:support@yungdrip.com" className="underline underline-offset-2">
            support@yungdrip.com
          </a>{" "}
          and include your order number in the subject line. Our support team typically responds within 1–2 business
          days.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
