import {BootMixin} from '@loopback/boot';
import {ApplicationConfig, createBindingFromClass} from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {MySequence} from './sequence';
import {
  AuthenticationComponent,
  registerAuthenticationStrategy,
} from '@loopback/authentication';
import {
  JWTAuthenticationStrategy,
  JWTServiceProvider,
  KEY,
} from './authentication-strategies';
import {CronComponent} from '@loopback/cron';
import {DailyCronJob} from './utils/cron/daily-job';
import {WeeklyCronJob} from './utils/cron/weekly-job';

export {ApplicationConfig};

export class WebCrawlerApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up the base path for API requests
    this.basePath('/api');

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };

    // CRON JOB
    this.component(CronComponent);
    this.add(createBindingFromClass(DailyCronJob));
    this.add(createBindingFromClass(WeeklyCronJob));

    // JWT AUTH0
    this.component(AuthenticationComponent);
    this.service(JWTServiceProvider);

    // Register the Auth0 JWT authentication strategy
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    registerAuthenticationStrategy(this as any, JWTAuthenticationStrategy);
    this.configure(KEY).to({
      jwksUri:
        'https://dev-ya7i3kuqejimegtd.us.auth0.com/.well-known/jwks.json',
      audience: 'http://localhost:3000/api',
      issuer: 'https://dev-ya7i3kuqejimegtd.us.auth0.com/',
      algorithms: ['RS256'],
    });

    // Activate Token Placeholder in API Explorer
    this.api({
      openapi: '3.0.0',
      info: {title: 'package or prject name', version: '1.0'},
      paths: {},
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      servers: [{url: '/'}],
      security: [{bearerAuth: []}],
    });
  }
}
