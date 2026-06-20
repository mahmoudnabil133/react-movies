import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import wishlistRoutes from "./routes/wishlist.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;
const mongoUri = process.env.Mongo_Uri;

if (!mongoUri) {
    console.error("Missing Mongo_Uri environment variable");
    process.exit(1);
}

app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Auth server is running" });
});

app.use("/api", authRoutes);
app.use("/api", wishlistRoutes);

mongoose
    .connect(mongoUri)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(port, () => {
            console.log(`Auth server listening on http://localhost:${port}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    });
