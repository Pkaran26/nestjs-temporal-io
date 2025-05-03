import { proxyActivities } from '@temporalio/workflow';
import { ShopActivities } from '../activities/shop.activities';

const activities = proxyActivities<ShopActivities>({
  startToCloseTimeout: '30s',
});

export async function getProductsWorkflow(): Promise<any> {
  return await activities.getProducts();
}

export async function getCartWorkflow(): Promise<any> {
  return await activities.getCart();
}
