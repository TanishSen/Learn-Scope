import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";

interface UserAvatarProps {
  user?: {
    id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    profileImageUrl?: string;
  };
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function UserAvatar({ user, size = "md", className = "" }: UserAvatarProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-12 h-12",
    lg: "w-20 h-20",
  };

  const getInitials = (user: any) => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    }
    if (user?.firstName) {
      return user.firstName[0].toUpperCase();
    }
    if (user?.email) {
      return user.email[0].toUpperCase();
    }
    return "U";
  };

  return (
    <Avatar className={`${sizeClasses[size]} ${className}`}>
      <AvatarImage src={user?.profileImageUrl} alt={user?.firstName || "User"} />
      <AvatarFallback className="bg-primary text-white">
        {user ? getInitials(user) : <User className="w-4 h-4" />}
      </AvatarFallback>
    </Avatar>
  );
}
