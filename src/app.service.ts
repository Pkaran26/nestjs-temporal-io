import { Injectable } from '@nestjs/common';
import { TemporalService } from 'nestjs-temporal-core';

@Injectable()
export class AppService {
  constructor(private readonly temporalService: TemporalService) {}

  async sendWelcomeEmail(email: string): Promise<string> {
    // Use the simplified API to start a workflow
    const { workflowId } = await this.temporalService.startWorkflow(
      'sendWelcomeWorkflow',
      [email],
      'my-task-queue',
      {
        workflowId: `welcome-${email}-${Date.now()}`,
      },
    );

    return workflowId;
  }

  async sendPromoEmail(email: string, promoCode: string): Promise<string> {
    // Use the client service directly for more options
    const { workflowId } = await this.temporalService
      .getClient()
      .startWorkflow('sendPromoWorkflow', [email, promoCode], {
        taskQueue: 'my-task-queue',
        workflowId: `promo-${email}-${Date.now()}`,
        retry: {
          maximumAttempts: 3,
        },
      });

    return workflowId;
  }
}
