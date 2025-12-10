// Translation service has been moved to build time.
// See scripts/translate-build.js for the build-time translation implementation.
// Runtime translation is no longer needed as translations are pre-built.

export const translateToUrdu = async (text) => {
  throw new Error("Runtime translation is no longer supported. Use build-time translations instead.");
};