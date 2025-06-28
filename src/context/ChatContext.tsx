import { createContext, useContext } from "react";
export type UserId = string;

export interface Chat {
  id: string;
  participants: UserId[];
  type : "direct" | "group";
  receiverName?: string;
}

export interface Message {
  id: number;
  sender: string;
  content: string;
  time: string;
  isOwn: boolean;
  read: boolean;
}

export interface ChatContextType {
  chats: Chat[];
  selectedChatId: string | null;
  setSelectedChatId: (id: string | null) => void;
  messages: Message[];
  sendMessage: (receiverId: UserId, text: string) => Promise<void>;
}

// Create the context
export const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Export hook to consume context
export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
