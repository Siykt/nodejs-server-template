import Router from 'koa-router';
import { ENV } from '../constants/env';

export const router = new Router();

router.get('/health', (ctx) => {
  ctx.body = `${ENV.APP_HOST}:${ENV.APP_PORT} is healthy`;
});
