"use client";
import { useState } from "react";
import ChatIcon from "../icons/ChatIcon";
import XIcon from "../icons/XIcon";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendIcon } from "lucide-react";
import axios from "axios";

type FunctionProps = {
  className?: string;
};
type Message = {
  role: "user" | "assistant";
  content: string;
};
type BackendResponse = {
  chatText: string;
  resChat: {
    role: "assistant";
    content: string;
  };
};

export default function Chat({ className }: FunctionProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [chat, setChat] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  const handleResponse = (data: BackendResponse) => {
    setMessages((prev: Message[]) => [
      ...prev,
      { role: "user", content: data.chatText },
      { role: "assistant", content: data.resChat.content },
    ]);
  };

  const handleSendButton = async () => {
    try {
      const res = await axios.post(
        "http://localhost:999/chat",
        { text: chat },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      handleResponse(res.data);
      setChat("");
      console.log("response from backend:", res.data);
    } catch (err) {
      console.error("chat.tsx error", err);
    }
  };
  const handleClickChatButton = () => setIsOpen(true);
  const handleClickX = () => setIsOpen(false);
  return (
    <div className={className || ""}>
      {isOpen ? (
        <div className="w-95 h-118 flex flex-col justify-between">
          <div className="w-full h-12 border rounded-t-lg flex items-center justify-between py-2 px-4">
            <div className="text-[#09090B] font-sans text-base font-medium leading-6 tracking-normal">
              Chat assistant
            </div>
            <div
              onClick={handleClickX}
              className="cursor-pointer h-8 w-8 rounded-md border flex items-center justify-center
             hover:bg-gray-100/50 transition-colors duration-200"
            >
              <XIcon />
            </div>
          </div>
          <div className="w-full h-full border-x overflow-scroll p-4 flex flex-col gap-2">
            {messages.map((text, index) => (
              <div
                key={index}
                className={`flex ${
                  text.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm leading-relaxed shadow
          ${
            text.role === "user"
              ? "bg-blue-600 text-white rounded-br-sm"
              : "bg-gray-100 text-gray-900 rounded-bl-sm"
          }`}
                >
                  {text.content}
                </div>
              </div>
            ))}
          </div>
          <div className="w-full h-14 border rounded-b-lg py-2 px-4 flex items-center justify-between gap-2">
            <Input
              placeholder="Type your message..."
              onChange={(e) => {
                setChat(e.target.value);
              }}
            />
            <Button
              className="rounded-full w-10 h-10 cursor-pointer"
              onClick={handleSendButton}
              disabled={!chat}
            >
              <SendIcon />
            </Button>
          </div>
        </div>
      ) : (
        <div
          onClick={handleClickChatButton}
          className="cursor-pointer flex items-center justify-center w-12 h-12 bg-[#18181B] rounded-full hover:bg-[#27272A] transition-colors duration-200"
        >
          <ChatIcon />
        </div>
      )}
    </div>
  );
}
