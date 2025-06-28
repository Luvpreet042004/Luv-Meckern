import { Card, CardContent } from "@/components/ui/card";

interface TestimonialCardProps {
  name: string;
  role: string;
  content: string;
  avatar: string;
  animationDelay?: number;
}

const TestimonialCard = ({ name, role, content, avatar, animationDelay = 0 }: TestimonialCardProps) => {
  return (
    <Card 
      className="border-none shadow-lg animate-fade-in" 
      style={{animationDelay: `${animationDelay * 0.1}s`}}
    >
      <CardContent className="p-6">
        <p className="text-muted-foreground mb-4 italic">"{content}"</p>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-yamchat-purple rounded-full flex items-center justify-center text-white font-semibold">
            {avatar}
          </div>
          <div>
            <p className="font-semibold">{name}</p>
            <p className="text-sm text-muted-foreground">{role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;