import express from "express";
import { translateToUrdu } from "../services/translationService.js";

const router = express.Router();

// Translation endpoint
router.post('/translate-to-urdu', async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({
        error: 'Content is required for translation'
      });
    }

    // Translate the content to Urdu using the service
    const translatedContent = await translateToUrdu(content);

    res.json({
      originalContent: content,
      translatedContent: translatedContent
    });
  } catch (error) {
    console.error('Translation error:', error);
    res.status(500).json({
      error: 'Translation failed',
      message: error.message
    });
  }
});

export default router;