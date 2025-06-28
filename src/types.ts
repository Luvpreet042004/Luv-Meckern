export type UserId = string;

export interface Chat {
  id: string;
  participants: UserId[];
  createdAt?: Date;
}

export interface Message {
  id: string;
  senderId: UserId;
  text: string;
  timestamp: Date;
}

export interface ChatContextType {
  chats: Chat[];
  selectedChatId: string | null;
  setSelectedChatId: (id: string | null) => void;
  messages: Message[];
  sendMessage: (receiverId: UserId, text: string) => Promise<void>;
}
