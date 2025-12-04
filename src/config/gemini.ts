import { GoogleGenAI, type GenerateContentConfig, type Content } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: "AIzaSyAxGr_2RJlGGfEMf_Cx-l6lnuK1A80nUOs"
});

// AHORA RETORNA UN STRING
const gemini = async (prompt: string): Promise<string> => {
  
  const config: GenerateContentConfig = {
    tools: [
      {
        googleSearch: {},
      },
    ],
  };

  const model = 'gemini-2.5-pro';

  const contents: Content[] = [
    {
      role: 'user',
      parts: [{ text: prompt }],
    },
  ];

  try {
    const responseStream = await ai.models.generateContentStream({
      model,
      config,
      contents,
    });

    let fullText = ""; // <- acumulador

    for await (const chunk of responseStream) {
      const text = chunk.text || "";
      fullText += text;
    }

    return fullText; // <- DEVUELVE EL TEXTO COMPLETO

  } catch (error) {
    console.error("Error al generar contenido con Gemini:", error);
    return "Error al generar respuesta.";
  }
}

export default gemini;; 