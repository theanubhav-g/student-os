const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

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

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/notices', noticeRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/scores', scoreRoutes);
app.use('/api/opportunities', opportunityRoutes);
app.use('/api/directory', directoryRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/events', eventRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});