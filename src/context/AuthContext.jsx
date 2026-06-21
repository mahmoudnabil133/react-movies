import { createContext, useContext, useEffect, useState } from "react";
import * as api from "../api/auth";

const AuthContext = createContext(null);
const STORAGE_KEY = "auth";

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(() => {
        try {
            const s = localStorage.getItem(STORAGE_KEY);
            if (!s) return null;
            const parsed = JSON.parse(s);
            return parsed?.token || null;
        } catch {
            return null;
        }
    });

    useEffect(() => {
        if (!token) {
            setUser(null);
            localStorage.removeItem(STORAGE_KEY);
            return;
        }

        // persist token
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ token }));

        // fetch current user
        let mounted = true;
        api
            .getCurrent(token)
            .then((data) => {
                if (!mounted) return;
                // API may return user directly or { user }
                setUser(data?.user || data || null);
            })
            .catch(() => {
                if (!mounted) return;
                setUser(null);
                setToken(null);
                localStorage.removeItem(STORAGE_KEY);
            });

        return () => {
            mounted = false;
        };
    }, [token]);

    const login = async (email, password) => {
        const data = await api.login({ email, password });
        const t = data?.token || data?.accessToken || null;
        setToken(t);
        // if response included user, set it
        if (data?.user) setUser(data.user);
        return data;
    };

    const register = async (payload) => {
        const data = await api.register(payload);
        const t = data?.token || data?.accessToken || null;
        setToken(t);
        if (data?.user) setUser(data.user);
        return data;
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem(STORAGE_KEY);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}
