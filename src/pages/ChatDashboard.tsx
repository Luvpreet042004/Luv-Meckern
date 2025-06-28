import { useEffect, useRef, useState } from "react";
import ChatSidebar from "@/components/chat/ChatSidebar";
import ChatHeader from "@/components/chat/ChatHeader";
import MessageBubble from "@/components/chat/MessageBubble";
import ComposerToolbar from "@/components/chat/ComposerToolbar";
import { useChat } from "@/context/ChatContext";
import { PresenceProvider } from "@/context/PresenceProvider";

const ChatDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { messages } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const scrollToBottom = (smooth = true) => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: smooth ? 'smooth' : 'instant'
      });
    }
  };

  // Initial load - scroll to bottom instantly without animation
  useEffect(() => {
    if (isInitialLoad && messages.length > 0) {
      scrollToBottom(false);
      setIsInitialLoad(false);
    }
  }, [messages.length, isInitialLoad]);

  // For new messages after initial load - smooth scroll
  useEffect(() => {
    if (!isInitialLoad && messages.length > 0) {
      scrollToBottom(true);
    }
  }, [messages.length, isInitialLoad]);

  return (
    <div className="h-screen flex bg-background">
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out z-50
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        w-80 h-full
      `}>
        <ChatSidebar onCloseSidebar={() => setIsSidebarOpen(false)} />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0  ">
        <ChatHeader onToggleSidebar={handleToggleSidebar} />

        {/* Messages Area with Custom Scrollbar */}
        <div 
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto p-4 space-y-4
            scrollbar-thin
            hover:scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 
            dark:scrollbar-track-gray-800  custom-scrollbar
            scrollbar-thumb-rounded-full chat-scroll"
        >
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>

        <ComposerToolbar />
      </div>
    </div>
  );
};

// Wrap with providers
const ChatDashboardWithProviders = () => {
  return (
      <PresenceProvider>
        <ChatDashboard />
      </PresenceProvider>
  );
};

export default ChatDashboardWithProviders;