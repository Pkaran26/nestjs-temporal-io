import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): Promise<any> {
    return this.appService.sendWelcomeEmail('kau@gmail.com');
  }

  @Get('both')
  getBoth(): Promise<any> {
    return this.appService.sendBothEmails('kau@gmail.com', 'ABC');
  }

  @Get('products')
  getProducts(): Promise<any> {
    return this.appService.getProducts();
  }

  @Get('cart')
  getCart(): Promise<any> {
    return this.appService.getCart();
  }

  @Get('posts')
  getPosts(): Promise<any> {
    return this.appService.getPosts();
  }

  @Get('quotes')
  getQuotes(): Promise<any> {
    return this.appService.getQuotes();
  }
}
