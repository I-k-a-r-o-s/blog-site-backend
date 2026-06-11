import { GoogleGenAI } from "@google/genai";

export const geminiAI = async (prompt) => {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  const task = `Generate a blog content for ${prompt} topic in simple text format`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: task,
  });
  return response.text;
};
