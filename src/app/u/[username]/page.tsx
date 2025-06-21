'use client';

import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CardHeader, CardContent, Card } from '@/components/ui/card';
import { useCompletion } from '@ai-sdk/react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import * as z from 'zod';
import { ApiResponse } from '@/types/ApiResponse';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { messageSchema } from '@/schemas/message.schema';

const specialChar = '||';

const parseStringMessages = (messageString: string): string[] => {
  return messageString
    .split(specialChar)
    .map((msg) => msg.trim())
    .filter(s => s.length > 0);
};

const initialMessageString =
  "What's your favorite movie?||Do you have any pets?||What's your dream job?";

export default function SendMessage() {
  const params = useParams<{ username?: string }>();
  const username = params?.username;

  // Early return if username is missing
  if (!username) {
    return (
      <div className="container mx-auto my-8 p-6 bg-white rounded max-w-4xl text-center">
        <p className="text-red-500 text-lg font-semibold">
          Username not found in URL.
        </p>
      </div>
    );
  }

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
  });

  const messageContent = form.watch('content');

  const handleMessageClick = (message: string) => {
    form.setValue('content', message);
  };

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    setIsLoading(true);
    try {
      const response = await axios.post<ApiResponse>('/api/send-message', {
        ...data,
        username,
      });
      if(!response) return;

      toast.success(response.data.message);
      form.reset({ ...form.getValues(), content: '' });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error('Failed to send message', {
        description:
          axiosError.response?.data.message ?? 'Please try again later',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const {
    completion,
    isLoading: isSuggestLoading,
    error,
    // stop,
    // complete,
  } = useCompletion({ api: '/api/suggest-messages', initialCompletion: initialMessageString });

  // const fetchSuggestedMessages = async() => {
  //   try {
  //     stop(); // Clear previous stream if any 
  //     toast.info("Fetching new suggestions...");
  //     await complete("");
  //     console.log("Suggested messages fetched successfully:", completion);
  //   } catch (error) {
  //     console.error("Error fetching suggested messages:", error);
  //     toast.error("Failed to fetch suggested messages", {
  //       description: error instanceof Error ? error.message : 'Unknown error',
  //     });
  //   }
  // };

  return (
    <div className="container mx-auto my-8 p-6 bg-white rounded max-w-4xl">
      <h1 className="text-4xl font-bold mb-6 text-center">Public Profile Link</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Send Anonymous Message to @{username}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write your anonymous message here"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center">
            {isLoading ? (
              <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button type="submit" disabled={isLoading || !messageContent}>
                Send It
              </Button>
            )}
          </div>
        </form>
      </Form>

      <div className="space-y-4 my-8">
        <div className="space-y-2">
          <Button
            // onClick={fetchSuggestedMessages}
            className="my-4"
            disabled={isSuggestLoading}
            aria-label="Suggest anonymous messages"
          >
            {isSuggestLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              'Suggest Messages'
            )}
          </Button>
          <p>Click on any message below to select it.</p>
        </div>
        <Card>
          <CardHeader>
            <h3 className="text-xl font-semibold">Messages</h3>
          </CardHeader>
          <CardContent className="flex flex-col space-y-4 min-h-[100px]">
            {error ? (
              <p className="text-red-500">{error.message}</p>
            ) : 
            completion && completion.trim().length > 0 ? (
              parseStringMessages(completion).map((message, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="mb-2"
                  onClick={() => handleMessageClick(message)}
                  aria-label={`Select suggested message: ${message}`}
                >
                  {message}
                </Button>
              ))
            ) : (
              <p className="text-gray-500">No suggestions yet.</p>
            )}
          </CardContent>
        </Card>
      </div>
      <Separator className="my-6" />
      <div className="text-center">
        <div className="mb-4">Get Your Message Board</div>
        <Link href={'/sign-up'}>
          <Button>Create Your Account</Button>
        </Link>
      </div>
    </div>
  );
}
