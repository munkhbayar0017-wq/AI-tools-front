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
import FileIcon from "../icons/FileIcon";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { motion } from "framer-motion";

export function IngredientRecognition() {
  const [preview, setPreview] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<string>("");

  const handleGenerateButton = async () => {
    if (!preview) return;

    setLoading(true);
    try {
      const res = await axios.post(
        "https://ai-tools-back.onrender.com/ingredient",
        { text: preview },
        { headers: { "Content-Type": "application/json" } }
      );
      setResult(res.data.response);
    } catch (err) {
      console.error("ingredient error", err);
      setResult("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

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

  const handleClickRefreshButton = () => {
    setPreview("");
    setResult("");
  };

  return (
    <Card className="border-none">
      <CardHeader>
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <GeminiIcon />
            <CardTitle className="text-[#09090B] font-sans text-xl font-semibold leading-7 tracking-normal">
              Ingredient recognition
            </CardTitle>
          </div>
          <Button
            className="cursor-pointer bg-white border transition-all duration-300 hover:bg-gray-100 hover:shadow-md hover:scale-105 active:scale-95 group"
            onClick={handleClickRefreshButton}
          >
            <ReloadIcon />
          </Button>
        </div>
        <CardDescription>
          Describe the food, and AI will detect the ingredients.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid w-full items-center gap-3">
          <Textarea
            value={preview}
            placeholder="Орц тодорхойлох."
            onChange={(e) => {
              const value = e.target.value;
              setPreview(value);
            }}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          disabled={!preview}
          onClick={handleGenerateButton}
          className="cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-105 active:scale-95 group"
        >
          Generate
        </Button>
      </CardFooter>
      <CardHeader>
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <FileIcon />
            <CardTitle className="text-[#09090B] font-sans text-xl font-semibold leading-7 tracking-normal">
              Identified Ingredients
            </CardTitle>
          </div>
        </div>
        <CardDescription className="flex items-center justify-start">
          {loading ? (
            <div className="w-35 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <ThinkingDots />
            </div>
          ) : result ? (
            <div className="w-full overflow-scroll rounded-xl border p-5 text-sm text-gray-900 leading-relaxed shadow-md font-sans">
              {result}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              First, enter text and click Generate to see AI analysis.
            </p>
          )}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
