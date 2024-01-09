import {Entity, model, property} from '@loopback/repository';

@model()
export class Snapshot extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
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
