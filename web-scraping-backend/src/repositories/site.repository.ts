import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Site, SiteRelations, Snapshot} from '../models';
import {SnapshotRepository} from './snapshot.repository';

export class SiteRepository extends DefaultCrudRepository<
  Site,
  typeof Site.prototype.id,
  SiteRelations
> {

  public readonly snapshots: HasManyRepositoryFactory<Snapshot, typeof Site.prototype.id>;

  constructor(
    @inject('datasources.Mongo') dataSource: MongoDataSource, @repository.getter('SnapshotRepository') protected snapshotRepositoryGetter: Getter<SnapshotRepository>,
  ) {
    super(Site, dataSource);
    this.snapshots = this.createHasManyRepositoryFactoryFor('snapshots', snapshotRepositoryGetter,);
    this.registerInclusionResolver('snapshots', this.snapshots.inclusionResolver);
  }
}
