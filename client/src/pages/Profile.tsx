import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Trophy, MessageSquare, Video, Settings, Calendar, Star } from "lucide-react";
import UserAvatar from "@/components/UserAvatar";

export default function Profile() {
  const { user } = useAuth();

  const { data: userQuestions } = useQuery({
    queryKey: [`/api/users/${user?.id}/questions`],
    enabled: !!user?.id,
  });

  const { data: userSubjects } = useQuery({
    queryKey: [`/api/users/${user?.id}/subjects`],
    enabled: !!user?.id,
  });

  const getFirstName = (user: any) => {
    if (user?.firstName) return user.firstName;
    if (user?.email) return user.email.split('@')[0];
    return 'User';
  };

  const getFullName = (user: any) => {
    if (user?.firstName && user?.lastName) return `${user.firstName} ${user.lastName}`;
    if (user?.firstName) return user.firstName;
    if (user?.email) return user.email.split('@')[0];
    return 'User';
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <div className="mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start space-x-6">
              <UserAvatar user={user} size="lg" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      {getFullName(user)}
                    </h1>
                    <p className="text-gray-600">{user?.email}</p>
                    {user?.college && (
                      <p className="text-sm text-gray-500 mt-1">{user.college}</p>
                    )}
                  </div>
                  <Button variant="outline" size="sm">
                    <Settings className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {user?.rewardPoints || 0}
                    </div>
                    <div className="text-sm text-gray-600">Points</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {user?.totalAnswers || 0}
                    </div>
                    <div className="text-sm text-gray-600">Answers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      {user?.totalQuestions || 0}
                    </div>
                    <div className="text-sm text-gray-600">Questions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {user?.followers || 0}
                    </div>
                    <div className="text-sm text-gray-600">Followers</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Profile Content */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="questions">Questions</TabsTrigger>
          <TabsTrigger value="answers">Answers</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Activity Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Activity Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <MessageSquare className="w-5 h-5 text-blue-600" />
                      <span className="text-sm font-medium">Questions Asked</span>
                    </div>
                    <Badge variant="secondary">{user?.totalQuestions || 0}</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <MessageSquare className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-medium">Answers Given</span>
                    </div>
                    <Badge variant="secondary">{user?.totalAnswers || 0}</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Video className="w-5 h-5 text-purple-600" />
                      <span className="text-sm font-medium">Help Sessions</span>
                    </div>
                    <Badge variant="secondary">0</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Trophy className="w-5 h-5 text-yellow-600" />
                      <span className="text-sm font-medium">Reward Points</span>
                    </div>
                    <Badge variant="secondary">{user?.rewardPoints || 0}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Subject Expertise */}
            <Card>
              <CardHeader>
                <CardTitle>Subject Expertise</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {userSubjects?.length > 0 ? (
                    userSubjects.map((userSubject: any) => (
                      <div key={userSubject.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="font-medium">Subject {userSubject.subjectId}</span>
                        <Badge variant="outline">{userSubject.proficiencyLevel}</Badge>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <User className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">No subjects added yet</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        Add Subjects
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="questions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userQuestions?.length > 0 ? (
                  userQuestions.map((question: any) => (
                    <div key={question.id} className="border rounded-lg p-4">
                      <h3 className="font-medium mb-2">{question.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {question.description?.substring(0, 150)}...
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>{question.answersCount || 0} answers</span>
                        <span>{question.viewCount || 0} views</span>
                        <span>{new Date(question.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <MessageSquare className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">No questions posted yet</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="answers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Answers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <MessageSquare className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">No answers given yet</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Trophy className="w-5 h-5 mr-2" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Achievement badges - these would be earned based on user activity */}
                <div className="flex items-center space-x-3 p-4 border rounded-lg opacity-50">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Star className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-400">First Question</h4>
                    <p className="text-sm text-gray-400">Ask your first question</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 border rounded-lg opacity-50">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-400">Helper</h4>
                    <p className="text-sm text-gray-400">Answer 10 questions</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 border rounded-lg opacity-50">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-400">Point Collector</h4>
                    <p className="text-sm text-gray-400">Earn 100 points</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 border rounded-lg opacity-50">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Video className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-400">Live Helper</h4>
                    <p className="text-sm text-gray-400">Complete 5 help sessions</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
