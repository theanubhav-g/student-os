const express = require('express');
const router = express.Router();
const fileHandler = require('../utils/fileHandler');
const { v4: uuidv4 } = require('uuid');

const initializeDirectory = () => {
  const directory = fileHandler.readData('directory.json');
  if (directory.length === 0) {
    const defaultDirectory = [
      {
        id: uuidv4(),
        name: 'Alice Johnson',
        email: 'alice@university.edu',
        skills: ['Python', 'Data Science', 'Machine Learning'],
        year: '3rd Year',
        major: 'Data Science',
        bio: 'Passionate about AI and data analytics'
      },
      {
        id: uuidv4(),
        name: 'Bob Williams',
        email: 'bob@university.edu',
        skills: ['UI/UX', 'Figma', 'React'],
        year: '2nd Year',
        major: 'Design',
        bio: 'Creative designer looking for collaborations'
      },
      {
        id: uuidv4(),
        name: 'Carol Davis',
        email: 'carol@university.edu',
        skills: ['Backend', 'Node.js', 'Database'],
        year: '4th Year',
        major: 'Computer Science',
        bio: 'Full-stack developer experienced in system design'
      }
    ];
    fileHandler.writeData('directory.json', defaultDirectory);
  }
};

initializeDirectory();

router.get('/', (req, res) => {
  const directory = fileHandler.readData('directory.json');
  res.json({ success: true, data: directory });
});

router.post('/', (req, res) => {
  const student = {
    id: uuidv4(),
    ...req.body,
    createdAt: new Date().toISOString()
  };
  fileHandler.appendData('directory.json', student);
  res.json({ success: true, data: student });
});

module.exports = router;