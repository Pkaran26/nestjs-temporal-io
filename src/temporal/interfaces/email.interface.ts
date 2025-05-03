export interface EmailActivities {
  sendWelcomeEmail(to: string): Promise<any>;
  sendPromotion(to: string, promoCode: string): Promise<any>;
}
