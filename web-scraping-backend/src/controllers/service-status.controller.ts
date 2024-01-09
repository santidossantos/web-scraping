import {get, param} from '@loopback/rest';

export class ServiceStatusController {
  constructor() {}

  @get('/ping/{url}', {
    responses: {
      '200': {
        description: 'Ping Service to check external site status',
        content: {
          'application/json': {
            schema: {type: 'boolean'},
          },
        },
      },
      '500': {
        description: 'Invalid URL',
        content: {
          'application/json': {
            schema: {type: 'string', example: 'http://example.com'},
          },
        },
      },
    },
  })
  async checkDomainStatus(@param.path.string('url') url: string): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      const http = require('http');
      url = url.replace(/^(http|https):\/\//, '');
      const protocolUrl = 'http://' + url;
      http
        .get(protocolUrl, () => {
          resolve(true);
        })
        .on('error', () => {
          resolve(false);
        });
    });
  }
}
