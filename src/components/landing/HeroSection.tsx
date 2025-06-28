import { MessageCircle } from "lucide-react";
import { FcGoogle } from 'react-icons/fc';
import { signInWithPopup } from "firebase/auth";
import { auth, provider,db } from "../../firebase";
import { Button } from "../ui/button";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect } from "react";

const HeroSection = () => {
  const navigate = useNavigate();
  const { setUser , user, loading } = useUser();

  useEffect(() => {
    if (!loading && user) {
      navigate("/chat");
    }
  }, [user, loading, navigate]);
  if(loading) return null;
 const handleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Write user to Firestore if not already there
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || "",
        photoURL: user.photoURL || "",
        createdAt: new Date(),
      });
    }

    // Set the user in your global state/context
    setUser(user);
    navigate("/chat");
  } catch (err) {
    console.error("Login failed:", err);
  }
};
  return (
    <section className="py-20 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Chat Freely,<br></br>
              Instantly
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              The joyful way to stay connected with friends and groups. Experience seamless messaging 
              with a touch of personality that makes every conversation special.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
              type="button"
              onClick={()=>{handleLogin()}}
              className="flex items-center cursor-pointer justify-center gap-3 px-4 py-2.5 bg-white text-sm font-medium text-gray-700 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors duration-200"
            >
              <FcGoogle className="w-5 h-5" />
              <span>Sign in with Google</span>
            </Button>
            </div>
          </div>
          
          <div className="relative animate-slide-up">
            <div className="relative z-10 bg-card rounded-2xl shadow-2xl p-6 max-w-sm mx-auto">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-yamchat-purple rounded-full flex items-center justify-center text-white font-semibold">
                    A
                  </div>
                  <div>
                    <p className="font-semibold">Alex Chen</p>
                    <p className="text-sm text-muted-foreground">Online</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="bg-muted p-3 rounded-lg rounded-tl-sm max-w-[80%]">
                    <p className="text-sm">Hey! How's the new project going? 🚀</p>
                  </div>
                  <div className="bg-yamchat-purple text-white p-3 rounded-lg rounded-tr-sm max-w-[80%] ml-auto">
                    <p className="text-sm">Amazing! The team loves the new features 😊</p>
                  </div>
                  <div className="bg-muted p-3 rounded-lg rounded-tl-sm max-w-[80%]">
                    <p className="text-sm">That's fantastic! Can't wait to see it live</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 pt-2">
                  <div className="flex-1 bg-muted rounded-full px-4 py-2">
                    <p className="text-sm text-muted-foreground">Type a message...</p>
                  </div>
                  <div className="w-8 h-8 yamchat-gradient rounded-full flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 yamchat-gradient rounded-full opacity-20 animate-bounce-in"></div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-yamchat-blue rounded-full opacity-30 animate-bounce-in" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;