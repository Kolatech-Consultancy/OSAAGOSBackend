import Event_Model from '../models/event.model.js';
// const Event = require('../models/event.model');
// const auth = require('../middleware/auth');

export default class eventController {
  static async createEvents(req, res) {
    const { title, description, date, location, organizer } = req.body;
    console.log(4, title, description);
    try {
      const newEvent = await Event_Model.create({ title, description, date, location, organizer });
      // await newEvent.save();
      res.status(200).json({ status: 'Event created Successfully!' });
    } catch (error) {
      res.status(500).json({ error: 'Error creating event' + error });
    }
  }

  static async getAllEvents(req, res) {
    console.log('Event getall');
    try {
      const allEvents = await Event_Model.find({});

      if (!allEvents || allEvents.length === 0) {
        return res.status(490).json({
          message: 'There is no Events',
        });
      }
      res.status(201).json({
        data: allEvents,
      });
    } catch (error) {
      res.status(500).json({
        error: error,
      });
    }
  }

  static async getSingleEvent(req, res) {
    console.log('Event getSingleEvent');

    try {
      const { eventId } = req.params.eventId;
      const event = await Event_Model.findOne({ _id: '66a7c467fec13b11071918fe' });
      console.log(3, event.length);

      if (!event) {
        return res.status(490).json({
          message: 'Event Not Found',
        });
      }
      res.status(201).json({
        message: 'Event Found!',
        data: event,
      });
    } catch (error) {
      res.status(500).json({
        error: error,
      });
    }
  }
}
// router.post('/create', async (req, res) => {

// });
