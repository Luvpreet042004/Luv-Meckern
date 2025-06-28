import { createContext, useContext } from "react";

interface PresenceContextType {
  onlineUsers: Record<string, boolean>;
  typingUsers: Record<string, boolean>;
  setTyping: (chatId: string, isTyping: boolean) => void;
}

export const PresenceContext = createContext<PresenceContextType>({
  onlineUsers: {},
  typingUsers: {},
  setTyping: () => {},
});

export const usePresence = () => useContext(PresenceContext);
