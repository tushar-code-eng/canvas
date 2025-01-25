"use client"
import DrwaingBoard from "@/components/DrwaingBoard";
import ToolBar from '@/components/ToolBar'
import ShapesSettings from '@/components/ShapesSettings';
import LayersList from "@/components/LayersList";
import CanvasSettings from "@/components/CanvasSettings";
import CroppingSettings from "@/components/CroppingSettings";

const page = () => {
  
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

export default page
