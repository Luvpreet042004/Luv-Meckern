import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  doc,
  setDoc,
  getDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { db, gemini } from "@/firebase";         
import { ChatContext } from "./ChatContext";
import type { Chat, Message, ChatContextType, UserId } from "./ChatContext";
import { useUser } from "./UserContext";
import type { Content , Role } from "firebase/ai";


const BOT_ID = "Meckern-AI";                               // fixed UID for the AI

async function getGeminiReply(prompt: string, history: Message[]) {
  const contents : Content[] = history.slice(-10).map((m) => ({
    role: (m.sender === BOT_ID ? "model" : "user" )as Role,
    parts: [{ text: m.content }],
  }));
  contents.push({ role: "user", parts: [{ text: prompt }] });

  const { response } = await gemini.generateContent({ contents });
  return response.text();
}

export function ChatProvider({ children }: { children: ReactNode }) {
  const { user } = useUser();
  const [chats, setChats]       = useState<Chat[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

   useEffect(() => {
    if (!user || selectedChatId) return;         // run only once per login

    (async () => {
      const botChatId = [user.uid, BOT_ID].sort().join("_");
      const ref = doc(db, "chats", botChatId);

      if (!(await getDoc(ref)).exists()) {
        await setDoc(ref, {
          participants: [user.uid, BOT_ID],
          type: "assistant",
          createdAt: serverTimestamp(),
        });
      }

      setSelectedChatId(botChatId);              // <-- opens AI chat
    })();
  }, [user, selectedChatId]);

  useEffect(() => {
    if (!user) return;

    const fetchChats = async () => {
      try {
        const q = query(collection(db, "chats"));
        const snapshot = await getDocs(q);

        const rawChats = snapshot.docs.map((docSnap) => {
          const data = docSnap.data();
          const chat: Chat = {
            id: docSnap.id,
            participants: data.participants || [],
            type: data.type || "direct",
            receiverName: "",
          };
          return chat;
        });

        const filtered = rawChats.filter((chat) =>
          chat.participants.includes(user.uid)
        );

        const getReceiverName = async (chat: Chat): Promise<string> => {
          const receiverId = chat.participants.find((uid) => uid !== user.uid);
          if (!receiverId) return "Unknown";
          if (receiverId === BOT_ID) return "Meckern AI";

          try {
            const userSnap = await getDoc(doc(db, "users", receiverId));
            if (userSnap.exists()) {
              const data = userSnap.data();
              return data.displayName || receiverId;
            }
            return "Unknown";
          } catch (err) {
            console.error("❌ Failed to fetch receiver name:", err);
            return "Unknown";
          }
        };

        const chatsWithNames = await Promise.all(
          filtered.map(async (chat) => ({
            ...chat,
            receiverName: await getReceiverName(chat),
          }))
        );

        setChats(chatsWithNames);
      } catch (err) {
        console.error("❌ Error fetching chats:", err);
      }
    };

    fetchChats();
  }, [user,selectedChatId]);

  useEffect(() => {
    if (!selectedChatId || !user) return;

    const q = query(
      collection(db, "chats", selectedChatId, "messages"),
      orderBy("timestamp")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs: Message[] = snapshot.docs.map((docSnap, idx) => {
        const data = docSnap.data();
        return {
          id: idx,
          sender: data.senderId,
          content: data.text,
          time:
            data.timestamp?.toDate().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }) ?? "",
          isOwn: data.senderId === user.uid,
          read: true,
        };
      });
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [selectedChatId, user]);

  const sendMessage = async (receiverId: UserId, text: string) => {
    if (!user) return;

    const senderId = user.uid;
    const chatId = [senderId, receiverId].sort().join("_");
    const chatRef = doc(db, "chats", chatId);

    // ensure chat doc exists
    const chatSnap = await getDoc(chatRef);
    if (!chatSnap.exists()) {
      await setDoc(chatRef, {
        participants: [senderId, receiverId],
        type: receiverId === BOT_ID ? "assistant" : "direct",
        createdAt: serverTimestamp(),
      });
    }

    const messagesRef = collection(db, "chats", chatId, "messages");

    await addDoc(messagesRef, {
      senderId,
      text,
      timestamp: serverTimestamp(),
    });

    if (receiverId === BOT_ID) {
      const botReply = await getGeminiReply(text, [
        ...messages,
        {
          id: Date.now(),
          sender: senderId,
          content: text,
          time: "",
          isOwn: true,
          read: true,
        },
      ]);

      await addDoc(messagesRef, {
        senderId: BOT_ID,
        text: botReply,
        timestamp: serverTimestamp(),
      });
    }

    setSelectedChatId(chatId);
  };

  const contextValue: ChatContextType = {
    chats,
    selectedChatId,
    setSelectedChatId,
    messages,
    sendMessage,
  };

  return (
    <ChatContext.Provider value={contextValue}>
      {children}
    </ChatContext.Provider>
  );
}
