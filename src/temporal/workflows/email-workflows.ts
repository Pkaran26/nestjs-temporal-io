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

export async function sendEmailSequenceWorkflow(
  to: string,
  promoCode: string,
): Promise<any> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const welcomeData = await activities.sendWelcomeEmail(to);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const promoData = await activities.sendPromoEmail(to, promoCode);

  return {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    welcome: welcomeData,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    promo: promoData,
  };
}
