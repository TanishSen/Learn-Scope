import { useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  GraduationCap, 
  Search, 
  Bell, 
  Menu, 
  Home, 
  Users, 
  HelpCircle, 
  Video, 
  PlayCircle, 
  Trophy, 
  User,
  Plus
} from "lucide-react";
import UserAvatar from "@/components/UserAvatar";
import MobileNavigation from "@/components/MobileNavigation";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [location, setLocation] = useLocation();
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Dashboard", href: "/", icon: Home },
    { name: "Community", href: "/community", icon: Users },
    { name: "Ask Question", href: "/ask-question", icon: HelpCircle },
    { name: "Live Help", href: "/live-help", icon: Video },
    { name: "Recorded Sessions", href: "/recorded", icon: PlayCircle },
    { name: "Rewards", href: "/rewards", icon: Trophy },
    { name: "Profile", href: "/profile", icon: User },
  ];

  const isActive = (href: string) => {
    if (href === "/" && location === "/") return true;
    if (href !== "/" && location.startsWith(href)) return true;
    return false;
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow pt-5 bg-white border-r border-gray-200 overflow-y-auto">
          {/* Logo Section */}
          <div className="flex items-center flex-shrink-0 px-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900">LearnScope</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="mt-8 flex-1">
            <div className="px-6 space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.name}
                    onClick={() => setLocation(item.href)}
                    className={`group flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      isActive(item.href)
                        ? "text-primary bg-green-50"
                        : "text-gray-600 hover:text-primary hover:bg-green-50"
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </button>
                );
              })}
            </div>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              {/* Mobile menu button */}
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="md:hidden">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64">
                  <div className="flex items-center mb-8">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                      <GraduationCap className="w-5 h-5 text-white" />
                    </div>
                    <span className="ml-3 text-xl font-bold text-gray-900">LearnScope</span>
                  </div>
                  <nav className="space-y-2">
                    {navigation.map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.name}
                          onClick={() => {
                            setLocation(item.href);
                            setIsMobileMenuOpen(false);
                          }}
                          className={`group flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                            isActive(item.href)
                              ? "text-primary bg-green-50"
                              : "text-gray-600 hover:text-primary hover:bg-green-50"
                          }`}
                        >
                          <Icon className="w-5 h-5 mr-3" />
                          {item.name}
                        </button>
                      );
                    })}
                  </nav>
                </SheetContent>
              </Sheet>

              {/* Search Bar */}
              <div className="flex-1 max-w-md mx-auto md:mx-0">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search..."
                    className="pl-10"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                </div>
              </div>

              {/* User Profile */}
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                </Button>
                <div className="flex items-center space-x-2">
                  <UserAvatar user={user} size="sm" />
                  <span className="text-sm font-medium text-gray-900 hidden sm:block">
                    {user?.firstName || user?.email?.split('@')[0] || 'User'}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.location.href = '/api/logout'}
                  className="text-gray-500 hover:text-gray-700"
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Mobile Navigation */}
      <MobileNavigation />
    </div>
  );
}
