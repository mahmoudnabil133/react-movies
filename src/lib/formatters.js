export function formatRuntime(minutes) {
  if (!minutes) return "N/A";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h ? `${h}h ${m}m` : `${m}m`;
}

export function formatRating(vote) {
  return vote ? vote.toFixed(1) : "N/A";
}

export function formatVoteCount(count) {
  if (!count) return "0";
  if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
  return count.toString();
}

export function formatYear(dateStr) {
  if (!dateStr) return "N/A";
  return new Date(dateStr).getFullYear();
}

export function getImageUrl(path, size = "w500") {
  if (!path) return "/placeholder-poster.svg";
  return `https://image.tmdb.org/t/p/${size}${path}`;
}

export function truncateText(text, maxLength = 200) {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "…";
}
