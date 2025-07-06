import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Users, Video, Trophy } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900">LearnScope</span>
            </div>
            <Button 
              onClick={() => window.location.href = '/api/login'}
              className="bg-primary hover:bg-green-600"
            >
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Learn Together, <span className="text-primary">Grow Together</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Connect with fellow students, get instant help through live video sessions, 
            and build a collaborative learning community that helps everyone succeed.
          </p>
          <Button 
            size="lg" 
            className="bg-primary hover:bg-green-600 text-lg px-8 py-4"
            onClick={() => window.location.href = '/api/login'}
          >
            Start Learning Now
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Everything You Need for Peer Learning
          </h2>
          <p className="text-lg text-gray-600">
            Comprehensive tools to help you learn, teach, and grow with your peers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle className="text-xl">Community Q&A</CardTitle>
              <CardDescription>
                Ask questions and get answers from your peer community
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Video className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle className="text-xl">Live Help Sessions</CardTitle>
              <CardDescription>
                Connect instantly with peers for real-time video help
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle className="text-xl">Subject Expertise</CardTitle>
              <CardDescription>
                Find help across all subjects from Computer Science to Biology
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-6 h-6 text-yellow-600" />
              </div>
              <CardTitle className="text-xl">Reward System</CardTitle>
              <CardDescription>
                Earn points for helping others and unlock rewards
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Transform Your Learning?
            </h2>
            <p className="text-xl text-green-100 mb-8">
              Join thousands of students already learning together
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-4"
              onClick={() => window.location.href = '/api/login'}
            >
              Join LearnScope Today
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-white" />
              </div>
              <span className="ml-2 text-lg font-bold">LearnScope</span>
            </div>
            <p className="text-gray-400">
              © 2024 LearnScope. Empowering peer-to-peer learning.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
