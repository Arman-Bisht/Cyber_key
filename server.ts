import express from "express";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = parseInt(process.env.APP_PORT || "3001", 10);

// Middleware
app.use(express.json());

// Validate API key on startup
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey || apiKey === "YOUR_API_KEY_HERE") {
  console.warn(
    "\n⚠️  WARNING: GEMINI_API_KEY is not set or is still the placeholder."
  );
  console.warn(
    '   Get your key from https://aistudio.google.com/ and add it to .env\n'
  );
}

// Initialize Gemini client (lazy — only when a valid key is present)
function getGenAI() {
  const key = process.env.GEMINI_API_KEY;
  if (!key || key === "YOUR_API_KEY_HERE") {
    throw new Error("GEMINI_API_KEY is not configured. Check your .env file.");
  }
  return new GoogleGenerativeAI(key);
}

// ──────────────── ROUTES ────────────────

// Health check
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    hasApiKey: !!apiKey && apiKey !== "YOUR_API_KEY_HERE",
  });
});

// AI Generate endpoint
app.post("/api/ai/generate", async (req, res) => {
  try {
    const { prompt, model = "gemini-2.0-flash" } = req.body;

    if (!prompt || typeof prompt !== "string") {
      res.status(400).json({ error: "A 'prompt' string is required." });
      return;
    }

    const genAI = getGenAI();
    const genModel = genAI.getGenerativeModel({ model });
    const result = await genModel.generateContent(prompt);
    const text = result.response.text();

    res.json({ text });
  } catch (error: any) {
    console.error("AI Generate Error:", error.message);
    res.status(500).json({
      error: error.message || "Failed to generate AI response.",
    });
  }
});

// ──────────────── START ────────────────

app.listen(PORT, () => {
  console.log(`\n🚀 CyberKeys API server running on http://localhost:${PORT}`);
  console.log(`   Health check: http://localhost:${PORT}/api/health`);
  console.log(`   AI endpoint:  POST http://localhost:${PORT}/api/ai/generate\n`);
});
