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
import Image from "next/image";
import { TrashIcon } from "lucide-react";

export function ImageAnalysis() {
  const [preview, setPreview] = useState<string>("");

  const handleDeleteFile = () => {
    setPreview("");
  };
  return (
    <Card className="border-none">
      <CardHeader>
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <GeminiIcon />
            <CardTitle className="text-[#09090B] font-sans text-xl font-semibold leading-7 tracking-normal">
              Image analysis
            </CardTitle>
          </div>
          <Button className="cursor-pointer bg-white border transition-all duration-300 hover:bg-gray-100 hover:shadow-md hover:scale-105 active:scale-95 group">
            <ReloadIcon />
          </Button>
        </div>
        <CardDescription>
          Upload a food photo, and AI will detect the ingredients.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid w-full items-center gap-3">
          {preview ? (
            <div className="relative">
              <Image
                src={preview}
                alt="Preview"
                width={200}
                height={133}
                className="p-1 border rounded-lg object-cover"
              />
              <div
                className="absolute cursor-pointer left-41.5 bg-white bottom-2.5 border w-6 h-6 rounded-sm flex items-center justify-center transition-all duration-300 hover:bg-gray-100 hover:shadow-md hover:scale-105 active:scale-95 group"
                onClick={handleDeleteFile}
              >
                <TrashIcon className="w-4 h-4" />
              </div>
            </div>
          ) : (
            <Input
              id="picture"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setPreview(URL.createObjectURL(file));
                }
              }}
            />
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          disabled={!preview}
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
              Image analysis
            </CardTitle>
          </div>
        </div>
        <CardDescription>
          <Input placeholder="First, enter your image to recognize an ingredients." />
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
