import Router from 'express';
import eventController from '../controllers/event.controller.js';

const eventrouter = Router();

eventrouter.post('/', eventController.createEvents);
eventrouter.get('/:eventId', eventController.getSingleEvent);
// eventrouter.get('/', eventController.getAllEvents);
export default eventrouter;
