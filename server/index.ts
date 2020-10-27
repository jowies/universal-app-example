import Koa, { DefaultState } from 'koa';
import Router from '@koa/router';
import cors from '@koa/cors';
import parser from 'koa-bodyparser';
import { mongoConnect } from './mongo';
import { initialLoad } from './createHTML';
import { MongoContext } from './types';
import { newContact } from './post';

const app = new Koa<DefaultState, MongoContext>();
const router = new Router();

app.use(parser());
app.use(cors({ origin: '*' }));
mongoConnect(app);

router.post('/api/contacts', newContact);
router.get('/(.*)', initialLoad);

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
console.log('Listening on port 3000');
