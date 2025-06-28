import { Card, CardContent } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  animationDelay?: number;
}

const FeatureCard = ({ icon: Icon, title, description, animationDelay = 0 }: FeatureCardProps) => {
  return (
    <Card 
      className="border-none shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in" 
      style={{animationDelay: `${animationDelay * 0.1}s`}}
    >
      <CardContent className="p-6">
        <div className="w-12 h-12 yamchat-gradient rounded-lg flex items-center justify-center mb-4">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
