const express = require('express');
const router = express.Router();
const fileHandler = require('../utils/fileHandler');

router.get('/:studentId/dashboard', (req, res) => {
  const { studentId } = req.params;
  
  const attendance = fileHandler.readData('attendance.json');
  const studentAttendance = attendance.find(a => a.studentId === studentId);
  
  const scores = fileHandler.readData('scores.json');
  const studentScores = scores.find(s => s.studentId === studentId);
  
  const notices = fileHandler.readData('notices.json');
  const recentNotices = notices.slice(-5).reverse();
  
  res.json({
    success: true,
    data: {
      attendance: studentAttendance || { percentage: 85, status: 'Good' },
      scores: studentScores || { minor1: 75, minor2: 80 },
      recentNotices
    }
  });
});

router.get('/:studentId/profile', (req, res) => {
  const students = fileHandler.readData('students.json');
  let student = students.find(s => s.id === req.params.studentId);
  
  if (!student) {
    student = {
      id: req.params.studentId,
      name: 'John Student',
      email: 'student@studentos.com',
      skills: ['JavaScript', 'React', 'Node.js', 'Python'],
      achievements: ['Hackathon Winner 2024', 'Best Project Award'],
      bio: 'Computer Science student passionate about full-stack development.',
      year: '2nd Year',
      major: 'Computer Science'
    };
  }
  
  res.json({ success: true, data: student });
});

router.put('/:studentId/profile', (req, res) => {
  const students = fileHandler.readData('students.json');
  const index = students.findIndex(s => s.id === req.params.studentId);
  
  if (index !== -1) {
    students[index] = { ...students[index], ...req.body };
    fileHandler.writeData('students.json', students);
    res.json({ success: true, data: students[index] });
  } else {
    const newStudent = { id: req.params.studentId, ...req.body };
    fileHandler.appendData('students.json', newStudent);
    res.json({ success: true, data: newStudent });
  }
});

module.exports = router;