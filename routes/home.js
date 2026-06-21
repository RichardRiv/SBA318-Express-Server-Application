import express from 'express';

// Utilities
import { error } from '../utilities/error.js';
import { getGamesData } from '../utilities/helpers.js';
import { games } from '../data/games.js';

const router = express.Router();

router.route('/').get((req, res, next) => {
	const { genre } = req.query;
	const genres = [...new Set(games.map((game) => game.genre))];
	let gamesData = getGamesData();

	if (genre) gamesData = gamesData.filter((games) => games.genre === genre);

	res.render('home.ejs', { gamesData, genres, selectedGenre: genre });
});

export default router;
