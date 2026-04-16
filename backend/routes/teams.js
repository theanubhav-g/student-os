const express = require('express');
const router = express.Router();
const fileHandler = require('../utils/fileHandler');
const { v4: uuidv4 } = require('uuid');

const initializeTeams = () => {
  const teams = fileHandler.readData('teams.json');
  if (teams.length === 0) {
    const defaultTeams = [
      {
        id: uuidv4(),
        title: 'Looking for teammates for AI Hackathon',
        description: 'Need 2 more members with ML experience',
        skillsNeeded: ['Machine Learning', 'Python', 'TensorFlow'],
        postedBy: 'John Student',
        contact: 'john@university.edu',
        createdAt: new Date().toISOString()
      },
      {
        id: uuidv4(),
        title: 'Web Dev Project Team',
        description: 'Building a full-stack application, need frontend dev',
        skillsNeeded: ['React', 'Tailwind', 'API Integration'],
        postedBy: 'Sarah Chen',
        contact: 'sarah@university.edu',
        createdAt: new Date().toISOString()
      }
    ];
    fileHandler.writeData('teams.json', defaultTeams);
  }
};

initializeTeams();

router.get('/', (req, res) => {
  const teams = fileHandler.readData('teams.json');
  res.json({ success: true, data: teams.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) });
});

router.post('/', (req, res) => {
  const team = {
    id: uuidv4(),
    ...req.body,
    createdAt: new Date().toISOString()
  };
  fileHandler.appendData('teams.json', team);
  res.json({ success: true, data: team });
});

router.delete('/:id', (req, res) => {
  const success = fileHandler.deleteData('teams.json', req.params.id);
  res.json({ success });
});

module.exports = router;