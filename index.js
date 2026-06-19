import express from 'express';
import { error } from './utilities/error.js';

const app = express();
const port = 3000;

// Parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

const apiKey = 'sba-318';
app.use('/api', (req, res, next) => {
	const key = req.query['api-key'];

	if (!key) return next(error(400, 'API Key Required'));
	if (key !== apiKey) return next(error(400, 'Invalid API Key'));

	next();
});

app.get('/api', (req, res) => {
	res.json('Works');
});

app.use((err, req, res, next) => {
	res.status(err.status || 500);
	res.json({ error: err.message });
});

app.listen(port, () => {
	console.log(`Server listening on port: ${port}.`);
});
