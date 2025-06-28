import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChat } from "@/context/ChatContext";
import { useUser } from "@/context/UserContext";
import { Paperclip, Smile, Send } from "lucide-react";
import { useState } from "react";

const ComposerToolbar = () => {
  const {user} = useUser();
  const [newMessage, onMessageChange] = useState("");
  const {sendMessage ,selectedChatId,chats} = useChat();

  const currentChat = chats.find((c) => c.id === selectedChatId);

  const receiverId = currentChat?.participants.find((uid) => uid !== user?.uid) || "Meckern-AI";

  
  return (
    <div className="p-4 border-t bg-card">
      <div className="flex items-center space-x-3">
        <Button variant="ghost" size="sm" className="p-2">
          <Paperclip className="w-5 h-5" />
        </Button>
        <div className="flex-1 relative">
          <Input
            value={newMessage}
            onChange={(e) => onMessageChange(e.target.value)}
            placeholder="Type a message..."
            className="pr-12 bg-muted border-none"
            onKeyDown={async (e) => {
              if (e.key === 'Enter' && newMessage.trim()) {
                sendMessage(receiverId, newMessage);
                onMessageChange("");
              }
            }}
            />
          <Button variant="ghost" size="sm" className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1">
            <Smile className="w-4 h-4" />
          </Button>
        </div>
        <Button 
          onClick={()=>{sendMessage(receiverId,newMessage); onMessageChange("")}}
          className={`p-3 ${newMessage.trim() ? 'yamchat-gradient' : 'bg-muted'} text-white`}
          disabled={!newMessage.trim()}
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default ComposerToolbar;
