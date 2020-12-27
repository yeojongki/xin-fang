import { Injectable, Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronCommand, CronJob } from 'cron';

// * * * * * *
// | | | | | |
// | | | | | day of week
// | | | | month
// | | | day of month
// | | hour
// | minute
// second (optional)

@Injectable()
export class CronService {
  protected readonly logger = new Logger(CronService.name);

  constructor(protected readonly schedulerRegistry: SchedulerRegistry) {}

  addCronJob(
    name: string,
    expression: string | Date,
    onTick: CronCommand,
    onComplete?: CronCommand | null,
  ): CronJob {
    this.logger.log(`Added a cron job, name:[${name}], expression:[${expression}]`);
    const job = new CronJob(expression, onTick, onComplete);
    this.schedulerRegistry.addCronJob(name, job);
    return job;
  }

  stopCronJon(name: string) {
    this.logger.log(`Stop a cron job, name:[${name}]`);
    const ref = this.schedulerRegistry.getCronJob(name);
    ref && ref.stop();
  }

  deleteCronJon(name: string) {
    this.logger.log(`Delete a cron job, name:[${name}]`);
    this.schedulerRegistry.deleteCronJob(name);
  }
}
