"use client";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { setCanvas } from '@/features/canvasSlice'

import { useEffect, useRef, useState } from "react";


import { Canvas, Rect, Line } from "fabric";

import { SnappingHelpers, clearGuidelines } from './SnappingHelpers';

const DrwaingBoard = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const canvas = useSelector((state: RootState) => state.canvas.value)

  const isPanning = useSelector((state: RootState) => state.panning.isPanning);
  const dispatch = useDispatch()

  const [isDrawing, setIsDrawing] = useState(false);
  const [currentShape, setCurrentShape] = useState<Rect | null>(null);

  const [guidelines, setGuidelines] = useState([])

  useEffect(() => {
    if (canvasRef.current) {
      const parentDiv = canvasRef.current.parentElement;
      const width = parentDiv ? parentDiv.clientWidth : 500;
      const height = parentDiv ? parentDiv.clientHeight : 500;

      const initCanvas: any = new Canvas(canvasRef.current, {
        width: width,
        height: height,
        backgroundColor: 'transparent',
        isDrawingMode:false
      });

      initCanvas.renderAll();

      initCanvas.on("object:moving", (event: any) => {
        SnappingHelpers(initCanvas, event.target, guidelines, setGuidelines)
      })

      initCanvas.on("object:modified", () => {
        clearGuidelines(initCanvas)
      })

      dispatch(setCanvas(initCanvas))

      initCanvas.on("mouse:down", (event: any) => {
        if (event.e.altKey || isPanning) {
          initCanvas.isDragging = true;
          initCanvas.selection = false;
          initCanvas.lastPosX = event.e.clientX;
          initCanvas.lastPosY = event.e.clientY;
        }
      });

      initCanvas.on("mouse:move", (event: any) => {
        if (initCanvas.isDragging) {
          const vpt = initCanvas.viewportTransform!;
          vpt[4] += event.e.clientX - initCanvas.lastPosX!;
          vpt[5] += event.e.clientY - initCanvas.lastPosY!;
          initCanvas.requestRenderAll();
          initCanvas.lastPosX = event.e.clientX;
          initCanvas.lastPosY = event.e.clientY;
        }
      });

      initCanvas.on("mouse:up", () => {
        initCanvas.isDragging = false;
        initCanvas.selection = true;
      });

      initCanvas.on("mouse:wheel", (event: any) => {
        const delta = event.e.deltaY;
        const zoom = initCanvas.getZoom();
        const newZoom = zoom * (delta > 0 ? 0.9 : 1.1);
        initCanvas.zoomToPoint({ x: event.e.offsetX, y: event.e.offsetY }, newZoom);
        event.e.preventDefault();
        event.e.stopPropagation();
      });


      return () => {
        initCanvas.dispose();
      };
    }
  }, []);



  return (
    <canvas className="w-full h-full" ref={canvasRef} />
  );
};

export default DrwaingBoard;
