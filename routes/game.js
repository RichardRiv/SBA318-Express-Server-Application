import express from 'express';

// Utilities
import { error } from '../utilities/error.js';
import { getGamesData } from '../utilities/helpers.js';

const router = express.Router();

router
	.route('/:id')
	.get((req, res, next) => {
		const gameId = Number(req.params.id);
		const gameData = getGamesData();
		const game = gameData.find((g) => g.id === gameId);

		res.render('game.ejs', { game });
	})
	.patch((req, res) => {
		// TODO: Finish Patch Then Do Delete
		res.json(req.body);
	});

router.route('/:id/edit').get((req, res, next) => {
	const gameId = Number(req.params.id);
	const gameData = getGamesData();
	const game = gameData.find((g) => g.id === gameId);

	res.render('gameEdit.ejs', { game });
});

export default router;
