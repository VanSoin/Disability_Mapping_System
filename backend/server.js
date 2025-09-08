import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "./models/User.js"; // Adjust the path as per your folder structure
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
// Middleware
app.use(express.json());
app.use(cors()); // Allow frontend requests
// MongoDB Connection
const mongoURI =
"mongodb+srv://vanshika:vanshika123@cluster0.lmshd.mongodb.net/?retryWrites=true&w=
majority&appName=Cluster0";
mongoose
.connect(mongoURI, {
useNewUrlParser: true,
useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => {
console.error("❌ MongoDB Connection Error:", err);
process.exit(1);
});
// User Login (Auto-register if not found)
app.post("/api/users/login", async (req, res) => {
const { email, password } = req.body;
try {
let user = await User.findOne({ email });
// If user not found, create a new one
if (!user) {
const hashedPassword = await bcrypt.hash(password, 10);
user = new User({ email, password: hashedPassword });
await user.save();
console.log("✅ New user registered:", email);
}
// Check password
const isMatch = await bcrypt.compare(password, user.password);
if (!isMatch) return res.status(400).json({ error: "❌ Invalid credentials" });
// Generate JWT Token
const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET ||
"your_secret_key", {
expiresIn: "1h",
});
res.json({ message: "✅ Login successful", token });
} catch (err) {
res.status(500).json({ error: "❌ Server error" });
}
});
// ✅ New Route: Save User Details (Name, Age, Disability)
app.post("/api/users/details", async (req, res) => {
const { email, name, age, disability } = req.body;
try {
// Find user by email and update details
let user = await User.findOne({ email });
if (!user) return res.status(404).json({ error: "❌ User not found" });
user.name = name;
user.age = age;
user.disability = disability;
await user.save();
res.json({ message: "✅ Details saved successfully!" });
} catch (err) {
res.status(500).json({ error: "❌ Server error while saving details" });
}
});
// Start Server
app.listen(PORT, () => {
console.log(`🚀 Server running on http://localhost:${PORT}`);
});
