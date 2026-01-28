import axios from "axios";

// Connection avec Google Gemini
const MODEL = "gemini-2.5-flash";
const URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

export async function askGemini(promptText) {
  const key = process.env.REACT_APP_GEMINI_KEY || "AIzaSyDxwHk4y5Qqc9cQvrNVmN5wZ-_l9CzbMJ8";

  if (!key) {
    throw new Error("Missing REACT_APP_GEMINI_KEY in .env");
  }

  const body = {
    contents: [
      {
        role: "user",
        parts: [{ text: promptText }],
      },
    ],
    generationConfig: {
      temperature: 0.75,
      maxOutputTokens: 2000
    },
  };

  const res = await axios.post(`${URL}?key=${key}`, body, {
    headers: { "Content-Type": "application/json" },
  });

  const parts = res.data?.candidates?.[0]?.content?.parts || [];
  return parts.map((p) => p.text).filter(Boolean).join("\n") || "No reply.";
}
