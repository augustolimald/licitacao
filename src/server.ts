import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import exphbs from 'express-handlebars';

import routes from './routes';
import { resolve } from 'path';
import database from './database';

const server = express();

server.use(cors());
server.engine('hbs', exphbs({ defaultLayout: 'default', extname: '.hbs' }));
server.set('views', resolve(__dirname, 'views'));
server.set('view engine', 'hbs');

server.use(express.json());
server.use(routes);

database.connect().then(() => {
	server.listen(process.env.PORT);
}).catch(() => {
	console.log('Server did not start, because database is off');
	process.exit(0);
});
