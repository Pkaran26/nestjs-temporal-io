import { Activity, ActivityMethod } from 'nestjs-temporal-core';

@Activity()
export class EmailActivities {
  @ActivityMethod()
  async sendWelcomeEmail(to: string): Promise<any> {
    // Implementation
    console.log(`Sending welcome email to ${to}`);
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    return res.json();
  }

  @ActivityMethod('sendPromoEmail')
  async sendPromotion(to: string, promoCode: string): Promise<any> {
    // Implementation
    console.log(`Sending promo ${promoCode} to ${to}`);
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    return res.json();
  }
}
