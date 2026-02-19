
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";
import { Message } from "../types";

export class GeminiService {
  async getChatResponse(
    prompt: string, 
    history: Message[],
    images?: string[], 
    useThinking: boolean = false
  ): Promise<string> {
    const model = 'gemini-3-pro-preview';
    // Always use process.env.API_KEY directly in the named parameter for client initialization
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const contents: any[] = history.map(msg => ({
      role: msg.role === 'model' ? 'model' : 'user',
      parts: [{ text: msg.text }]
    }));

    const currentParts: any[] = [{ text: prompt }];
    
    // Add all uploaded images to the current message parts
    if (images && images.length > 0) {
      images.forEach(img => {
        const base64Data = img.split(',')[1];
        const mimeType = img.split(';')[0].split(':')[1];
        currentParts.push({
          inlineData: {
            data: base64Data,
            mimeType: mimeType
          }
        });
      });
    }

    contents.push({
      role: 'user',
      parts: currentParts
    });

    try {
      // Use ai.models.generateContent to query the model with both name and contents
      const response = await ai.models.generateContent({
        model,
        contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          // Thinking config is only available for Gemini 3 and 2.5 series models
          ...(useThinking ? { thinkingConfig: { thinkingBudget: 32768 } } : {})
        },
      });

      // Directly access the .text property on the GenerateContentResponse object
      return response.text || "I'm having trouble seeing the details. Could you try a clearer photo?";
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "I apologize, but I'm having trouble connecting to my vision systems. Please try again or call us!";
    }
  }
}

export const geminiService = new GeminiService();
