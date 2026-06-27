import { Router } from "express";
import User from "../models/User.js";
import { authMiddleware } from "./auth.js";

const router = Router();

router.get("/wishlist", authMiddleware, async (req, res) => {
    return res.json({ wishlist: req.user.wishlist || [] });
});

router.post("/wishlist/:id", authMiddleware, async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ message: "Invalid book id" });
    }

    if (!req.user.wishlist.includes(id)) {
        req.user.wishlist.push(id);
        await req.user.save();
    }

    return res.json({ wishlist: req.user.wishlist });
});

router.delete("/wishlist/:id", authMiddleware, async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ message: "Invalid book id" });
    }

    req.user.wishlist = (req.user.wishlist || []).filter((item) => item !== id);
    await req.user.save();

    return res.json({ wishlist: req.user.wishlist });
});

export default router;
