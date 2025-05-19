import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "./models/User.js"; 
 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors()); 

// MongoDB Connection
const mongoURI = "mongodb+srv://vanshika:vanshika123@cluster0.lmshd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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

    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user = new User({ email, password: hashedPassword });
      await user.save();
      console.log("✅ New user registered:", email);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "❌ Invalid credentials" });

    const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET || "your_secret_key", {
      expiresIn: "1h",
    });

    res.json({ 
      message: "✅ Login successful", 
      token, 
      userDetails: { name: user.name, age: user.age, disability: user.disability }
    });
  } catch (err) {
    res.status(500).json({ error: "❌ Server error" });
  }
});

// Save User Details
app.post("/api/users/details", async (req, res) => {
  const { email, name, age, disability } = req.body;

  try {
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

// Fetch Profile Details
app.get("/api/users/profile", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_secret_key");

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error while fetching profile" });
  }
});

// ✅ Add Feedback Submission Route
app.post("/api/feedback", async (req, res) => {
  const { rating, report } = req.body;
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_secret_key");

    const newFeedback = new Feedback({
      userId: decoded.id,
      rating,
      report,
    });

    await newFeedback.save();
    res.json({ message: "✅ Feedback submitted successfully!" });
  } catch (err) {
    res.status(500).json({ error: "❌ Server error while submitting feedback" });
  }
});

// ✅ Get All Feedback (For Sidebar Display)
app.get("/api/feedback", async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate("userId", "email");
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: "❌ Server error while fetching feedback" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
