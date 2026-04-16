// ============ TIMETABLE ROUTES ============

// Get timetable
router.get('/timetable', (req, res) => {
  const timetable = fileHandler.readData('timetable.json');
  res.json({ success: true, data: timetable });
});

// Update timetable (Admin only)
router.put('/timetable', (req, res) => {
  const { schedule } = req.body;
  const timetable = {
    lastUpdated: new Date().toISOString(),
    schedule: schedule
  };
  fileHandler.writeData('timetable.json', timetable);
  res.json({ success: true, data: timetable, message: 'Timetable updated successfully!' });
});

// Add single class to timetable
router.post('/timetable/class', (req, res) => {
  const { day, time, subject, teacher, room, branch, year } = req.body;
  const timetable = fileHandler.readData('timetable.json');
  
  const newClass = {
    day,
    time,
    subject,
    teacher,
    room,
    branch,
    year
  };
  
  timetable.schedule.push(newClass);
  timetable.lastUpdated = new Date().toISOString();
  
  fileHandler.writeData('timetable.json', timetable);
  res.json({ success: true, data: timetable, message: 'Class added successfully!' });
});

// Delete class from timetable
router.delete('/timetable/class/:index', (req, res) => {
  const index = parseInt(req.params.index);
  const timetable = fileHandler.readData('timetable.json');
  
  if (index >= 0 && index < timetable.schedule.length) {
    timetable.schedule.splice(index, 1);
    timetable.lastUpdated = new Date().toISOString();
    fileHandler.writeData('timetable.json', timetable);
    res.json({ success: true, data: timetable, message: 'Class removed successfully!' });
  } else {
    res.status(404).json({ success: false, message: 'Class not found' });
  }
});