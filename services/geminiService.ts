
import { GoogleGenAI, Chat } from "@google/genai";
import { PROJECTS, CORE_COMPETENCIES, TOOLKIT } from '../constants';

// The API key is injected from the environment and is assumed to be present.
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

// Create a comprehensive context string from the website's data
const profileInfo = `Mouna Ouattara, Data Scientist. Specializing in Data Science, Machine Learning, Deep Learning, and MLOps. I architect and deploy optimized, end-to-end AI pipelines on scalable infrastructures, turning complex data into actionable intelligence.`;
const projectsContext = `My Projects: ${JSON.stringify(PROJECTS, null, 2)}`;
const skillsContext = `My Core Competencies: ${JSON.stringify(CORE_COMPETENCIES, null, 2)}`;
const toolkitContext = `My Technical Toolkit: ${JSON.stringify(TOOLKIT, null, 2)}`;

const knowledgeBase = `
${profileInfo}
${projectsContext}
${skillsContext}
${toolkitContext}
`;

const systemInstruction = `Vous êtes l'assistant numérique de Mouna Ouattara, Data Scientist. Vous répondez du point de vue de Mouna, en utilisant "je" et "mon". Votre ton est professionnel, sobre, accessible et tourné vers l'avenir.

Votre connaissance est STRICTEMENT limitée aux informations fournies dans cette base de connaissances sur mon profil, mes projets et mes compétences. Vous NE DEVEZ PAS répondre à des questions en dehors de ce contexte. Si un utilisateur pose une question à laquelle vous ne pouvez pas répondre à partir de ce texte, vous devez poliment indiquer votre limite et le ramener vers des sujets que vous connaissez. Par exemple : "Ma connaissance se concentre sur le parcours professionnel de Mouna. Pourrais-je peut-être vous détailler l'un de ses projets ?".

Voici ma base de connaissances :
---
${knowledgeBase}
---
`;

let chat: Chat | null = null;

function getChatInstance(): Chat {
    const ai = getAI();
    // If chat exists, we reuse it. If not, create it.
    if (chat) return chat;

    chat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
            systemInstruction: systemInstruction,
            temperature: 0.5,
        }
    });
    return chat;
}

export const askDigitalBrain = async (question: string): Promise<string> => {
  const currentChat = getChatInstance();
  
  try {
    const response = await currentChat.sendMessage({ message: question });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    chat = null; // Reset chat on error so a new one is created next time
    return "Désolé, une erreur critique est survenue dans mon modèle d'inférence. Veuillez redémarrer la conversation.";
  }
};

export const generateProjectVisual = async (title: string, category: string, description: string): Promise<string | null> => {
    try {
        const ai = getAI();
        const prompt = `
        Create a minimalist, professional, and elegant 3D abstract illustration for a data science project titled "${title}" in the category of ${category}.
        Context: ${description.substring(0, 100)}...
        Visual Style: Clean, sober, high-end editorial aesthetic. Soft studio lighting, neutral tones (whites, light greys, stone) with subtle deep black accents. 
        Elements: Geometric shapes, glass textures, organic data flows, refined typography-like structures.
        No text inside the image. 4K resolution.
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: { parts: [{ text: prompt }] },
            config: {
                imageConfig: { aspectRatio: "16:9" }
            }
        });

        if (response.candidates && response.candidates.length > 0 && response.candidates[0].content && response.candidates[0].content.parts) {
            for (const part of response.candidates[0].content.parts) {
                if (part.inlineData && part.inlineData.data) {
                    return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
                }
            }
        }
        return null;

    } catch (error) {
        console.error("Error generating project visual:", error);
        return null;
    }
};
