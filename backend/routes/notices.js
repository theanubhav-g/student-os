const express = require('express');
const router = express.Router();
const fileHandler = require('../utils/fileHandler');
const { v4: uuidv4 } = require('uuid');

router.get('/', (req, res) => {
  const notices = fileHandler.readData('notices.json');
  res.json({ success: true, data: notices.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) });
});

router.get('/:id', (req, res) => {
  const notices = fileHandler.readData('notices.json');
  const notice = notices.find(n => n.id === req.params.id);
  res.json({ success: true, data: notice });
});

router.post('/', (req, res) => {
  const notice = {
    id: uuidv4(),
    ...req.body,
    createdAt: new Date().toISOString()
  };
  fileHandler.appendData('notices.json', notice);
  res.json({ success: true, data: notice });
});

router.put('/:id', (req, res) => {
  const success = fileHandler.updateData('notices.json', req.params.id, req.body);
  res.json({ success });
});

router.delete('/:id', (req, res) => {
  const success = fileHandler.deleteData('notices.json', req.params.id);
  res.json({ success });
});

module.exports = router;