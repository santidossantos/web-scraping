import {Entity, model, property, hasMany} from '@loopback/repository';
import {UpdateFrequency} from '../types/update-frequency';
import {Snapshot} from './snapshot.model';
import {v4 as uuid} from 'uuid';

@model()
export class Site extends Entity {
  @property({
    type: 'string',
    id: true,
    default: () => uuid(),
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  domain: string;

  @property({
    type: 'string',
    required: true,
  })
  maxDepth: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: Object.values(UpdateFrequency),
    },
  })
  updateFrequency: UpdateFrequency;

  @property({
    type: 'date',
  })
  lastUpdate?: string;

  @property({
    type: 'string',
  })
  extractor?: string;

  @hasMany(() => Snapshot)
  snapshots: Snapshot[];

  @property({
    type: 'string',
  })
  userId: string;

  @property({
    type: 'string',
  })
  icon?: string;

  constructor(data?: Partial<Site>) {
    super(data);
  }
}

export interface SiteRelations {}

export type SiteWithRelations = Site & SiteRelations;
