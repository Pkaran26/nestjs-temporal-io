import { proxyActivities } from '@temporalio/workflow';
import { BlogActivities } from '../activities/blog.activities';

const activities = proxyActivities<BlogActivities>({
  startToCloseTimeout: '30s',
});

export async function getPostsWorkflow(): Promise<any> {
  return await activities.getPosts();
}

export async function getQuotesWorkflow(): Promise<any> {
  return await activities.getQuotes();
}
