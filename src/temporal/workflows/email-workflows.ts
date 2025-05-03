import { proxyActivities } from '@temporalio/workflow';

// Activities interface
interface EmailActivities {
  sendWelcomeEmail(to: string): Promise<any>;
  sendPromoEmail(to: string, promoCode: string): Promise<any>;
}

const activities = proxyActivities<EmailActivities>({
  startToCloseTimeout: '30s',
});

export async function sendWelcomeWorkflow(email: string): Promise<any> {
  return await activities.sendWelcomeEmail(email);
}

export async function sendPromoWorkflow(
  email: string,
  promoCode: string,
): Promise<any> {
  return await activities.sendPromoEmail(email, promoCode);
}
