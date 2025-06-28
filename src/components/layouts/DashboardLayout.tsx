import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  showBackButton?: boolean;
}

const DashboardLayout = ({ children, title, showBackButton = true }: DashboardLayoutProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-card border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            {showBackButton && (
              <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
            )}
            <h1 className="text-xl font-semibold">{title}</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      {children}
    </div>
  );
};

export default DashboardLayout;