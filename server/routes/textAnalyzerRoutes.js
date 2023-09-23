const express = require('express');
const multer = require('multer');
const router = express.Router();
const { analyzeAndSaveText } = require('../controllers/textAnalyzerController');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Handle file upload
router.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const text = req.file.buffer.toString();

  if (!text.trim()) {
    return res.status(400).json({ error: 'Uploaded file is empty or contains no words' });
  }

  try {
    const analyzedText = await analyzeAndSaveText(text);
    res.json(analyzedText);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
