import express from 'express';

// Utilities
import { error } from '../utilities/error.js';
import { getGamesData } from '../utilities/helpers.js';

// Data
import { games } from '../data/games.js';
import { developers } from '../data/developers.js';

const router = express.Router();

router
	.route('/add')
	.get((req, res, next) => {
		res.render('gameAdd.ejs', { developers });
	})
	.post((req, res) => {
		const { title, genre, developerId } = req.body;

		const newGame = {
			id: games[games.length - 1]?.id + 1,
			title,
			genre,
			developerId: Number(developerId),
		};

		games.push(newGame);
		res.redirect('/home');
	});

router
	.route('/:id')
	.get((req, res, next) => {
		const gameId = Number(req.params.id);
		const gameData = getGamesData();
		const game = gameData.find((g) => g.id === gameId);

		res.render('game.ejs', { game });
	})
	.patch((req, res) => {
		const { title, name, genre } = req.body;
		const gameId = Number(req.params.id);

		const game = games.find((g) => g.id === gameId);
		Object.assign(game, { title }, { genre });

		const developer = developers.find((dev) => dev.id === game.developerId);
		Object.assign(developer, { name });

		res.redirect('/home');
	})
	.delete((req, res) => {
		const gameId = Number(req.params.id);
		games.find((g, i) => {
			if (g.id === gameId) {
				games.splice(i, 1);
				return true;
			}
		});

		res.redirect('/home');
	});

router.route('/:id/edit').get((req, res, next) => {
	const gameId = Number(req.params.id);
	const gameData = getGamesData();
	const game = gameData.find((g) => g.id === gameId);

	res.render('gameEdit.ejs', { game });
});

export default router;
