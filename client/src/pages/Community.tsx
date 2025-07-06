import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MessageSquare, Users, TrendingUp } from "lucide-react";
import UserAvatar from "@/components/UserAvatar";
import { useLocation } from "wouter";

export default function Community() {
  const [, setLocation] = useLocation();

  const { data: questions, isLoading } = useQuery({
    queryKey: ["/api/questions"],
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Community</h1>
        <p className="text-gray-600">Connect with fellow learners and share knowledge</p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search questions..."
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <TrendingUp className="w-4 h-4 mr-2" />
            Trending
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Community Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <MessageSquare className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Questions</p>
                    <p className="text-2xl font-bold text-gray-900">{questions?.length || 0}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Active Users</p>
                    <p className="text-2xl font-bold text-gray-900">0</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Answered</p>
                    <p className="text-2xl font-bold text-gray-900">0</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Questions Feed */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Recent Questions</span>
                <Button 
                  size="sm" 
                  onClick={() => setLocation('/ask-question')}
                >
                  Ask Question
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {questions?.length > 0 ? (
                  questions.map((question: any) => (
                    <div
                      key={question.id}
                      className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => setLocation(`/questions/${question.id}`)}
                    >
                      <div className="flex items-start space-x-3">
                        <UserAvatar user={{ id: question.userId }} size="sm" />
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 mb-1">
                            {question.title}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            {question.description?.substring(0, 200)}...
                          </p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span>{question.answersCount || 0} answers</span>
                            <span>{question.viewCount || 0} views</span>
                            <span>
                              {new Date(question.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No questions yet. Be the first to ask!</p>
                    <Button 
                      className="mt-4"
                      onClick={() => setLocation('/ask-question')}
                    >
                      Ask a Question
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {activities?.length > 0 ? (
                  activities.slice(0, 5).map((activity: any) => (
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

          {/* Help Center */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => setLocation('/live-help')}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Get Live Help
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => setLocation('/ask-question')}
                >
                  <Users className="w-4 h-4 mr-2" />
                  Ask Community
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
