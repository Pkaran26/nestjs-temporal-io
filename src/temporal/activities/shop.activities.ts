import { Activity, ActivityMethod } from 'nestjs-temporal-core';

@Activity()
export class ShopActivities {
  private URL = 'https://dummyjson.com';
  @ActivityMethod('getProducts')
  async getProducts(): Promise<any> {
    const res = await fetch(`${this.URL}/products`);
    return res.json();
  }

  @ActivityMethod('getCart')
  async getCart(): Promise<any> {
    const res = await fetch(`${this.URL}/carts`);
    return res.json();
  }
}
