import express from 'express';

// Utilities
import { error } from '../utilities/error.js';
import { getAvgRating } from '../utilities/helpers.js';

// Data
import { games } from '../data/games.js';
import { developers } from '../data/developers.js';
import { reviews } from '../data/reviews.js';

const router = express.Router();

router.route('/').get((req, res, next) => {
	let data = games.map((game) => ({
		...game,
		developer: developers.find((d) => d.id === game.developerId),
		rating: getAvgRating(game.id),
	}));

	console.log(data);

	res.render('home.ejs');
});

export default router;
