export function validateImage(file, maxSize) {
  if (!file) return "No file selected";

  if (!file.type.startsWith("image/")) return "Please select an image file";

  if (file.size > maxSize) {
    return `File size must be less than ${maxSize / (1024 * 1024)}MB`;
  }
}
