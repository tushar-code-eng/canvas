"use client";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { setCanvas } from '@/features/canvasSlice'

import { useEffect, useRef, useState } from "react";


import { Canvas, Rect } from "fabric";

import { SnappingHelpers,clearGuidelines } from './SnappingHelpers';

const DrwaingBoard = () => {
  const canvasRef = useRef(null);

  const canvasValue = useSelector((state: RootState) => state.canvas.value)

  const isPanning = useSelector((state: RootState) => state.panning.isPanning);
  const dispatch = useDispatch()

  const [guidelines,setGuidelines] = useState([])

  useEffect(() => {
    if (canvasRef.current) {
      const initCanvas: any = new Canvas(canvasRef.current, {
        width: 500,
        height: 500,
        backgroundColor:'#121212'
      });

      initCanvas.renderAll();

      initCanvas.on("object:moving",(event:any)=>{
        SnappingHelpers(initCanvas,event.target,guidelines,setGuidelines)
      })

      initCanvas.on("object:modified",()=>{
        clearGuidelines(initCanvas)
      })

      dispatch(setCanvas(initCanvas))

      initCanvas.on("mouse:down", (event:any) => {
        if (event.e.altKey || isPanning) {
          initCanvas.isDragging = true;
          initCanvas.selection = false;
          initCanvas.lastPosX = event.e.clientX;
          initCanvas.lastPosY = event.e.clientY;
        }
      });

      initCanvas.on("mouse:move", (event:any) => {
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

      initCanvas.on("mouse:wheel", (event:any) => {
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
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
      <canvas className="" ref={canvasRef} />
    </div>
  );
};

export default DrwaingBoard;
