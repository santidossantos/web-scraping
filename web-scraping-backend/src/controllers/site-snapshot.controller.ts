import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Site,
  Snapshot,
} from '../models';
import {SiteRepository} from '../repositories';

export class SiteSnapshotController {
  constructor(
    @repository(SiteRepository) protected siteRepository: SiteRepository,
  ) { }

  @get('/sites/{id}/snapshots', {
    responses: {
      '200': {
        description: 'Array of Site has many Snapshot',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Snapshot)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Snapshot>,
  ): Promise<Snapshot[]> {
    return this.siteRepository.snapshots(id).find(filter);
  }

  @post('/sites/{id}/snapshots', {
    responses: {
      '200': {
        description: 'Site model instance',
        content: {'application/json': {schema: getModelSchemaRef(Snapshot)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Site.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Snapshot, {
            title: 'NewSnapshotInSite',
            exclude: ['id'],
            optional: ['siteId']
          }),
        },
      },
    }) snapshot: Omit<Snapshot, 'id'>,
  ): Promise<Snapshot> {
    return this.siteRepository.snapshots(id).create(snapshot);
  }

  @patch('/sites/{id}/snapshots', {
    responses: {
      '200': {
        description: 'Site.Snapshot PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Snapshot, {partial: true}),
        },
      },
    })
    snapshot: Partial<Snapshot>,
    @param.query.object('where', getWhereSchemaFor(Snapshot)) where?: Where<Snapshot>,
  ): Promise<Count> {
    return this.siteRepository.snapshots(id).patch(snapshot, where);
  }

  @del('/sites/{id}/snapshots', {
    responses: {
      '200': {
        description: 'Site.Snapshot DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Snapshot)) where?: Where<Snapshot>,
  ): Promise<Count> {
    return this.siteRepository.snapshots(id).delete(where);
  }
}
