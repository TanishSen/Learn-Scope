import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Video, Users, Trophy, Calculator, Laptop, FlaskConical, Book, Atom, Dna } from "lucide-react";
import UserAvatar from "@/components/UserAvatar";
import { useLocation } from "wouter";

// Subject icons mapping
const subjectIcons = {
  "Computer Science": Laptop,
  "Mathematics": Calculator,
  "Chemistry": FlaskConical,
  "English": Book,
  "Physics": Atom,
  "Biology": Dna,
};

const subjectColors = {
  "Computer Science": "bg-blue-50 hover:bg-blue-100 text-blue-600",
  "Mathematics": "bg-purple-50 hover:bg-purple-100 text-purple-600",
  "Chemistry": "bg-green-50 hover:bg-green-100 text-green-600",
  "English": "bg-yellow-50 hover:bg-yellow-100 text-yellow-600",
  "Physics": "bg-red-50 hover:bg-red-100 text-red-600",
  "Biology": "bg-indigo-50 hover:bg-indigo-100 text-indigo-600",
};

export default function Dashboard() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ["/api/dashboard"],
  });

  const { data: subjects } = useQuery({
    queryKey: ["/api/subjects"],
  });

  const { data: activities } = useQuery({
    queryKey: ["/api/activities"],
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const getFirstName = (user: any) => {
    if (user?.firstName) return user.firstName;
    if (user?.email) return user.email.split('@')[0];
    return 'Friend';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Hello {getFirstName(user)}
        </h1>
        <p className="text-gray-600">What do you want to learn today?</p>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search..."
            className="pl-10"
          />
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Users Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Active Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4 overflow-x-auto pb-2">
                {dashboardData?.onlineUsers?.map((user: any, index: number) => (
                  <div key={user.id || index} className="flex-shrink-0 text-center">
                    <div className="relative">
                      <UserAvatar user={user} size="md" />
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <span className="text-xs text-gray-600 mt-1 block">
                      {user.firstName || user.email?.split('@')[0] || 'User'}
                    </span>
                  </div>
                )) || (
                  <div className="text-gray-500 text-sm">No users online</div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Subject Categories */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Your Subjects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {subjects?.map((subject: any) => {
                  const IconComponent = subjectIcons[subject.name as keyof typeof subjectIcons] || Book;
                  const colorClass = subjectColors[subject.name as keyof typeof subjectColors] || "bg-gray-50 hover:bg-gray-100 text-gray-600";
                  
                  return (
                    <button
                      key={subject.id}
                      className={`p-4 rounded-lg transition-colors text-center ${colorClass}`}
                      onClick={() => setLocation(`/questions?subject=${subject.id}`)}
                    >
                      <IconComponent className="w-6 h-6 mx-auto mb-2" />
                      <div className="text-sm font-medium text-gray-900">{subject.name}</div>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Recently Viewed Questions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Previously Viewed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData?.recentQuestions?.length > 0 ? (
                  dashboardData.recentQuestions.map((question: any) => (
                    <div
                      key={question.id}
                      className="flex items-start space-x-3 p-4 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                      onClick={() => setLocation(`/questions/${question.id}`)}
                    >
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                          <Book className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-900">
                          {question.title}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                          {question.description?.substring(0, 100)}...
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500 text-sm">No questions viewed yet</div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Quick Actions & Stats */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button 
                  className="w-full bg-primary hover:bg-green-600"
                  onClick={() => setLocation('/ask-question')}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Ask Question
                </Button>
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => setLocation('/live-help')}
                >
                  <Video className="w-4 h-4 mr-2" />
                  Get Live Help
                </Button>
                <Button 
                  variant="outline"
                  className="w-full"
                  onClick={() => setLocation('/community')}
                >
                  <Users className="w-4 h-4 mr-2" />
                  Browse Community
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* User Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Your Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Points</span>
                  <span className="text-lg font-bold text-primary">
                    {user?.rewardPoints || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Answers</span>
                  <span className="text-lg font-bold text-blue-600">
                    {user?.totalAnswers || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Questions</span>
                  <span className="text-lg font-bold text-orange-600">
                    {user?.totalQuestions || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Following</span>
                  <span className="text-lg font-bold text-gray-600">
                    {user?.following || 0}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {activities?.length > 0 ? (
                  activities.map((activity: any) => (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <UserAvatar user={{ id: activity.userId }} size="sm" />
                      <div className="flex-1">
                        <p className="text-xs text-gray-600">
                          {activity.description}
                        </p>
                        <p className="text-xs text-gray-400">
                          {new Date(activity.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500 text-sm">No recent activity</div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
