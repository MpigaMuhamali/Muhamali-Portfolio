const express = require("express");
const cors = require("cors");
const portfolio = require("./data/portfolio");

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  "http://localhost:5500",
  "http://127.0.0.1:5500",
  "http://localhost:3000",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(null, true);
    },
  })
);

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "Mpiga M Muhamali Portfolio API",
    endpoints: [
      "/api/health",
      "/api/profile",
      "/api/skills",
      "/api/qualifications",
      "/api/projects",
      "/api/contact",
      "/api/portfolio",
    ],
  });
});

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.get("/api/profile", (_req, res) => {
  res.json(portfolio.profile);
});

app.get("/api/skills", (_req, res) => {
  res.json(portfolio.skills);
});

app.get("/api/qualifications", (_req, res) => {
  res.json(portfolio.qualifications);
});

app.get("/api/projects", (_req, res) => {
  res.json(portfolio.projects);
});

app.get("/api/contact", (_req, res) => {
  res.json(portfolio.contact);
});

app.get("/api/portfolio", (_req, res) => {
  res.json(portfolio);
});

app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      error: "name, email, and message are required",
    });
  }

  res.status(201).json({
    success: true,
    message: "Thank you! Your message was received.",
    received: { name, email, message, at: new Date().toISOString() },
  });
});

app.use((_req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Portfolio API running on port ${PORT}`);
});
