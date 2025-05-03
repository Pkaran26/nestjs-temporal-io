export interface ShopActivities {
  getProducts(): Promise<any>;
  getCart(): Promise<any>;
}
