
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getAcademicAssistantResponse = async (prompt: string, role: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: `You are a helpful AI assistant integrated into an Academic Portal for a ${role}. 
        Provide concise, accurate academic guidance, schedule summaries, or administrative support.`,
      },
    });
    return response.text || "I'm sorry, I couldn't process that request right now.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The assistant is currently unavailable. Please try again later.";
  }
};
