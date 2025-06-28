import { useChat, type Message } from "@/context/ChatContext";

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble = ({ message }: MessageBubbleProps) => {
  const { chats, selectedChatId } = useChat();
  
    const currentChat = chats.find((c) => c.id === selectedChatId);
  
    const receiverName = currentChat?.receiverName;
  return (
    <div className={`flex ${message.isOwn ? "justify-end" : "justify-start"} mb-2`}>
      <div className={`max-w-[70%] ${message.isOwn ? "order-2" : "order-1"}`}>
        {/* Sender label for received messages */}
        {!message.isOwn && (
          <p className="text-xs text-muted-foreground mb-1 ml-1">
            {receiverName}
          </p>
        )}

        {/* Message bubble */}
        <div
          className={`p-3 rounded-2xl text-sm ${
            message.isOwn
              ? "yamchat-gradient text-white rounded-tr-sm"
              : "bg-muted text-foreground rounded-tl-sm"
          }`}
        >
          {message.content}
        </div>

        {/* Time and read receipt */}
        <div
          className={`flex items-center mt-1 space-x-2 text-xs text-muted-foreground ${
            message.isOwn ? "justify-end" : "justify-start"
          }`}
        >
          <span>{message.time}</span>
          {message.isOwn && <span>{message.read ? "✓✓" : "✓"}</span>}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
