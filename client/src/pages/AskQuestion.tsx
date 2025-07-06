import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import { ArrowLeft, HelpCircle } from "lucide-react";

const questionSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  subjectId: z.string().min(1, "Please select a subject"),
  isUrgent: z.boolean().default(false),
});

type QuestionFormData = z.infer<typeof questionSchema>;

export default function AskQuestion() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: subjects } = useQuery({
    queryKey: ["/api/subjects"],
  });

  const form = useForm<QuestionFormData>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      title: "",
      description: "",
      subjectId: "",
      isUrgent: false,
    },
  });

  const createQuestionMutation = useMutation({
    mutationFn: async (data: QuestionFormData) => {
      const response = await apiRequest("POST", "/api/questions", {
        ...data,
        subjectId: parseInt(data.subjectId),
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Your question has been posted successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/questions"] });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard"] });
      setLocation("/community");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to post question. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: QuestionFormData) => {
    createQuestionMutation.mutate(data);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <Button
          variant="ghost"
          onClick={() => setLocation("/community")}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Community
        </Button>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Ask a Question</h1>
        <p className="text-gray-600">
          Get help from your peers by asking detailed questions about your studies
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <HelpCircle className="w-5 h-5 mr-2" />
                Question Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Subject Selection */}
                  <FormField
                    control={form.control}
                    name="subjectId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a subject" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {subjects?.map((subject: any) => (
                              <SelectItem key={subject.id} value={subject.id.toString()}>
                                {subject.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Question Title */}
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Question Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="What's your question about?"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Question Description */}
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Provide detailed information about your question..."
                            rows={6}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Urgent Toggle */}
                  <FormField
                    control={form.control}
                    name="isUrgent"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Mark as Urgent
                          </FormLabel>
                          <div className="text-sm text-gray-500">
                            Urgent questions get priority visibility
                          </div>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {/* Submit Button */}
                  <div className="flex space-x-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setLocation("/community")}
                      disabled={createQuestionMutation.isPending}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={createQuestionMutation.isPending}
                      className="bg-primary hover:bg-green-600"
                    >
                      {createQuestionMutation.isPending ? "Posting..." : "Post Question"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        {/* Tips Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tips for Good Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
                  <p>Be specific and clear in your question title</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
                  <p>Provide context and what you've already tried</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
                  <p>Include relevant details like error messages</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
                  <p>Choose the most appropriate subject</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
                  <p>Use urgent marking only when necessary</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Community Guidelines</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-gray-600">
                <p>• Be respectful and helpful</p>
                <p>• Search before asking duplicates</p>
                <p>• Thank those who help you</p>
                <p>• Help others when you can</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
