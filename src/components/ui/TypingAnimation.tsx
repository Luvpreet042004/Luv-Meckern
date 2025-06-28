const TypingAnimation = ({ sender }: { sender: string }) => {
  return (
    <div className="flex justify-start">
      <div className="max-w-[70%]">
        <p className="text-xs text-muted-foreground mb-1 ml-1">{sender} is typing...</p>
        <div className="bg-muted p-3 rounded-2xl rounded-tl-sm">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingAnimation;