import { Activity, ActivityMethod } from 'nestjs-temporal-core';

@Activity()
export class BlogActivities {
  private URL = 'https://dummyjson.com';
  @ActivityMethod('getPosts')
  async getPosts(): Promise<any> {
    const res = await fetch(`${this.URL}/posts`);
    return res.json();
  }

  @ActivityMethod('getQuotes')
  async getQuotes(): Promise<any> {
    const res = await fetch(`${this.URL}/quotes`);
    return res.json();
  }
}
