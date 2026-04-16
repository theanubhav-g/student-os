const express = require('express');
const router = express.Router();
const fileHandler = require('../utils/fileHandler');

// Get timetable (for students and teachers)
router.get('/', (req, res) => {
  const timetable = fileHandler.readData('timetable.json');
  res.json({ success: true, data: timetable });
});

// Get timetable by branch and year
router.get('/filter', (req, res) => {
  const { branch, year } = req.query;
  const timetable = fileHandler.readData('timetable.json');
  
  let filteredSchedule = timetable.schedule;
  
  if (branch && branch !== 'all') {
    filteredSchedule = filteredSchedule.filter(c => c.branch === branch);
  }
  if (year && year !== 'all') {
    filteredSchedule = filteredSchedule.filter(c => c.year === year);
  }
  
  res.json({ 
    success: true, 
    data: {
      ...timetable,
      schedule: filteredSchedule
    }
  });
});

module.exports = router;