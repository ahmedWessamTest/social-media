import { useState } from "react";
import DOMPurify from "dompurify";

export default function useTextValidation(errorMessage) {
  const [error, setError] = useState("");

  const validateAndSanitize = (text) => {
    setError("");

    if (!text.trim()) {
      setError(errorMessage || "Text cannot be empty");
      return null;
    }

    return DOMPurify.sanitize(text, {
      ALLOWED_TAGS: [],
      ALLOWED_ATTR: [],
    });
  };

  return { error, setError, validateAndSanitize };
}
