const express = require('express');
const router = express.Router();
const fileHandler = require('../utils/fileHandler');
const { v4: uuidv4 } = require('uuid');

const initializeEvents = () => {
  const events = fileHandler.readData('events.json');
  if (events.length === 0) {
    const defaultEvents = [
      {
        id: uuidv4(),
        title: 'Tech Talk: Future of AI',
        club: 'Computer Science Club',
        description: 'Industry expert discussing AI trends',
        date: '2025-02-20',
        time: '3:00 PM',
        venue: 'Room 101',
        registrations: []
      },
      {
        id: uuidv4(),
        title: 'Hackathon Kickoff',
        club: 'Coding Club',
        description: 'Opening ceremony for annual hackathon',
        date: '2025-02-25',
        time: '10:00 AM',
        venue: 'Auditorium',
        registrations: []
      }
    ];
    fileHandler.writeData('events.json', defaultEvents);
  }
};

initializeEvents();

router.get('/', (req, res) => {
  const events = fileHandler.readData('events.json');
  res.json({ success: true, data: events });
});

router.post('/', (req, res) => {
  const event = {
    id: uuidv4(),
    ...req.body,
    registrations: [],
    createdAt: new Date().toISOString()
  };
  fileHandler.appendData('events.json', event);
  res.json({ success: true, data: event });
});

router.post('/:id/rsvp', (req, res) => {
  const { studentId, studentName } = req.body;
  const events = fileHandler.readData('events.json');
  const eventIndex = events.findIndex(e => e.id === req.params.id);
  
  if (eventIndex !== -1) {
    if (!events[eventIndex].registrations.some(r => r.studentId === studentId)) {
      events[eventIndex].registrations.push({ studentId, studentName, rsvpDate: new Date().toISOString() });
      fileHandler.writeData('events.json', events);
      res.json({ success: true, message: 'RSVP successful' });
    } else {
      res.json({ success: false, message: 'Already registered' });
    }
  } else {
    res.status(404).json({ success: false, message: 'Event not found' });
  }
});

module.exports = router;