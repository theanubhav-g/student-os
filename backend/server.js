const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Import all route files
const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/students');
const teacherRoutes = require('./routes/teachers');
const noticeRoutes = require('./routes/notices');
const attendanceRoutes = require('./routes/attendance');
const scoreRoutes = require('./routes/scores');
const opportunityRoutes = require('./routes/opportunities');
const directoryRoutes = require('./routes/directory');
const teamRoutes = require('./routes/teams');
const eventRoutes = require('./routes/events');
const adminRoutes = require('./routes/admin');
const complaintRoutes = require('./routes/complaints');
const timetableRoutes = require('./routes/timetable');  // ← NEW: Timetable routes

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API Routes
app.use('/api/auth', authRoutes);                 // Authentication
app.use('/api/students', studentRoutes);          // Student operations
app.use('/api/teachers', teacherRoutes);          // Teacher operations
app.use('/api/notices', noticeRoutes);            // Notices/Assignments
app.use('/api/attendance', attendanceRoutes);     // Attendance management
app.use('/api/scores', scoreRoutes);              // Score management
app.use('/api/opportunities', opportunityRoutes); // Opportunities feed
app.use('/api/directory', directoryRoutes);       // Student directory
app.use('/api/teams', teamRoutes);                // Team formation
app.use('/api/events', eventRoutes);              // Events/Notices
app.use('/api/admin', adminRoutes);               // Admin panel
app.use('/api/complaints', complaintRoutes);      // Complaint system
app.use('/api/timetable', timetableRoutes);       // ← NEW: Timetable system

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📋 API endpoints available at http://localhost:${PORT}/api`);
  console.log(`📅 Timetable API at http://localhost:${PORT}/api/timetable`);
});