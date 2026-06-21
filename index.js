import express from 'express';
import methodOverride from 'method-override';
import { error } from './utilities/error.js';

import root from './routes/root.js';
import home from './routes/home.js';
import game from './routes/game.js';

const app = express();
const port = 3000;

// Setting EJS
app.set('view engine', 'ejs');

// Parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Logging Middlewaare
app.use((req, res, next) => {
	const time = new Date();

	console.log(
		`-----${time.toLocaleTimeString()}: Received a ${req.method} request to ${req.url}.`,
	);

	if (req.body && Object.keys(req.body).length > 0) {
		console.log('Containing the data:');
		console.log(`${JSON.stringify(req.body)}`);
	}

	next();
});

// TODO: Will need to replace apiKey middleware
// const apiKey = 'sba-318';
// app.use('/api', (req, res, next) => {
// 	const key = req.query['api-key'];

// 	if (!key) return next(error(400, 'API Key Required. Hint: sba-318'));
// 	if (key !== apiKey) return next(error(400, 'Invalid API Key. Hint: sba-318'));

// 	next();
// });

// Routes
app.use('/', root);
// app.use('/api/home', home);
app.use('/home', home);
app.use('/home/game', game);

app.use((err, req, res, next) => {
	res.status(err.status || 500);
	res.json({ error: err.message });
});

app.listen(port, () => {
	console.log(`Server listening on port: ${port}.`);
});
