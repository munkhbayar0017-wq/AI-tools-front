import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageAnalysis } from "@/app/_components/ImageAnalysis";
import Header from "./_components/Header";
import { IngredientRecognition } from "./_components/IngredientRecognition";
import { ImageCreator } from "./_components/ImageCreator";
import Chat from "./_components/Chat";

export default function Home() {
  return (
    <div className="relative w-screen h-screen flex flex-col items-center justify-start">
      <Header />
      <div className="flex w-145 h-screen flex-col gap-6 py-6">
        <Tabs defaultValue="Image analysis" className="flex flex-col gap-6">
          <TabsList>
            <TabsTrigger value="Image analysis" className="cursor-pointer">
              Image analysis
            </TabsTrigger>
            <TabsTrigger
              value="Ingredient recognition"
              className="cursor-pointer"
            >
              Ingredient recognition
            </TabsTrigger>
            <TabsTrigger value="Image creator" className="cursor-pointer">
              Image creator
            </TabsTrigger>
          </TabsList>
          <TabsContent value="Image analysis">
            <ImageAnalysis />
          </TabsContent>
          <TabsContent value="Ingredient recognition">
            <IngredientRecognition />
          </TabsContent>
          <TabsContent value="Image creator">
            <ImageCreator />
          </TabsContent>
        </Tabs>
      </div>
      <Chat className="fixed right-6 bottom-6" />
    </div>
  );
}
