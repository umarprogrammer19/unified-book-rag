import express from "express";
import { translateToUrdu } from "../services/translationService.js";
import fs from "fs/promises";
import path from "path";

const router = express.Router();

// Translation endpoint for raw text
router.post('/translate', async (req, res) => {
  try {
    const { text, source_language = "en", target_language = "ur", preserve_formatting = true, preserve_code = true } = req.body;

    if (!text) {
      return res.status(400).json({
        error: "TRANSLATION_ERROR",
        message: "Text is required for translation"
      });
    }

    if (target_language !== "ur") {
      return res.status(400).json({
        error: "TRANSLATION_ERROR",
        message: "Currently only Urdu translation is supported"
      });
    }

    const startTime = Date.now();

    // Translate the content to Urdu using the service
    const translatedText = await translateToUrdu(text);
    const processingTime = Date.now() - startTime;

    res.json({
      translated_text: translatedText,
      source_language: source_language,
      target_language: target_language,
      processing_time: processingTime,
      success: true,
      error_message: null
    });
  } catch (error) {
    console.error('Translation error:', error);
    res.status(500).json({
      translated_text: null,
      source_language: req.body.source_language || "en",
      target_language: req.body.target_language || "ur",
      processing_time: null,
      success: false,
      error_message: error.message
    });
  }
});

// Translation endpoint for book chapters
router.post('/translate/chapter', async (req, res) => {
  try {
    const { chapter_path, target_language = "ur" } = req.body;

    if (!chapter_path) {
      return res.status(400).json({
        error: "CHAPTER_TRANSLATION_ERROR",
        message: "Chapter path is required for translation"
      });
    }

    if (target_language !== "ur") {
      return res.status(400).json({
        error: "CHAPTER_TRANSLATION_ERROR",
        message: "Currently only Urdu translation is supported"
      });
    }

    // Construct the full path to the chapter file
    const fullPath = path.join(process.cwd(), 'book_source', 'docs', chapter_path);

    // Check if the file exists and read its content
    let content;
    try {
      content = await fs.readFile(fullPath, 'utf8');
    } catch (readError) {
      return res.status(400).json({
        error: "CHAPTER_TRANSLATION_ERROR",
        message: `Chapter file not found: ${chapter_path}`
      });
    }

    const startTime = Date.now();

    // Translate the content to Urdu using the service
    const translatedText = await translateToUrdu(content);
    const processingTime = Date.now() - startTime;

    res.json({
      translated_text: translatedText,
      source_language: "en",
      target_language: target_language,
      processing_time: processingTime,
      success: true,
      error_message: null
    });
  } catch (error) {
    console.error('Chapter translation error:', error);
    res.status(500).json({
      translated_text: null,
      source_language: "en",
      target_language: req.body.target_language || "ur",
      processing_time: null,
      success: false,
      error_message: error.message
    });
  }
});

export default router;