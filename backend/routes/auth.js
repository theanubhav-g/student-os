const express = require('express');
const router = express.Router();
const fileHandler = require('../utils/fileHandler');
const { v4: uuidv4 } = require('uuid');

const initializeUsers = () => {
  const users = fileHandler.readData('users.json');
  if (users.length === 0) {
    const defaultUsers = [
      {
        id: uuidv4(),
        email: 'student@studentos.com',
        password: 'student123',
        role: 'student',
        name: 'John Student',
        studentId: 'STU001'
      },
      {
        id: uuidv4(),
        email: 'teacher@studentos.com',
        password: 'teacher123',
        role: 'teacher',
        name: 'Prof. Smith',
        teacherId: 'TCH001'
      }
    ];
    fileHandler.writeData('users.json', defaultUsers);
  }
};

initializeUsers();

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const users = fileHandler.readData('users.json');
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    const { password, ...userWithoutPassword } = user;
    res.json({ success: true, user: userWithoutPassword });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

router.post('/logout', (req, res) => {
  res.json({ success: true, message: 'Logged out successfully' });
});

module.exports = router;