"use client";
import MessageCard from "@/components/customUi/MessageCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Message, User } from "@/models/user.models";
import { acceptMessageSchema } from "@/schemas/acceptMessage.schema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Loader2, RefreshCcw } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const Dashboard = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);

  const handleMessageDeletion = async (messageId: string) => {
    try {
      setMessages(prevMessages => prevMessages.filter(msg => msg._id !== messageId));

      toast.success("Message deleted successfully", {
        description: "The message has been removed from your list",
      });
      
    } catch (error) {
      console.error("Error deleting message:", error);
      toast.error("Error deleting message", {
        description: "Failed to delete the message from the list",
      });
      
    }
  };

  const { data: session } = useSession();
  const form = useForm({
    resolver: zodResolver(acceptMessageSchema),
    defaultValues: {
      acceptMessages: undefined,
    },
  });

  const { register, watch, setValue, reset } = form;

  const acceptMessages = watch("acceptMessages");
  const isChecked = typeof acceptMessages === "boolean" ? acceptMessages : false;

  const fetchAcceptMessages = useCallback(async () => {
    setIsSwitchLoading(true);
    try {
      const response = await axios.get<ApiResponse>(`/api/accept-messages`);
      setValue('acceptMessages', response.data.isAcceptingMessages);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error("Error", {
        description:
          axiosError.response?.data.message ||
          "Failed to fetch message settings",
      });
    } finally {
      setIsSwitchLoading(false);
    }
  }, [setValue]);

  const fetchMessages = useCallback(
    async (refresh: boolean = false) => {
      setIsLoading(true);
      setIsSwitchLoading(false);
      try {
        const response = await axios.get<ApiResponse>("/api/get-messages");
        // console.log("From dashboard page: ", response.data.messages);
        setMessages(Array.isArray(response.data.message) ? response.data.message : []);

        if (refresh) {
          toast.info("Refreshed Messages", {
            description: "Showing latest message",
          });
        }
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        toast.error("Error", {
          description:
            axiosError.response?.data.message ||
            "Failed to fetch message settings",
        });
      } finally {
        setIsLoading(false);
        setIsSwitchLoading(false);
      }
    },
    [setIsLoading, setMessages]
  );
  useEffect(() => {
    if (!session || !session.user) return;
    fetchMessages();
    fetchAcceptMessages();
  }, [session, setValue, fetchMessages, fetchAcceptMessages]);

  //handle switch change
  const handleSwitchChange = async (checked: boolean) => {
  setIsSwitchLoading(true);
  try {
    const response = await axios.post<ApiResponse>("/api/accept-messages", {
      acceptMessages: checked,
    });
    setValue("acceptMessages", checked);
    toast.success("Changed", { description: response.data.message });
  } catch (error) {
    console.error("Switch update failed", error);
    const axiosError = error as AxiosError<ApiResponse>;
    toast.error("Error", {
      description:
        axiosError.response?.data.message || "Failed to update setting",
    });
  } finally {
    setIsSwitchLoading(false);
  }
};

  const username = (session?.user as User)?.username;

  if (!username) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="animate-spin w-8 h-8 text-gray-600" />
      </div>
    );
  }

  //TODO: Do more research
  const baseUrl = `${window.location.protocol}//${window.location.host}`;
  const profileUrl = `${baseUrl}/u/${username}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);
    toast.success("Url Copied", {
      description: "Profile url has been copied to clipboard",
    });
  };

  if (!session || !session.user) {
    return <div>Please Login</div>;
  }

  return (
    <div className="my-8 mx-auto lg:mx-auto p-6 bg-white rounded w-full max-w-6xl">
      <h1 className="text-4xl font-bold mb-4">User Dashboard</h1>

      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Copy Your Unique Link</h2>{" "}
        <div className="flex items-center">
          <input
            type="text"
            value={profileUrl}
            disabled
            className="input input-bordered w-full p-2 mr-2"
          />
          <Button onClick={copyToClipboard}>Copy</Button>
        </div>
      </div>

      <div className="mb-4">
        <Switch
          {...register("acceptMessages")}
          checked={isChecked}
          onCheckedChange={handleSwitchChange}
          disabled={isSwitchLoading}
        />
        <span className="ml-2">
          Accept Messages: {acceptMessages ? "On" : "Off"}
        </span>
      </div>
      <Separator />

      <Button
        className="mt-4"
        variant="outline"
        onClick={(e) => {
          e.preventDefault();
          fetchMessages(true);
        }}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <RefreshCcw className="h-4 w-4" />
        )}
      </Button>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        {messages.length > 0 ? (
          messages.map((message) => (
            <MessageCard
              key={message._id as string}
              message={message}
              onMessageDelete={handleMessageDeletion}
            />
          ))
        ) : (
          <p>No messages to display.</p>
        )}
      </div>
    </div>
  );
};
export default Dashboard;
