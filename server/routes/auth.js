import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = Router();
const secret = process.env.JWT_SECRET || "secret";

const createToken = (user) => jwt.sign({ id: user._id }, secret, { expiresIn: "7d" });

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Missing authorization token" });
    }

    const token = authHeader.split(" ")[1];
    try {
        const payload = jwt.verify(token, secret);
        const user = await User.findById(payload.id).select("-password");
        if (!user) return res.status(401).json({ message: "Invalid token" });
        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

export { authMiddleware };

router.post("/register", async (req, res) => {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Name, email, and password are required" });
    }

    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
        return res.status(409).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        name,
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        phone: phone || "",
    });

    const token = createToken(user);
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, phone: user.phone, wishlist: user.wishlist || [] } });
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = createToken(user);
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, phone: user.phone, wishlist: user.wishlist || [] } });
});

router.get("/login", authMiddleware, (req, res) => {
    res.json({ user: req.user });
});

export default router;
