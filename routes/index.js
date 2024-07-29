import Router from 'express';
import eventrouter from './eventsroutes.js';
const router = Router();
router.use('/events', eventrouter);
export default router;
