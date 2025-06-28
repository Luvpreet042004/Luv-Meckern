import { useEffect, useState } from "react";
import { onValue, onDisconnect, ref, set } from "firebase/database";
import { rtdb } from "@/firebase";
import { useUser } from "./UserContext";
import { PresenceContext } from "./PresenceContext";

export const PresenceProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();
  const [onlineUsers, setOnlineUsers] = useState<Record<string, boolean>>({});
  const [typingUsers, setTypingUsers] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!user) return;

    const userStatusRef = ref(rtdb, `/presence/${user.uid}`);
    set(userStatusRef, true);
    onDisconnect(userStatusRef).set(false);

    const presenceRef = ref(rtdb, "/presence");
    const unsubscribe = onValue(presenceRef, (snapshot) => {
      setOnlineUsers(snapshot.val() || {});
    });

    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    if (!user) return;

    const typingRef = ref(rtdb, `/typing`);
    const unsubscribe = onValue(typingRef, (snapshot) => {
      setTypingUsers(snapshot.val() || {});
    });

    return () => unsubscribe();
  }, [user]);

  const setTyping = (chatId: string, isTyping: boolean) => {
    if (!user) return;

    const typingRef = ref(rtdb, `/typing/${chatId}/${user.uid}`);
    set(typingRef, isTyping);
    if (isTyping) {
      onDisconnect(typingRef).set(false);
    }
  };

  return (
    <PresenceContext.Provider value={{ onlineUsers, typingUsers, setTyping }}>
      {children}
    </PresenceContext.Provider>
  );
};
