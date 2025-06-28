import { Loader } from "lucide-react";

interface LoadingScreenProps {
  message?: string;
  showProgress?: boolean;
  progress?: number;
}

const LoadingScreen = ({ 
  message = "Loading...", 
  showProgress = false, 
  progress = 0 
}: LoadingScreenProps) => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center z-50">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(15,23,42,0.05),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(71,85,105,0.05),transparent_50%)]"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative flex flex-col items-center space-y-8 p-12">
        {/* Elegant Spinner */}
        <div className="relative">
          {/* Outer Ring */}
          <div className="w-16 h-16 rounded-full border-2 border-slate-200 animate-spin" style={{ animationDuration: '3s' }}></div>
          
          {/* Inner Ring */}
          <div className="absolute inset-1 w-14 h-14 rounded-full border-2 border-slate-300 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '2s' }}></div>
          
          {/* Center Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader className="w-6 h-6 text-slate-600 animate-spin" style={{ animationDuration: '4s' }} />
          </div>
        </div>

        {/* Professional Typography */}
        <div className="text-center space-y-3 max-w-md">
          <h2 className="text-xl font-medium text-slate-800 tracking-wide">
            {message}
          </h2>
          
          {/* Minimal Loading Indicator */}
          <div className="flex space-x-1 justify-center">
            <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-pulse" style={{ animationDelay: '0ms', animationDuration: '1.5s' }}></div>
            <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-pulse" style={{ animationDelay: '200ms', animationDuration: '1.5s' }}></div>
            <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-pulse" style={{ animationDelay: '400ms', animationDuration: '1.5s' }}></div>
          </div>
        </div>

        {/* Refined Progress Bar */}
        {showProgress && (
          <div className="w-80 space-y-3">
            <div className="flex justify-between text-sm text-slate-600 font-medium">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-slate-600 to-slate-700 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* Subtle Bottom Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
    </div>
  );
};

export default LoadingScreen;