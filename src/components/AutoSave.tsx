"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import axios from "axios";

const AutoSave = () => {
  const canvasJSON = useSelector((state: RootState) => state.canvas.json);
  let saveTimeout: NodeJS.Timeout;

  useEffect(() => {
    if (!canvasJSON) return;

    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(async() => {
      try {
        const response = await axios.post("http://localhost:5000/api/saveCanvasRedis", { canvasData: canvasJSON });
        const data = await response.data;
        console.log("Canvas auto-saved:", data);
      } catch (error) {
        console.error("Error auto-saving canvas:", error);
      }
    }, 1000); // Save after 1 second debounce

    return () => clearTimeout(saveTimeout);
  }, [canvasJSON]);

  return null; // No UI, just handles auto-saving
};

export default AutoSave;
