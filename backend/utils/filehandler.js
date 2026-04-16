const fs = require('fs');
const path = require('path');

class FileHandler {
  constructor() {
    this.dataPath = path.join(__dirname, '../data');
    this.ensureDataDirectory();
  }

  ensureDataDirectory() {
    if (!fs.existsSync(this.dataPath)) {
      fs.mkdirSync(this.dataPath, { recursive: true });
    }
  }

  readData(filename) {
    try {
      const filePath = path.join(this.dataPath, filename);
      if (!fs.existsSync(filePath)) {
        return [];
      }
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error(`Error reading ${filename}:`, error);
      return [];
    }
  }

  writeData(filename, data) {
    try {
      const filePath = path.join(this.dataPath, filename);
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      return true;
    } catch (error) {
      console.error(`Error writing ${filename}:`, error);
      return false;
    }
  }

  appendData(filename, newItem) {
    const existingData = this.readData(filename);
    existingData.push(newItem);
    return this.writeData(filename, existingData);
  }

  updateData(filename, id, updates) {
    const data = this.readData(filename);
    const index = data.findIndex(item => item.id === id);
    if (index !== -1) {
      data[index] = { ...data[index], ...updates };
      return this.writeData(filename, data);
    }
    return false;
  }

  deleteData(filename, id) {
    const data = this.readData(filename);
    const filtered = data.filter(item => item.id !== id);
    return this.writeData(filename, filtered);
  }
}

module.exports = new FileHandler();