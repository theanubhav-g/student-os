const express = require('express');
const router = express.Router();
const fileHandler = require('../utils/fileHandler');

router.get('/', (req, res) => {
  const scores = fileHandler.readData('scores.json');
  res.json({ success: true, data: scores });
});

router.get('/student/:studentId', (req, res) => {
  const scores = fileHandler.readData('scores.json');
  const studentScores = scores.find(s => s.studentId === req.params.studentId);
  res.json({ success: true, data: studentScores });
});

router.put('/:studentId', (req, res) => {
  const { minor1, minor2 } = req.body;
  const scores = fileHandler.readData('scores.json');
  const index = scores.findIndex(s => s.studentId === req.params.studentId);
  
  if (index !== -1) {
    scores[index] = { ...scores[index], minor1, minor2, updatedAt: new Date().toISOString() };
    fileHandler.writeData('scores.json', scores);
    res.json({ success: true, data: scores[index] });
  } else {
    const newScores = {
      studentId: req.params.studentId,
      minor1,
      minor2,
      updatedAt: new Date().toISOString()
    };
    fileHandler.appendData('scores.json', newScores);
    res.json({ success: true, data: newScores });
  }
});

module.exports = router;