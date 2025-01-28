"use client"
import { useSelector } from "react-redux";
import DrwaingBoard from "../DrwaingBoard";
import { RootState } from "@/store/store";
import { useEffect } from "react";

export default function DesignCanvas() {

  const canvasBg = useSelector((state: RootState) => state.canvasBg.canvasBgValue);

  useEffect(() => {

  }, [])

  return (
    <div className="flex-1 bg-gray-50 p-4 overflow-auto">

      <div className={`w-full overflow-hidden h-full min-h-[300px] border-2 border-dashed ${canvasBg} border-gray-300 rounded-lg `}>
        <DrwaingBoard />
      </div>
    </div>
  )
}

