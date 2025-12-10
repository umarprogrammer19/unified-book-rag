import express from "express";

const router = express.Router();

// Translation API endpoints have been removed.
// Translation now happens during build time via the translate-build.js script.
// Translated content is stored in book_source/src/data/urduTranslations.json
// and loaded by the frontend directly.

// Return a message indicating the API is no longer available
router.post('/translate', (req, res) => {
  res.status(404).json({
    error: "TRANSLATION_API_DEPRECATED",
    message: "Translation API is no longer available. Use build-time translations instead."
  });
});

router.post('/translate/chapter', (req, res) => {
  res.status(404).json({
    error: "TRANSLATION_API_DEPRECATED",
    message: "Translation API is no longer available. Use build-time translations instead."
  });
});

export default router;