
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid opacity-30"></div>
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-lg w-full text-center relative z-10">
        <h1 className="text-gradient text-7xl font-bold mb-6 animate-scale-in">404</h1>
        <p className="text-2xl font-semibold text-white mb-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>Page Not Found</p>
        <p className="text-white/70 mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button 
          className="animate-fade-in" 
          style={{ animationDelay: '0.3s' }}
          onClick={() => window.location.href = '/'}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Return to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
