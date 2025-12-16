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
import { Input } from "@/components/ui/input";
import GeminiIcon from "../icons/GeminiIcon";
import ReloadIcon from "../icons/ReloadIcon";
import FileIcon from "../icons/FileIcon";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { Spinner } from "@/components/ui/spinner";

export function IngredientRecognition() {
  const [preview, setPreview] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleGenerateButton = async () => {
    setLoading(true);

    if (!preview) return;
    try {
      const res = await axios.post(
        "http://localhost:999/ingredient",
        { text: preview },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("response from backend:", res.data);
    } catch (err) {
      console.error("ingredient error", err);
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  const handleClickRefreshButton = () => {
    setPreview("");
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
          ) : (
            <Input placeholder="First, enter your text to recognize an ingredients." />
          )}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
