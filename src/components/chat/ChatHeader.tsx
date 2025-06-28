import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Phone, Video, MoreVertical, Menu } from "lucide-react";
import { useChat } from "@/context/ChatContext";
import { usePresence } from "@/context/PresenceContext";
import { useUser } from "@/context/UserContext";

interface ChatHeaderProps {
  onToggleSidebar: () => void;
}

const ChatHeader = ({ onToggleSidebar }: ChatHeaderProps) => {
  const { onlineUsers } = usePresence();
  const { chats, selectedChatId } = useChat();
  const {user} = useUser();

  const currentChat = chats.find((c) => c.id === selectedChatId);

  const isGroup = currentChat?.type === "group";
  const receiverName = currentChat?.receiverName;
  const receiverId = currentChat?.participants.find((uid) => uid !== user?.uid) || "Meckern-AI";
  const isReceiverOnline = !!onlineUsers[receiverId]
  

  return (
    <div className="p-3 sm:p-4 border-b bg-card">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleSidebar}
            className="lg:hidden p-2"
          >
            <Menu className="w-4 h-4" />
          </Button>

          <Avatar className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0">
            <AvatarFallback className="yamchat-gradient text-white font-semibold text-sm sm:text-base">
              {receiverName?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-sm sm:text-base truncate">{receiverName}</p>
            <div className="flex items-center space-x-1 text-xs sm:text-sm text-muted-foreground truncate">
            <span
              className={`h-2 w-2 rounded-full ${
                isGroup ? 'bg-transparent' : isReceiverOnline ? 'bg-green-500' : 'bg-gray-400'
              }`}
            />
            <span>
              {isGroup
                ? `${currentChat?.participants.length} members`
                : isReceiverOnline
                  ? "Online"
                  : "Last seen recently"}
            </span>
          </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
          <Button variant="ghost" size="sm" className="hidden sm:flex">
            <Phone className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="hidden sm:flex">
            <Video className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
 