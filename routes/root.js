import express from 'express';

const router = express.Router();

router.route('/').get((req, res, next) => {
	res.json('Make sure you insert /api');
});

router.route('/api').get((req, res, next) => {
	res.json(`Insert /home before the api key if you made it this far lol!`);
});

export default router;
