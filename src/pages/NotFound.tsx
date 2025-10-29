
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { MapPinOff } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-background/80 p-6 animate-fade-in">
      <div className="max-w-md w-full space-y-6 text-center">
        <div className="flex justify-center">
          <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center">
            <MapPinOff className="h-12 w-12 text-muted-foreground" />
          </div>
        </div>
        
        <h1 className="text-4xl font-display font-bold tracking-tight">404</h1>
        <p className="text-xl text-muted-foreground">Page not found</p>
        <p className="text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="pt-4">
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 button-hover"
          >
            Return Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
