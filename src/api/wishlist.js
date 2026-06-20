import { AUTH_BASE_URL } from "../lib/constants";

const authBase = AUTH_BASE_URL ? AUTH_BASE_URL.replace(/\/$/, "") : "";

async function request(path, { method = "GET", token } = {}) {
    const url = authBase ? `${authBase}/api${path}` : `/api${path}`;
    const opts = { method, headers: {} };
    if (token) opts.headers["Authorization"] = `Bearer ${token}`;

    const res = await fetch(url, opts);
    const text = await res.text();
    let data = null;
    try {
        data = text ? JSON.parse(text) : null;
    } catch {
        data = text;
    }

    if (!res.ok) {
        const err = new Error(data?.message || `Request failed: ${res.status}`);
        err.status = res.status;
        err.data = data;
        throw err;
    }

    return data;
}

export function getWishlist(token) {
    return request("/wishlist", { method: "GET", token });
}

export function addWishlistItem(movieId, token) {
    return request(`/wishlist/${movieId}`, { method: "POST", token });
}

export function removeWishlistItem(movieId, token) {
    return request(`/wishlist/${movieId}`, { method: "DELETE", token });
}
