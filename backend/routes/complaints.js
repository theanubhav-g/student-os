const express = require('express');
const router = express.Router();
const fileHandler = require('../utils/fileHandler');
const { v4: uuidv4 } = require('uuid');

// Submit a complaint (Student)
router.post('/', (req, res) => {
  const { studentId, studentName, category, title, description } = req.body;
  
  const complaint = {
    id: uuidv4(),
    studentId,
    studentName,
    category, // 'infrastructure', 'faculty', 'ragging', 'other'
    title,
    description,
    status: 'pending', // pending, in-review, resolved, rejected
    resolution: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  fileHandler.appendData('complaints.json', complaint);
  res.json({ success: true, data: complaint });
});

// Get student's own complaints
router.get('/student/:studentId', (req, res) => {
  const complaints = fileHandler.readData('complaints.json');
  const studentComplaints = complaints.filter(c => c.studentId === req.params.studentId);
  res.json({ success: true, data: studentComplaints.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) });
});

module.exports = router;