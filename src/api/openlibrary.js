import { OL_BASE_URL, OL_COVER_BASE } from "../lib/constants";

const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000;

function getCacheKey(endpoint, params) {
  const sorted = Object.keys(params || {})
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join("&");
  return `${endpoint}?${sorted}`;
}

async function fetchOL(endpoint, params = {}) {
  const key = getCacheKey(endpoint, params);
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  const url = new URL(`${OL_BASE_URL}${endpoint}`);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") {
      url.searchParams.set(k, String(v));
    }
  });

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`OpenLibrary error: ${res.status}`);
  const data = await res.json();
  cache.set(key, { data, timestamp: Date.now() });
  return data;
}

export function searchBooks(query, { page = 1, limit = 20, sort, yearFrom, yearTo, subject } = {}) {
  const params = { q: query, page, limit };
  if (sort === "new") params.sort = "first_publish_year";
  else if (sort === "old") params.sort = "first_publish_year";
  else if (sort === "rating") params.sort = "ratings_average";
  if (subject) params.subject = subject;

  const fields = "key,title,author_name,first_publish_year,cover_i,isbn,ratings_average,ratings_count,number_of_pages_median,publisher,subject,edition_count,language";
  params.fields = fields;

  return fetchOL("/search.json", params).then((data) => {
    let docs = data.docs || [];
    if (yearFrom) {
      docs = docs.filter((d) => d.first_publish_year && d.first_publish_year >= Number(yearFrom));
    }
    if (yearTo) {
      docs = docs.filter((d) => d.first_publish_year && d.first_publish_year <= Number(yearTo));
    }
    if (sort === "new") {
      docs = docs.sort((a, b) => (b.first_publish_year || 0) - (a.first_publish_year || 0));
    }
    if (sort === "old") {
      docs = docs.sort((a, b) => (a.first_publish_year || 0) - (b.first_publish_year || 0));
    }
    if (sort === "rating") {
      docs = docs.sort((a, b) => (b.ratings_average || 0) - (a.ratings_average || 0));
    }
    return {
      docs,
      numFound: data.numFound,
      start: data.start || 0,
    };
  });
}

export function fetchBookDetails(id) {
  return fetchOL(`${id}.json`).then(async (work) => {
    const authorKeys = (work.authors || []).map((a) => a.author?.key).filter(Boolean);
    const authors = await Promise.all(
      authorKeys.map((key) =>
        fetchOL(`${key}.json`).catch(() => null)
      )
    );
    work._authors = authors.filter(Boolean);
    work._id = id;
    return work;
  });
}

export function fetchEditions(workId) {
  return fetchOL(`${workId}/editions.json`, { limit: 20 });
}

export function fetchBySubject(subject, { page = 1, limit = 20 } = {}) {
  return fetchOL(`/subjects/${encodeURIComponent(subject.toLowerCase())}.json`, {
    limit,
    offset: (page - 1) * limit,
  });
}

export function fetchTrending(page = 1) {
  return fetchOL("/search.json", {
    q: "popular",
    page,
    limit: 20,
    fields: "key,title,author_name,first_publish_year,cover_i,isbn,ratings_average,ratings_count,number_of_pages_median,publisher,subject,edition_count,language",
  });
}

export function clearOLCache() {
  cache.clear();
}
