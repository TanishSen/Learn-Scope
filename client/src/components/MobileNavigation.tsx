import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Home, Users, Plus, Bell, User } from "lucide-react";

export default function MobileNavigation() {
  const [location, setLocation] = useLocation();

  const isActive = (href: string) => {
    if (href === "/" && location === "/") return true;
    if (href !== "/" && location.startsWith(href)) return true;
    return false;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-50">
      <div className="grid grid-cols-5 gap-1">
        <Button
          variant="ghost"
          size="sm"
          className={`flex flex-col items-center justify-center py-3 h-auto ${
            isActive("/") ? "text-primary" : "text-gray-600"
          }`}
          onClick={() => setLocation("/")}
        >
          <Home className="w-5 h-5" />
          <span className="text-xs mt-1">Home</span>
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className={`flex flex-col items-center justify-center py-3 h-auto ${
            isActive("/community") ? "text-primary" : "text-gray-600"
          }`}
          onClick={() => setLocation("/community")}
        >
          <Users className="w-5 h-5" />
          <span className="text-xs mt-1">Community</span>
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className="flex flex-col items-center justify-center py-3 h-auto"
          onClick={() => setLocation("/ask-question")}
        >
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <Plus className="w-4 h-4 text-white" />
          </div>
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className="flex flex-col items-center justify-center py-3 h-auto text-gray-600"
        >
          <Bell className="w-5 h-5" />
          <span className="text-xs mt-1">Alerts</span>
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className={`flex flex-col items-center justify-center py-3 h-auto ${
            isActive("/profile") ? "text-primary" : "text-gray-600"
          }`}
          onClick={() => setLocation("/profile")}
        >
          <User className="w-5 h-5" />
          <span className="text-xs mt-1">Profile</span>
        </Button>
      </div>
    </div>
  );
}
