"use client"
import DrwaingBoard from "@/components/DrwaingBoard";
import ToolBar from '../components/ToolBar';
import ShapesSettings from '../components/ShapesSettings';
import LayersList from "@/components/LayersList";
import CanvasSettings from "@/components/CanvasSettings";
import { useState } from "react";
import CroppingSettings from "@/components/CroppingSettings";

export default function Home() {

  const [refreshKey, setRefreshKey] = useState(0)

  const handleFramesUpdated = () => {
    setRefreshKey(prev => prev + 1)
  }

  return (
    <div className="w-full bg-neutral-800 h-screen">
      <DrwaingBoard />
      <div className=' flex p-4'>
        <ToolBar />
      </div>
      <LayersList />
      <ShapesSettings />
      <CanvasSettings />
      <CroppingSettings />
    </div>
  );
}
