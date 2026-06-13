import { Resend } from "resend";
import { HttpError } from "@/lib/http-error";

function getAppUrl() {
  return process.env.APP_URL || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
}

function getFromAddress() {
  return process.env.RESEND_FROM || "YungDrip <onboarding@resend.dev>";
}

function isEmailConfigured() {
  return Boolean(process.env.RESEND_API_KEY);
}

function getResendClient() {
  if (!isEmailConfigured()) {
    return null;
  }

  return new Resend(process.env.RESEND_API_KEY);
}

async function deliverEmail({ to, subject, html, text }) {
  if (!to) {
    return { sent: false, reason: "missing-recipient" };
  }

  const resend = getResendClient();

  if (!resend) {
    console.info("[email:dev-fallback]", { to, subject, text: text || html });
    return { sent: false, reason: "resend-not-configured" };
  }

  const { error } = await resend.emails.send({
    from: getFromAddress(),
    to: [to],
    subject,
    html,
    text: text || html.replace(/<[^>]+>/g, " ")
  });

  if (error) {
    console.error("[email:resend-error]", { to, subject, error });
    throw new HttpError(502, "Failed to send email");
  }

  return { sent: true };
}

export async function sendWelcomeEmail(user) {
  return deliverEmail({
    to: user.email,
    subject: "Welcome to YungDrip",
    html: `
      <h1>Welcome, ${user.name}</h1>
      <p>Your YungDrip account is ready. Browse the latest drops and track orders from your account dashboard.</p>
      <p><a href="${getAppUrl()}/shop">Start shopping</a></p>
    `,
    text: `Welcome, ${user.name}. Your YungDrip account is ready. Visit ${getAppUrl()}/shop to start shopping.`
  });
}

export async function sendPasswordResetEmail(user, resetToken) {
  const resetUrl = `${getAppUrl()}/reset-password?token=${resetToken}`;

  return deliverEmail({
    to: user.email,
    subject: "Reset your YungDrip password",
    html: `
      <h1>Password reset</h1>
      <p>Hi ${user.name}, we received a request to reset your password.</p>
      <p><a href="${resetUrl}">Reset password</a></p>
      <p>This link expires in 1 hour. If you did not request this, you can ignore this email.</p>
    `,
    text: `Reset your password: ${resetUrl} (expires in 1 hour)`
  });
}

export async function sendOrderConfirmationEmail(order) {
  const itemsList = order.items
    .map((item) => `${item.name} (${item.size}/${item.color}) x${item.quantity}`)
    .join(", ");

  return deliverEmail({
    to: order.shippingAddress.email,
    subject: `Order confirmed — ${order.orderNumber}`,
    html: `
      <h1>Thanks for your order</h1>
      <p>Order <strong>${order.orderNumber}</strong> is confirmed and being prepared.</p>
      <p>Items: ${itemsList}</p>
      <p>Total: ${order.pricing.currency} ${order.pricing.total}</p>
      <p><a href="${getAppUrl()}/account/orders/${order._id}">View order</a></p>
    `,
    text: `Order ${order.orderNumber} confirmed. Total: ${order.pricing.currency} ${order.pricing.total}. View: ${getAppUrl()}/account/orders/${order._id}`
  });
}

export async function sendOrderStatusEmail(order, previousStatus) {
  if (order.status === previousStatus) {
    return { sent: false, reason: "unchanged" };
  }

  const statusLabel = order.status.replaceAll("_", " ");

  return deliverEmail({
    to: order.shippingAddress.email,
    subject: `Order ${order.orderNumber} — ${statusLabel}`,
    html: `
      <h1>Order update</h1>
      <p>Your order <strong>${order.orderNumber}</strong> is now <strong>${statusLabel}</strong>.</p>
      <p><a href="${getAppUrl()}/account/orders/${order._id}">Track your order</a></p>
    `,
    text: `Order ${order.orderNumber} is now ${statusLabel}. Track: ${getAppUrl()}/account/orders/${order._id}`
  });
}

export function assertEmailServiceAvailable() {
  if (!isEmailConfigured() && process.env.NODE_ENV === "production") {
    throw new HttpError(503, "Email service is not configured");
  }
}
