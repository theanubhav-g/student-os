const express = require('express');
const router = express.Router();
const fileHandler = require('../utils/fileHandler');

router.get('/:teacherId/dashboard', (req, res) => {
  const students = fileHandler.readData('students.json');
  const notices = fileHandler.readData('notices.json');
  const teacherNotices = notices.filter(n => n.teacherId === req.params.teacherId);
  
  res.json({
    success: true,
    data: {
      totalStudents: students.length,
      recentUploads: teacherNotices.slice(-5).length,
      activeNotices: teacherNotices.filter(n => new Date(n.deadline) > new Date()).length
    }
  });
});

module.exports = router;