import { AUTH_BASE_URL } from "../lib/constants";

const authBase = AUTH_BASE_URL ? AUTH_BASE_URL.replace(/\/$/, "") : "";

async function request(path, { method = "GET", body, token } = {}) {
    const url = authBase ? `${authBase}/api${path}` : `/api${path}`;
    const opts = { method, headers: {} };
    if (body) {
        opts.headers["Content-Type"] = "application/json";
        opts.body = JSON.stringify(body);
    }
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

export function register(user) {
    return request("/register", { method: "POST", body: user });
}

export function login(credentials) {
    return request("/login", { method: "POST", body: credentials });
}

export function getCurrent(token) {
    return request("/login", { method: "GET", token });
}
