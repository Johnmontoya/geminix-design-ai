import { createContext, type ReactNode, useState } from "react";
import gemini from "../config/gemini";

// --- 1. Definir la Interfaz para el Contexto ---
interface ContextType {
  prevPrompts: string[];
  setPrevPrompts: React.Dispatch<React.SetStateAction<string[]>>;

  onSent: (prompt: string) => Promise<void>;

  resultData: string;
  loading: boolean;

  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;

  recentPrompt: string;
  setRecentPrompt: React.Dispatch<React.SetStateAction<string>>;

  showResult: boolean;
  setShowResult: React.Dispatch<React.SetStateAction<boolean>>;

  newChat: () => Promise<void>;
}

// --- 2. Valor inicial del contexto ---
const defaultContextValue: ContextType = {
  prevPrompts: [],
  setPrevPrompts: () => {},

  onSent: async () => {},

  resultData: "",
  loading: false,

  input: "",
  setInput: () => {},

  recentPrompt: "",
  setRecentPrompt: () => {},

  showResult: false,
  setShowResult: () => {},

  newChat: async () => {}
};

export const Context = createContext<ContextType>(defaultContextValue);

// --- 3. Provider ---
interface ContextProviderProps {
  children: ReactNode;
}

const ContextProvider = ({ children }: ContextProviderProps) => {
  const [resultData, setResultData] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [input, setInput] = useState<string>("");
  const [recentPrompt, setRecentPrompt] = useState<string>("");

  const [prevPrompts, setPrevPrompts] = useState<string[]>([]);
  const [showResult, setShowResult] = useState<boolean>(true); // Cambiado a true para mostrar la página inicial

  const delayPara = (index: number, nextWord: any) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const newChat = async () => {
    setLoading(false)
    setShowResult(true) // Cambiado a true para volver a la pantalla inicial
  }

  const onSent = async (prompt: string) => {
    // 1. PRIMERO: Preparar el estado para mostrar loading
    setResultData("");
    setLoading(true);
    setShowResult(false); // ESTO ES CRÍTICO: Cambiar a false ANTES de todo
    
    // 2. SEGUNDO: Guardar el prompt actual
    const currentPrompt = prompt !== undefined ? prompt : input;
    setRecentPrompt(currentPrompt);
    setPrevPrompts((prev) => [...prev, currentPrompt]);

    try {
      // 3. TERCERO: Llamar a la API
      const responseText = await gemini(currentPrompt);
      
      // 4. CUARTO: Procesar la respuesta
      let responseArray = responseText!.split("**");
      let newResponse = "";
      for (let i = 0; i < responseArray.length; i++) {
        if (i === 0 || i % 2 !== 1) {
          newResponse! += responseArray[i];
        } else {
          newResponse! += "<b>" + responseArray[i] + "</b>";
        }
      }

      let newResponseData = newResponse!.split("*").join("</br>");
      let newResponseArray = newResponseData.split(" ");

      // 5. QUINTO: Mostrar respuesta palabra por palabra
      for (let i = 0; i < newResponseArray.length; i++) {
        const nextWord = newResponseArray[i];
        delayPara(i, nextWord + " ");
      }
      
      setInput("");
    } catch (error) {
      console.error("Error al llamar a la API de Gemini:", error);
      setResultData("Hubo un error al procesar tu solicitud.");
    } finally {
      // 6. FINALMENTE: Desactivar loading
      setLoading(false);
    }
  };

  const contextValue: ContextType = {
    prevPrompts,
    setPrevPrompts,

    onSent,

    resultData,
    loading,

    input,
    setInput,

    recentPrompt,
    setRecentPrompt,

    showResult,
    setShowResult,

    newChat,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default ContextProvider;