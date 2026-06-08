const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const upload = require("./middleware/upload");

const Message = require("./models/Message");
const Admin = require("./models/Admin");

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

// ================= MONGODB =================
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB error:", err));

// ================= CREATE ADMIN (SAFE) =================
app.get("/create-admin", async (req, res) => {
  try {
    const exists = await Admin.findOne({ username: "admin" });

    if (exists) {
      return res.send("Admin already exists");
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    await Admin.create({
      username: "admin",
      password: hashedPassword
    });

    res.send("Admin created successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// ================= LOGIN =================
app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const match = await bcrypt.compare(password, admin.password);

    if (!match) {
      return res.status(401).json({ message: "Wrong password" });
    }

    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET || "secretkey123",
      { expiresIn: "1d" }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ================= VERIFY TOKEN =================
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "secretkey123"
    );

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// ================= UPLOAD IMAGE =================
app.post("/api/upload", verifyToken, upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No file uploaded (use form-data key: image)"
    });
  }

  res.json({
    success: true,
    imageUrl: req.file.path
  });
});

// ================= GET MESSAGES =================
app.get("/api/messages", verifyToken, async (req, res) => {
  const messages = await Message.find().sort({ createdAt: -1 });
  res.json(messages);
});

// ================= DELETE MESSAGE =================
app.delete("/api/messages/:id", verifyToken, async (req, res) => {
  await Message.findByIdAndDelete(req.params.id);

  res.json({ success: true });
});

// ================= START SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});