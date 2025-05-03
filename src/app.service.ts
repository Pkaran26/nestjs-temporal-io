import { Injectable } from '@nestjs/common';
import { TemporalService } from 'nestjs-temporal-core';

@Injectable()
export class AppService {
  constructor(private readonly temporalService: TemporalService) {}

  async sendWelcomeEmail(email: string): Promise<any> {
    // Use the simplified API to start a workflow
    const response = await this.temporalService.startWorkflow(
      'sendWelcomeWorkflow',
      [email],
      'my-task-queue',
      {
        workflowId: `welcome-${email}-${Date.now()}`,
      },
    );
    const data = await response.result;
    return {
      data: data,
      workflowId: response.workflowId,
    };

    // return response.firstExecutionRunId;
  }

  async sendPromoEmail(email: string, promoCode: string): Promise<any> {
    // Use the client service directly for more options
    const response = await this.temporalService
      .getClient()
      .startWorkflow('sendPromoWorkflow', [email, promoCode], {
        taskQueue: 'my-task-queue',
        workflowId: `promo-${email}-${Date.now()}`,
        retry: {
          maximumAttempts: 3,
        },
      });

    const data = await response.result;
    return {
      data: data,
      workflowId: response.workflowId,
    };
  }

  async sendBothEmails(email: string, promoCode: string): Promise<any> {
    const handle = await this.temporalService
      .getClient()
      .startWorkflow('sendEmailSequenceWorkflow', [email, promoCode], {
        taskQueue: 'my-task-queue',
        workflowId: `both-${email}-${Date.now()}`,
      });

    const result = await handle.result; // returns { welcome, promo }
    return result;
  }
}
