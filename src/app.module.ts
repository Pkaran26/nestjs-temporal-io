import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TemporalModule } from 'nestjs-temporal-core';
import { EmailActivities } from './temporal/activities/email.activities';
import { ShopActivities } from './temporal/activities/shop.activities';
import { BlogActivities } from './temporal/activities/blog.activities';

@Module({
  imports: [
    TemporalModule.register({
      connection: {
        address: 'localhost:7233',
        namespace: 'default',
      },
      taskQueue: 'blog-queue',
      worker: {
        workflowsPath: require.resolve('./temporal/workflows/blog-workflows'),
        activityClasses: [BlogActivities],
        autoStart: true,
      },
      isGlobal: true,
    }),
    TemporalModule.register({
      connection: {
        address: 'localhost:7233',
        namespace: 'default',
      },
      taskQueue: 'my-task-queue',
      worker: {
        workflowsPath: require.resolve('./temporal/workflows/email-workflows'),
        activityClasses: [EmailActivities],
        autoStart: true,
      },
      isGlobal: true,
    }),
    TemporalModule.register({
      connection: {
        address: 'localhost:7233',
        namespace: 'default',
      },
      taskQueue: 'shop-queue',
      worker: {
        workflowsPath: require.resolve('./temporal/workflows/shop-workflows'),
        activityClasses: [ShopActivities],
        autoStart: true,
      },
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
