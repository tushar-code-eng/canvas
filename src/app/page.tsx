"use client"
import DrwaingBoard from "@/components/DrwaingBoard";
import ToolBar from '../components/ToolBar';
import ShapesSettings from '../components/ShapesSettings';
import LayersList from "@/components/LayersList";

export default function Home() {
  return (
    <div className="w-full">
      <DrwaingBoard />
      <div className=' flex p-4'>
        <ToolBar />
      </div>
      <LayersList />
      <ShapesSettings />
    </div>
  );
}
