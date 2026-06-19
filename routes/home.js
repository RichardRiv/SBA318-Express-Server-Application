import express from 'express';
import { error } from '../utilities/error.js';

const router = express.Router();

router.route('/').get((req, res, next) => {
	res.render('home.ejs');
});

export default router;
