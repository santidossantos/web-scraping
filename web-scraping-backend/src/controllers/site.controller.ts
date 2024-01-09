import {
  Count,
  CountSchema,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import {Site} from '../models';
import {SiteRepository, SnapshotRepository} from '../repositories';
import {authenticate, AuthenticationBindings} from '@loopback/authentication';
import {inject} from '@loopback/core';

@authenticate({strategy: 'auth0-jwt'})
export class SiteController {
  private currentUser: UserProfile;

  constructor(
    @repository(SiteRepository)
    public siteRepository: SiteRepository,

    @repository(SnapshotRepository)
    public snapshotRepository: SnapshotRepository,

    @inject(AuthenticationBindings.CURRENT_USER)
    private currentUserProvider: UserProfile,
  ) {
    this.currentUser = currentUserProvider;
  }

  @post('/sites')
  @response(200, {
    description: 'Site model instance',
    content: {'application/json': {schema: getModelSchemaRef(Site)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Site, {
            title: 'NewSite',
            exclude: ['id'],
          }),
        },
      },
    })
    site: Omit<Site, 'id'>,
  ): Promise<Site> {
    site.userId = this.currentUser.sub;
    site.domain = this.validateHttpDomain(site.domain);
    return this.siteRepository.create(site);
  }

  @get('/sites/count')
  @response(200, {
    description: 'Site model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Site) where?: Where<Site>): Promise<Count> {
    return this.siteRepository.count(where);
  }

  @get('/sites')
  @response(200, {
    description: 'Array of Site model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Site, {includeRelations: true}),
        },
      },
    },
  })
  async find(): Promise<Site[]> {
    const userId = this.currentUser.sub;

    return this.siteRepository.find({
      where: {
        userId: userId,
      },
    });
  }

  @patch('/sites')
  @response(200, {
    description: 'Site PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Site, {partial: true}),
        },
      },
    })
    site: Site,
    @param.where(Site) where?: Where<Site>,
  ): Promise<Count> {
    return this.siteRepository.updateAll(site, where);
  }

  @get('/sites/{id}')
  @response(200, {
    description: 'Site model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Site, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Site, {exclude: 'where'})
    filter?: FilterExcludingWhere<Site>,
  ): Promise<Site> {
    return this.siteRepository.findById(id, filter);
  }

  @patch('/sites/{id}')
  @response(204, {
    description: 'Site PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Site, {partial: true}),
        },
      },
    })
    site: Site,
  ): Promise<void> {
    site.domain = this.validateHttpDomain(site.domain);
    await this.siteRepository.updateById(id, site);
  }

  @put('/sites/{id}')
  @response(204, {
    description: 'Site PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() site: Site,
  ): Promise<void> {
    await this.siteRepository.replaceById(id, site);
  }

  @del('/sites/{id}')
  @response(204, {
    description: 'Site DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.snapshotRepository.deleteAll({siteId: id});
    await this.siteRepository.deleteById(id);
  }

  private validateHttpDomain(url: string): string {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return 'http://' + url;
    }
    else if (url.startsWith('https://')) {
      return url.replace('https://', 'http://');
    }
    
    return url;
  }
}
