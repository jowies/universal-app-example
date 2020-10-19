import Koa from 'koa';
import Router from '@koa/router';
import cors from '@koa/cors';
import parser from 'koa-bodyparser';
import { initialLoad } from './initialLoad';

const app = new Koa();
const router = new Router();

app.use(parser());
app.use(cors({ origin: '*' }));

router.get('/', initialLoad);

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
console.log('Listening on port 3000');
