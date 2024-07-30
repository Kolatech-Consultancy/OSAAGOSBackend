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
    try {
      const eventId = req.params.eventId;
      // console.log(2, eventId);
      const event = await Event_Model.findOne({ _id: eventId });
      console.log(4, event);
      if (!event || event.length === 0) {
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

  static async updateEvent(req, res) {
    console.log('Updated' + req.params.eventId);

    try {
      const eventId = req.params.eventId;
      const updates = req.body;
      const updatedEvent = await Event_Model.findByIdAndUpdate({ _id: eventId }, updates, {
        new: true, // return the updated document
        runValidators: true, // validate before update
      });

      if (!updatedEvent) {
        return res.status(404).send({ message: 'Event not found' });
      }
      return res.status(201).json({
        message: 'Events updated successfully!!',
        data: updatedEvent,
      });
      // res.send(updatedEvent);
    } catch (err) {
      res.status(500).send({ message: 'Error updating event', error: err });
    }
  }

  static async deleteEvent(req, res) {
    console.log('Updated' + req.params.eventId);

    try {
      const eventId = req.params.eventId;
      const deletedEvent = await Event_Model.findByIdAndDelete(eventId);

      if (!deletedEvent) {
        return res.status(404).send({ message: 'Event not found' });
      }

      res.send({ message: 'Event deleted successfully', event: deletedEvent });
      // res.send(updatedEvent);
    } catch (err) {
      res.status(500).send({ message: 'Error updating event', error: err });
    }
  }
}
// router.post('/create', async (req, res) => {

// });
