import {Entity, model, property} from '@loopback/repository';
import {v4 as uuid} from 'uuid';

@model()
export class Snapshot extends Entity {
  @property({
    type: 'string',
    id: true,
    default: () => uuid(),
  })
  id?: string;

  @property({
    type: 'date',
    default: '$now',
  })
  date?: string;

  @property({
    type: 'string',
  })
  siteId?: string;

  @property({
    type: 'array',
    itemType: 'object',
  })
  pages?: [];

  constructor(data?: Partial<Snapshot>) {
    super(data);
  }
}

export interface SnapshotRelations {}

export type SnapshotWithRelations = Snapshot & SnapshotRelations;
