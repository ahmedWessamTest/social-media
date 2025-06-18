export const getTime = (date) => {
  const past = new Date(date);
  const now = new Date();
  const diff = now - past;
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (diffDays >= 365) {
    const years = Math.floor(diffDays / 365);
    return `${years} year${years > 1 ? "s" : ""}`;
  } else if (diffDays >= 30) {
    const months = Math.floor(diffDays / 30);
    return `${months} month${months > 1 ? "s" : ""}`;
  } else if (diffDays >= 1) {
    return `${diffDays} day${diffDays > 1 ? "s" : ""}`;
  } else {
    return `Less than 1 day`;
  }
};
