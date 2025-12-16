"use client";
import { useState } from "react";
import ChatIcon from "../icons/ChatIcon";
import XIcon from "../icons/XIcon";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendIcon } from "lucide-react";

type FunctionProps = {
  className?: string;
};

export default function Chat({ className }: FunctionProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
          <div className="w-full h-full border-x"></div>
          <div className="w-full h-14 border rounded-b-lg py-2 px-4 flex items-center justify-between gap-2">
            <Input placeholder="Type your message..." />
            <Button className="rounded-full w-10 h-10 cursor-pointer">
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
