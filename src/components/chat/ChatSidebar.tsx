import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  MessageCircle,
  Search,
  Moon,
  Sun,
  Bot
} from "lucide-react";
import { useUser } from "@/context/UserContext";
import { useChat } from "@/context/ChatContext";
import AddUserModal from "./NewChatModal";
import { useTheme } from "@/context/ThemeContext";

interface ChatSidebarProps {
  onCloseSidebar?: () => void;
}

const ChatSidebar = ({onCloseSidebar}: ChatSidebarProps) => {
  const { user } = useUser();
  const { chats, selectedChatId, setSelectedChatId } = useChat();
  const {darkMode , toggleDarkMode} = useTheme();

  const [searchTerm, setSearchTerm] = useState("");

  const filteredChats = chats.filter((chat) =>
  chat.receiverName?.toLowerCase().includes(searchTerm.toLowerCase())
);

const handleChatSelect = (chatId: string) => {
    setSelectedChatId(chatId);
    if (onCloseSidebar) {
      onCloseSidebar();
    }
  };
  return (
    <div className="w-full h-full border-r bg-card flex flex-col">
      {/* Sidebar Header */}
      <div className="p-3 sm:p-4 border-b">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 yamchat-gradient rounded-lg flex items-center justify-center">
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <span className="text-base sm:text-lg font-bold">Luv Meckern</span>
          </div>
          <div>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="p-1.5 sm:p-2"
            >
              {darkMode ? (
                <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              ) : (
                <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              )}
            </Button>
          </div>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              onClick={()=>{
                const chatId = [user?.uid, "Meckern-AI"].sort().join("_");
                setSelectedChatId(chatId);
              }}
              size="sm"
              className="p-1.5 sm:p-2"
            >
              <Bot />
            </Button>
          </div>
          </div>
        </div>

        {/* User Profile */}
        <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
          <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
            <AvatarFallback className="yamchat-gradient text-white font-semibold text-sm sm:text-base">
              {user?.displayName?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-sm sm:text-base truncate">{user?.displayName}</p>
            <div className="flex items-center space-x-2">
              <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-green-500"></span>
              </span>
              <span className="text-xs sm:text-sm text-muted-foreground">Online</span>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2.5 sm:left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
          <Input
            placeholder="Search chats..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 sm:pl-10 bg-muted border-none text-sm"
          />
        </div>
      </div>

      {/* New Chat Button */}
      <div className="p-3 sm:p-4 border-b">
        <AddUserModal />
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {filteredChats.map((chat) => {
          const receiverId = chat.participants.find((uid) => uid !== user?.uid);
          return (
            <div
              key={chat.id}
              onClick={() => handleChatSelect(chat.id)}
              className={`p-3 sm:p-4 border-b cursor-pointer hover:bg-muted/50 transition-colors ${
                selectedChatId === chat.id ? "bg-muted" : ""
              }`}
            >
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Avatar className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0">
                  <AvatarFallback className="yamchat-gradient text-white font-semibold text-sm sm:text-base">
                    {chat.receiverName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-sm sm:text-base truncate">
                      {chat.receiverName || receiverId}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}; 

export default ChatSidebar;
