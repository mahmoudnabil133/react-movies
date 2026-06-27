import { OL_COVER_BASE, COVER_SIZE_LARGE, COVER_SIZE_MEDIUM, COVER_SIZE_SMALL, PLACEHOLDER_COVER } from "./constants";

export function formatRating(rating) {
  if (!rating || rating === 0) return "N/A";
  return Number(rating).toFixed(1);
}

export function formatRatingCount(count) {
  if (!count) return "0";
  if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
  return count.toString();
}

export function formatYear(year) {
  return year || "N/A";
}

export function getCoverUrl(coverId, size = COVER_SIZE_MEDIUM) {
  if (!coverId && coverId !== 0) return PLACEHOLDER_COVER;
  return `${OL_COVER_BASE}/id/${coverId}-${size}.jpg`;
}

export function getOLIDCoverUrl(olid, size = COVER_SIZE_MEDIUM) {
  if (!olid) return PLACEHOLDER_COVER;
  return `${OL_COVER_BASE}/olid/${olid}-${size}.jpg`;
}

export function truncateText(text, maxLength = 200) {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "…";
}

export function getDescription(work) {
  if (!work?.description) return "";
  if (typeof work.description === "string") return work.description;
  if (work.description?.value) return work.description.value;
  return "";
}

export function formatPageCount(pages) {
  if (!pages) return null;
  return `${pages} pages`;
}

export function getWorkId(key) {
  if (!key) return "";
  return key.replace("/works/", "");
}
