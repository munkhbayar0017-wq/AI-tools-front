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
import axios from "axios";
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
export function ImageAnalysis() {
  const [preview, setPreview] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState({ reason: "", content: "" });

  const handleDeleteFile = () => {
    setPreview("");
    setFile(null);
  };
  const handleGenerateButton = async () => {
    setLoading(true);
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await axios.post(
        "https://ai-tools-back.onrender.com/file/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResult({
        reason: res.data.description.reasoning_content,
        content: res.data.description.content,
      });
    } catch (err) {
      console.error("upload error", err);
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  const handleClickRefreshButton = () => {
    setPreview("");
    setResult({ reason: "", content: "" });
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
          <Button
            onClick={handleClickRefreshButton}
            className="cursor-pointer bg-white border transition-all duration-300 hover:bg-gray-100 hover:shadow-md hover:scale-105 active:scale-95 group"
          >
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
                const selectedFile = e.target.files?.[0];
                if (selectedFile) {
                  setPreview(URL.createObjectURL(selectedFile));
                  setFile(selectedFile);
                }
              }}
            />
          )}
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
              Image analysis
            </CardTitle>
          </div>
        </div>
        <CardDescription className="flex items-center justify-start">
          {loading ? (
            <div className="w-35 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <ThinkingDots />
            </div>
          ) : result.content ? (
            <div className="w-full overflow-scroll rounded-xl border p-5 text-sm text-gray-900 leading-relaxed shadow-md font-sans">
              <div>Reason:</div>
              {result.reason ?? ""}
              <div>Conclusion:</div>
              {result.content ?? ""}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              First, upload your image and click Generate to see AI analysis.
            </p>
          )}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
