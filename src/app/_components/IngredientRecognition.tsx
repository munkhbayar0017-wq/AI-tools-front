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
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { Spinner } from "@/components/ui/spinner";

type TypingTextProps = {
  text: string;
  speed?: number;
};

export function TypingText({ text, speed = 20 }: TypingTextProps) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed((prev) => prev + text[i]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);
  return <p className="whitespace-pre-wrap">{displayed}</p>;
}

export function IngredientRecognition() {
  const [preview, setPreview] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<string>("");

  const handleGenerateButton = async () => {
    if (!preview) return;

    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:999/ingredient",
        { text: preview },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("lalalal", res.data.response.content);

      setResult(
        typeof res.data.response.content === "string"
          ? res.data.response.content
          : JSON.stringify(res.data.response.content, null, 2)
      );
    } catch (err) {
      console.error("ingredient error", err);
      setResult("Something went wrong.");
    } finally {
      setLoading(false);
    }
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
        <CardDescription className="flex items-center justify-center">
          {loading ? (
            <Spinner className="size-8" />
          ) : result ? (
            <div className="w-full h-115 overflow-scroll rounded-xl border p-5 text-sm text-gray-900 leading-relaxed shadow-md font-sans">
              <TypingText text={result} speed={20} />
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
