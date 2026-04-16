const express = require('express');
const router = express.Router();
const fileHandler = require('../utils/fileHandler');

router.get('/', (req, res) => {
  const attendance = fileHandler.readData('attendance.json');
  res.json({ success: true, data: attendance });
});

router.get('/student/:studentId', (req, res) => {
  const attendance = fileHandler.readData('attendance.json');
  const studentAttendance = attendance.find(a => a.studentId === req.params.studentId);
  res.json({ success: true, data: studentAttendance });
});

router.put('/:studentId', (req, res) => {
  const { percentage } = req.body;
  const attendance = fileHandler.readData('attendance.json');
  const index = attendance.findIndex(a => a.studentId === req.params.studentId);
  
  if (index !== -1) {
    attendance[index] = { ...attendance[index], percentage, updatedAt: new Date().toISOString() };
    fileHandler.writeData('attendance.json', attendance);
    res.json({ success: true, data: attendance[index] });
  } else {
    const newAttendance = {
      studentId: req.params.studentId,
      percentage,
      updatedAt: new Date().toISOString()
    };
    fileHandler.appendData('attendance.json', newAttendance);
    res.json({ success: true, data: newAttendance });
  }
});

module.exports = router;