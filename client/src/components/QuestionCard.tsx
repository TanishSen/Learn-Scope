import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, Eye, Clock, User } from "lucide-react";
import UserAvatar from "@/components/UserAvatar";

interface QuestionCardProps {
  question: {
    id: number;
    title: string;
    description: string;
    userId: string;
    subjectId: number;
    isUrgent: boolean;
    isResolved: boolean;
    viewCount: number;
    answersCount: number;
    createdAt: string;
  };
  subject?: {
    id: number;
    name: string;
    color: string;
  };
  onClick?: () => void;
}

export default function QuestionCard({ question, subject, onClick }: QuestionCardProps) {
  const timeAgo = (date: string) => {
    const now = new Date();
    const questionDate = new Date(date);
    const diffInMs = now.getTime() - questionDate.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInDays > 0) {
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    } else if (diffInHours > 0) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else {
      return 'Just now';
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={onClick}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <UserAvatar user={{ id: question.userId }} size="sm" />
            <div>
              <h3 className="font-semibold text-gray-900 line-clamp-2">
                {question.title}
              </h3>
              <div className="flex items-center space-x-2 mt-1">
                {question.isUrgent && (
                  <Badge variant="destructive" className="text-xs">
                    Urgent
                  </Badge>
                )}
                {question.isResolved && (
                  <Badge variant="secondary" className="text-xs">
                    Resolved
                  </Badge>
                )}
                {subject && (
                  <Badge variant="outline" className="text-xs">
                    {subject.name}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
          {question.description}
        </p>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <MessageSquare className="w-3 h-3" />
              <span>{question.answersCount}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Eye className="w-3 h-3" />
              <span>{question.viewCount}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{timeAgo(question.createdAt)}</span>
            </div>
          </div>
          <Button size="sm" variant="outline" className="text-xs">
            View
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
