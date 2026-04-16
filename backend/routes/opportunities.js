const express = require('express');
const router = express.Router();
const fileHandler = require('../utils/fileHandler');
const { v4: uuidv4 } = require('uuid');

const initializeOpportunities = () => {
  const opportunities = fileHandler.readData('opportunities.json');
  if (opportunities.length === 0) {
    const defaultOpportunities = [
      {
        id: uuidv4(),
        title: 'Google Summer of Code 2025',
        type: 'internship',
        description: 'Remote internship program for student developers',
        deadline: '2025-03-15',
        company: 'Google',
        link: 'https://summerofcode.withgoogle.com'
      },
      {
        id: uuidv4(),
        title: 'National Hackathon 2025',
        type: 'hackathon',
        description: '48-hour coding competition with $10,000 prize',
        deadline: '2025-02-28',
        organizer: 'TechFest',
        link: 'https://example.com/hackathon'
      },
      {
        id: uuidv4(),
        title: 'AI Research Internship',
        type: 'internship',
        description: 'Summer research position in machine learning',
        deadline: '2025-03-01',
        company: 'AI Research Lab',
        link: 'https://example.com/ai-intern'
      }
    ];
    fileHandler.writeData('opportunities.json', defaultOpportunities);
  }
};

initializeOpportunities();

router.get('/', (req, res) => {
  const opportunities = fileHandler.readData('opportunities.json');
  res.json({ success: true, data: opportunities });
});

router.post('/', (req, res) => {
  const opportunity = {
    id: uuidv4(),
    ...req.body,
    createdAt: new Date().toISOString()
  };
  fileHandler.appendData('opportunities.json', opportunity);
  res.json({ success: true, data: opportunity });
});

module.exports = router;