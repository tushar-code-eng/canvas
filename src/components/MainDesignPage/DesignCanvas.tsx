"use client"
import { useSelector } from "react-redux";
import DrwaingBoard from "../DrwaingBoard";
import { RootState } from "@/store/store";
export default function DesignCanvas() {

  const canvasBg = useSelector((state: RootState) => state.canvasBg.canvasBgValue);

  

  return (
    <div className="flex-1 bg-gray-50 p-4 overflow-auto">

      <div className={`w-full overflow-hidden h-full min-h-[300px] border-2 border-dashed ${canvasBg} border-gray-300 rounded-lg `}>
        <DrwaingBoard />
      </div>
    </div>
  )
}

