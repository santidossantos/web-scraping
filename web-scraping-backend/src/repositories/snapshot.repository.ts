import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Snapshot, SnapshotRelations} from '../models';

export class SnapshotRepository extends DefaultCrudRepository<
  Snapshot,
  typeof Snapshot.prototype.id,
  SnapshotRelations
> {
  constructor(
    @inject('datasources.Mongo') dataSource: MongoDataSource,
  ) {
    super(Snapshot, dataSource);
  }
}
