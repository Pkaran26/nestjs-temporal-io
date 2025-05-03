import { Activity, ActivityMethod } from 'nestjs-temporal-core';

@Activity()
export class EmailActivities {
  @ActivityMethod()
  async sendWelcomeEmail(to: string): Promise<any> {
    // Implementation
    console.log(`Sending welcome email to ${to}`);
    return await fetch('https://jsonplaceholder.typicode.com/posts');
  }

  @ActivityMethod('sendPromoEmail')
  async sendPromotion(to: string, promoCode: string): Promise<any> {
    // Implementation
    console.log(`Sending promo ${promoCode} to ${to}`);
    return await fetch('https://jsonplaceholder.typicode.com/posts');
  }
}
