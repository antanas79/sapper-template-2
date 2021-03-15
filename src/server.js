import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import { i18nMiddleware } from './i18n.js';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';


// const url = dev ? '/' : 'sapper-template-2'; 
const url = 'sapper-template-2'; 

polka() // You can also use Express
	.use(
		url,
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		i18nMiddleware(),
		sapper.middleware()
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
