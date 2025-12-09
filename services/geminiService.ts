import { GoogleGenAI } from "@google/genai";

/**
 * Generates a short, inspiring Bible verse.
 */
export const generateBibleVerse = async (): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Request a random inspiring verse
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Provide a short, inspiring, and encouraging Bible verse suitable for reflection and new beginnings. Return ONLY the verse text followed by " - " and the reference (e.g. "Verse text. - John 3:16"). Do not include any other text or markdown.`,
      config: {
        maxOutputTokens: 60,
        thinkingConfig: { thinkingBudget: 0 },
        temperature: 1.1, // Higher temperature for variety
      }
    });

    return response.text || "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future. - Jeremiah 29:11";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "But they that wait upon the Lord shall renew their strength; they shall mount up with wings as eagles. - Isaiah 40:31";
  }
};