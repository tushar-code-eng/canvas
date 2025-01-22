"use client";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { setCanvas } from '@/features/canvasSlice'

import { useEffect, useRef } from "react";


import { Canvas, Rect } from "fabric";
import ToolBar from './ToolBar';
import ShapesSettings from './ShapesSettings';

const DrwaingBoard = () => {
  const canvasRef = useRef(null);

  const canvasValue = useSelector((state: RootState) => state.canvas.value)
  const dispatch = useDispatch()

  useEffect(() => {
    if (canvasRef.current) {
      const initCanvas: any = new Canvas(canvasRef.current, {
        width: 500,
        height: 500,
      });

      initCanvas.backgroundColor = "#e1e8e3";
      initCanvas.renderAll();

      console.log(initCanvas)

      dispatch(setCanvas(initCanvas))

      return () => {
        initCanvas.dispose();
      };
    }
  }, []);

  

  return (
    <div className="">
      
      <div className=' inline-block sticky text-white left-2 bg-black p-2 rounded-xl'>
        <ToolBar />
      </div>
      <div className=" absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <canvas className="" ref={canvasRef} />
      </div>
      <ShapesSettings />
    </div>
  );
};

export default DrwaingBoard;
