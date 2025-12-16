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
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import ImageIcon from "../icons/ImageIcon";
import axios from "axios";
import { Spinner } from "@/components/ui/spinner";

export function ImageCreator() {
  const [preview, setPreview] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleGenerateButton = async () => {
    setLoading(true);

    if (!preview) return;
    try {
      const res = await axios.post(
        "http://localhost:999/create",
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
            <ImageIcon />
            <CardTitle className="text-[#09090B] font-sans text-xl font-semibold leading-7 tracking-normal">
              Result
            </CardTitle>
          </div>
        </div>
        <CardDescription className="flex items-center justify-center">
          {loading ? (
            <Spinner className="size-8" />
          ) : (
            <Input placeholder="First, enter your text to generate an image." />
          )}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
