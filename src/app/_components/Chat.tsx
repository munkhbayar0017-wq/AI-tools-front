"use client";
import { useState, useRef, useEffect } from "react";
import ChatIcon from "../icons/ChatIcon";
import XIcon from "../icons/XIcon";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendIcon } from "lucide-react";
import axios from "axios";
import { motion } from "framer-motion";

type FunctionProps = {
  className?: string;
};
type Message = {
  role: "user" | "assistant";
  content: string;
  thinking?: boolean;
};

export default function Chat({ className }: FunctionProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [chat, setChat] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const ThinkingDots = () => {
    return (
      <div className="flex items-center gap-1 text-gray-500">
        <span>Thinking</span>
        {[0, 0.2, 0.4].map((delay, i) => (
          <motion.span
            key={i}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 1, delay }}
          >
            .
          </motion.span>
        ))}
      </div>
    );
  };

  const handleSendButton = async () => {
    if (!chat.trim() || loading) return;

    const userMessage = chat.trim();
    setChat("");

    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);

    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: "", thinking: true },
    ]);

    setLoading(true);

    try {
      const res = await axios.post(
        "https://ai-tools-back.onrender.com/chat",
        { text: userMessage },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setMessages((prev) => [
        ...prev.filter((m) => !m.thinking),
        {
          role: "assistant",
          content: res.data.resChat.content,
        },
      ]);
    } catch (err) {
      console.error("chat.tsx error", err);

      setMessages((prev) => [
        ...prev.filter((m) => !m.thinking),
        {
          role: "assistant",
          content: "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
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
          <div className="w-full h-full border-x overflow-y-auto p-4 flex flex-col gap-2">
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
                  {text.thinking ? (
                    <ThinkingDots />
                  ) : (
                    <div className="whitespace-pre-wrap">{text.content}</div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="w-full h-14 border rounded-b-lg py-2 px-4 flex items-center justify-between gap-2">
            <Input
              placeholder="Type your message..."
              onChange={(e) => {
                setChat(e.target.value);
              }}
              value={chat}
              onKeyDown={async (e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  await handleSendButton();
                }
              }}
              disabled={loading}
            />
            <Button
              className="rounded-full w-10 h-10 cursor-pointer"
              onClick={handleSendButton}
              disabled={!chat.trim() || loading}
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
