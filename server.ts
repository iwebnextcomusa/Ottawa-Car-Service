import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini client on the server.
  // We prioritize the environment's GEMINI_API_KEY.
  const apiKey = process.env.GEMINI_API_KEY || "AIzaSyCLKX2tohQTHF9Gk06XqqlT-tXUjVSOYBU";
  const ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // API endpoint for chatbot
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Invalid messages array" });
      }

      const systemInstruction = `You are the premium virtual customer care concierge for OttawaCarService.net, a luxury private chauffeur and airport transportation service based in Mississauga, Ontario, serving Toronto, Ottawa, and all of Ontario.

Company Details:
- Name: OttawaCarService.net
- Website: https://ottawacarservice.net
- Phone: 416-720-0366 (Highly recommended for immediate support/booking)
- Email: info@torontocarservice.ca
- Location: Mississauga, Ontario, Canada

Services:
- Airport Transfers (Toronto Pearson Airport, Ottawa Airport YOW, Hamilton, Billy Bishop)
- Ottawa to Toronto (and Toronto to Ottawa) executive car service (long-distance point-to-point)
- Corporate Travel & Executive Chauffeur Service
- Special Events & Weddings
- Hourly Charter Service

Fleet:
- Premium Luxury Sedan (Mercedes S-Class, BMW 7 Series or similar - up to 3 passengers)
- Executive SUV (Cadillac Escalade, Chevy Suburban or similar - up to 6 passengers)
- Executive Sprinter Van (up to 14 passengers)

Attributes: 24/7 flight monitoring, certified professional chauffeurs, strict punctuality, pristine clean vehicles, fixed clear pricing.

Your goal: Assist customers gracefully. Provide approximate travel details (e.g., Ottawa to Toronto is about 4.5 to 5 hours, ~450km. A beautiful comfortable ride in our executive sedans/SUVs). Promptly encourage them to call 416-720-0366 or fill out the Quote Request Form on the page to lock in their luxury ride!
Keep responses elegant, executive, professional, and concise (max 3-4 short sentences). No markdown styling like headers; use simple text and line breaks.`;

      // Translate client messages to contents array format for GoogleGenAI SDK
      const chatContents = messages.map(msg => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content }]
      }));

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: chatContents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        },
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Gemini API error:", error);
      res.status(500).json({ error: error.message || "An error occurred with the AI assistant" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
