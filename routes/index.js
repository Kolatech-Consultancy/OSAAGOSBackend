import Router from 'express';
import eventrouter from './eventsroutes.js';
import mediaroutes from './mediaroutes.js';
const router = Router();
router.use('/events', eventrouter);
router.use("/media", mediaroutes)
export default router;
