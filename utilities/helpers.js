import { reviews } from '../data/reviews.js';

export const getAvgRating = (gameId) => {
	const gameReviews = reviews.filter((rev) => rev.gameId === gameId);

	if (!gameReviews.length) return null;

	const total = gameReviews.reduce((acc, curr) => acc + curr.rating, 0);
	return (total / gameReviews.length).toFixed(1);
};
