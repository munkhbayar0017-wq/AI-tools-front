"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import GeminiIcon from "../icons/GeminiIcon";
import ReloadIcon from "../icons/ReloadIcon";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import ImageIcon from "../icons/ImageIcon";
import axios from "axios";
import Image from "next/image";
import { motion } from "framer-motion";
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
export function ImageCreator() {
  const [preview, setPreview] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [imageURL, setImageURL] = useState<string>("");

  const handleGenerateButton = async () => {
    if (loading || !preview) return;
    setLoading(true);

    if (!preview) return;
    try {
      const res = await axios.post(
        "https://ai-tools-back.onrender.com/create",
        { text: preview },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setImageURL(res.data.image);
    } catch (err) {
      console.error("ingredient error", err);
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  const handleClickRefreshButton = () => {
    setPreview("");
    setImageURL("");
  };
  return (
    <Card className="border-none">
      <CardHeader>
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <GeminiIcon />
            <CardTitle className="text-[#09090B] font-sans text-xl font-semibold leading-7 tracking-normal">
              Food image creator
            </CardTitle>
          </div>
          <Button
            onClick={handleClickRefreshButton}
            className="cursor-pointer bg-white border transition-all duration-300 hover:bg-gray-100 hover:shadow-md hover:scale-105 active:scale-95 group"
          >
            <ReloadIcon />
          </Button>
        </div>
        <CardDescription>
          What food image do you want? Describe it briefly.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid w-full items-center gap-3">
          <Textarea
            value={preview}
            placeholder="Хоолны тайлбар."
            onChange={(e) => {
              const value = e.target.value;
              setPreview(value);
            }}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          disabled={!preview || loading}
          onClick={handleGenerateButton}
          className="cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-105 active:scale-95 group"
        >
          {loading ? "Generating..." : "Generate"}
        </Button>
      </CardFooter>
      <CardHeader>
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <ImageIcon />
            <CardTitle className="text-[#09090B] font-sans text-xl font-semibold leading-7 tracking-normal">
              Result
            </CardTitle>
          </div>
        </div>
        <CardDescription className="flex items-center justify-start">
          {loading ? (
            <div className="w-35 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <ThinkingDots />
            </div>
          ) : imageURL ? (
            <Image
              src={imageURL}
              alt="imageURL"
              width={360}
              height={360}
              className="rounded-lg object-cover"
            />
          ) : (
            <div className="text-sm text-muted-foreground">
              First, enter your text to generate an image.
            </div>
          )}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
