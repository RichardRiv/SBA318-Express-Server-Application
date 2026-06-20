import { games } from '../data/games.js';
import { developers } from '../data/developers.js';
import { reviews } from '../data/reviews.js';

export const getGamesData = () => {
	return games.map((game) => ({
		...game,
		developer: developers.find((dev) => dev.id === game.developerId),
		rating: getAvgRating(game.id),
		reviews: reviews.filter((rev) => rev.gameId === game.id),
	}));
};

const getAvgRating = (gameId) => {
	const gameReviews = reviews.filter((rev) => rev.gameId === gameId);

	if (!gameReviews.length) return null;

	const total = gameReviews.reduce((acc, curr) => acc + curr.rating, 0);
	return (total / gameReviews.length).toFixed(1);
};
