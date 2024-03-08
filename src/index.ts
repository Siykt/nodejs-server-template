import koa from 'koa';
import bodyParser from 'koa-bodyparser';
import mount from 'koa-mount';
import koaStatic from 'koa-static';
import path from 'path';
import 'reflect-metadata';
import logger from './common/logger';
import { ENV } from './constants/env';
import { setupRouter } from './services/router';

const app = new koa({ proxy: true });
app.on('error', (err) => {
  console.error(err);
});

async function bootstrap() {
  logger.info('Starting server...');

  app.use(mount('/files', koaStatic(path.resolve(__dirname, '../public'))));
  app.use(bodyParser());

  await setupRouter(app);

  app.listen({ port: ENV.APP_PORT }, () => {
    logger.info(`Server ready at ${ENV.APP_HOST}:${ENV.APP_PORT}`);
  });
}

bootstrap();
