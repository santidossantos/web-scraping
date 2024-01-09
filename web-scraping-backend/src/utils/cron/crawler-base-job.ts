/* eslint-disable @typescript-eslint/no-misused-promises */
import {CronJob, cronJob} from '@loopback/cron';
import {repository} from '@loopback/repository';
import {Site, Snapshot} from '../../models';
import {SiteRepository} from '../../repositories';
import {processSite} from '../cheerio-crawler';
import {UpdateFrequency} from '../../types/update-frequency';

@cronJob()
export abstract class CrawlerBaseCronJob extends CronJob {
  constructor(
    @repository(SiteRepository) public siteRepository: SiteRepository,
  ) {
    super({
      name: 'crawler-job',
      onTick: async () => {
        await this.doWork();
      },
      cronTime: '*/10 * * * * *',
      start: true,
    });
  }

  async doWork(updateFrequency?: UpdateFrequency) {
    const sites: Site[] = await this.siteRepository.find({
      where: {
        updateFrequency: updateFrequency,
      },
    });

    await Promise.all(
      sites.map(async site => {
        const pages = await processSite(site);

        const snapshot = new Snapshot({
          date: new Date().toISOString(),
          pages: pages,
          siteId: site.id,
        });

        await this.siteRepository.snapshots(site.id).create(snapshot);

        site.lastUpdate = new Date().toISOString();
        await this.siteRepository.update(site);
      }),
    );
  }
}
