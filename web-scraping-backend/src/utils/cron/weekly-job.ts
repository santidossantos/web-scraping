import {repository} from '@loopback/repository';
import {SiteRepository} from '../../repositories';
import {CrawlerBaseCronJob} from './crawler-base-job';
import {CronTime} from 'cron';
import {UpdateFrequency} from '../../types/update-frequency';

export class WeeklyCronJob extends CrawlerBaseCronJob {
  cronTime: CronTime;
  constructor(
    @repository(SiteRepository) public siteRepository: SiteRepository,
  ) {
    super(siteRepository);
    this.cronTime = new CronTime('*/60 * * * * *');
  }

  async doWork() {
    await super.doWork(UpdateFrequency.WEEKLY);
  }
}
