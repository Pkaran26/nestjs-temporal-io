import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TemporalModule } from 'nestjs-temporal-core';
import { EmailActivities } from './temporal/activities/email.activities';

const workflowsPath = require.resolve('./temporal/workflows/email-workflows');

@Module({
  imports: [
    TemporalModule.register({
      connection: {
        address: 'localhost:7233',
        namespace: 'default',
      },
      taskQueue: 'my-task-queue',
      worker: {
        workflowsPath: workflowsPath,
        activityClasses: [EmailActivities],
        autoStart: true,
      },
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
