import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Plus, Search, UserPlus } from "lucide-react";
import { db } from "@/firebase";
import { collection, query, where, getDocs, doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { useUser } from "@/context/UserContext"; // or however you're accessing current user
import { useChat } from "@/context/ChatContext"; // assuming you manage chat state here


interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
  online: boolean;
}

const AddUserModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchEmail, setSearchEmail] = useState("");
  const [foundUser, setFoundUser] = useState<User | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState("");

  const { user } = useUser(); // current user

const handleSearch = async () => {
  if (!searchEmail.trim() || !user) return;

  setIsSearching(true);
  setSearchError("");
  setFoundUser(null);

  try {
    const q = query(collection(db, "users"), where("email", "==", searchEmail));
    const snapshot = await getDocs(q);
    console.log("here 1");

    if (snapshot.empty) {
      setSearchError("No user found with this email address.");
    } else {
      const doc = snapshot.docs[0];
      const data = doc.data();

      if (data.uid === user.uid) {
        setSearchError("You cannot message yourself.");
      } else {
        setFoundUser({
          id: data.uid,
          email: data.email,
          name: data.displayName,
          avatar: data.displayName?.slice(0, 2).toUpperCase(),
          online: data.online ?? false, // or use a lastSeen field
        });
      }
    }
  } catch (error) {
    console.error(error);
    setSearchError("Failed to search. Please try again.");
  }

  setIsSearching(false);
};


  const { setSelectedChatId } = useChat(); // optional, if you manage selected chat

const handleAddUser = async () => {
  if (!foundUser || !user) return;

  const chatId = [user.uid, foundUser.id].sort().join("_");

  try {
    const chatRef = doc(db, "chats", chatId);
    const chatSnap = await getDoc(chatRef);

    if (!chatSnap.exists()) {
      await setDoc(chatRef, {
        participants: [user.uid, foundUser.id],
        createdAt: serverTimestamp(),
        type: "direct"
      });
    }

    // Optionally: update selected chat
    setSelectedChatId(chatId);

    // Reset modal
    setIsOpen(false);
    setSearchEmail("");
    setFoundUser(null);
    setSearchError("");
  } catch (error) {
    console.error(error);
    setSearchError("Failed to start chat. Try again.");
  }
};


  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button  className="w-full cursor-pointer yamchat-gradient text-white hover:opacity-90">
          <Plus className="w-4 h-4 mr-2" />
          New Chat
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <UserPlus className="w-5 h-5" />
            <span>Add New User</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email Address
            </label>
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter user's email address"
                  value={searchEmail}
                  onChange={(e) => setSearchEmail(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pl-10"
                  disabled={isSearching}
                />
              </div>
              <Button 
                onClick={handleSearch}
                disabled={!searchEmail.trim() || isSearching}
                size="sm"
              >
                {isSearching ? "..." : "Search"}
              </Button>
            </div>
          </div>

          {/* Search Results */}
          {foundUser && (
            <div className="border rounded-lg p-4 space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground">User Found</h3>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-yamchat-purple text-white font-semibold">
                      {foundUser.avatar}
                    </AvatarFallback>
                  </Avatar>
                  {foundUser.online && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-yamchat-success rounded-full border-2 border-background"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate">{foundUser.name}</p>
                  <p className="text-sm text-muted-foreground truncate">{foundUser.email}</p>
                  <p className="text-xs text-muted-foreground">
                    {foundUser.online ? 'Online' : 'Last seen recently'}
                  </p>
                </div>
              </div>
              <Button 
                onClick={handleAddUser}
                className="w-full yamchat-gradient text-white"
                size="sm"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add to Chat
              </Button>
            </div>
          )}

          {/* Error Message */}
          {searchError && (
            <div className="border border-red-200 rounded-lg p-4 bg-red-50">
              <p className="text-sm text-red-600">{searchError}</p>
            </div>
          )}

          {/* Loading State */}
          {isSearching && (
            <div className="border rounded-lg p-4 bg-muted/50">
              <div className="flex items-center space-x-3">
                <div className="animate-pulse w-10 h-10 bg-muted rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="animate-pulse h-4 bg-muted rounded w-3/4"></div>
                  <div className="animate-pulse h-3 bg-muted rounded w-1/2"></div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-2">Searching for user...</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserModal;
