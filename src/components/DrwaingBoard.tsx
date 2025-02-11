"use client";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';

import { useEffect, useRef, useState } from "react";

import { setCanvas, setCanvasState } from '@/features/canvasSlice'
import { setWebSocket, closeWebSocket } from "@/features/websocketSlice";
import { setSessionUrl } from '@/features/sessionSlice';

import { Canvas, Rect, Line, util, FabricObject } from "fabric";

import axios from 'axios'

import { SnappingHelpers, clearGuidelines } from './SnappingHelpers';
import useWebSocket from '@/hooks/websocket';
import { useRouter, useSearchParams, useParams, usePathname } from 'next/navigation';

const DrwaingBoard = () => {

  const socket = useWebSocket(`ws://localhost:5000`)

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // const canvas = useSelector((state: RootState) => state.canvas.value)
  const ws = useSelector((state: RootState) => state.webSocket)
  // const sessionUrl = useSearchParams().get('sessionUrl');

  const isPanning = useSelector((state: RootState) => state.panning.isPanning);
  const dispatch = useDispatch()

  // const [isDrawing, setIsDrawing] = useState(false);
  // const [currentShape, setCurrentShape] = useState<Rect | null>(null);

  const [guidelines, setGuidelines] = useState([])

  // useEffect(() => {
  //   const fetchStrokes = async () => {
  //     console.log("Fetch Strokes Working")
  //     const response = await axios.get(`http://localhost:5000/api/getSession`);
  //     if (response.data) {
  //       response.data.strokes.forEach((stroke: any) => {
  //         util.enlivenObjects(JSON.parse(stroke.strokeData),
  //           {
  //             reviver: (objects: any) => {
  //               console.log("Inside Reviver")
  //               objects.forEach((obj: any) => canvas?.add(obj));
  //             }
  //           }
  //         );
  //       });
  //     }
  //   };

  //   fetchStrokes();
  // }, []);

  const pathname = usePathname()

  useEffect(() => {
    const createSession = async () => {
      const uuid = pathname.split("/")[2]
      console.log("here is -> ", pathname)

      try {
        // let response = await axios.get(`http://localhost:5000/api/getSession?sessionId=${uuid}`)

        // if (!response.data) {
        const response = await axios.post("http://localhost:5000/api/createSession", {
          hostId: "12345",
          sessionId: uuid
        });
        // }

        console.log(response.data)

        // dispatch(setSessionUrl(url));

      } catch (error) {
        console.log("Fetch Session 5", error)
        return;
      }
    }

    createSession();

    if (canvasRef.current) {

      const socket = new WebSocket("ws://localhost:5000")
      dispatch(setWebSocket(socket));

      const parentDiv = canvasRef.current.parentElement;
      const width = parentDiv ? parentDiv.clientWidth : 500;
      const height = parentDiv ? parentDiv.clientHeight : 500;

      const initCanvas: any = new Canvas(canvasRef.current, {
        width: width,
        height: height,
        backgroundColor: 'transparent',
        isDrawingMode: false
      });

      const fetchCanvasData = async () => {
        try {
          const response = await axios.get("http://localhost:5000/get-canvas");
          const data = response.data;
          
          if (data.canvasData) {
            // Parse the canvas data if it's a string
            const canvasData = typeof data.canvasData === 'string' 
              ? JSON.parse(data.canvasData) 
              : data.canvasData;
      
            // Wait for the canvas to load completely
            await new Promise((resolve) => {
              initCanvas.loadFromJSON(canvasData, () => {
                initCanvas.renderAll();
                resolve;
              });
            });
      
            // Update the canvas in your state after loading
            dispatch(setCanvas(initCanvas));
            console.log("✅ Canvas restored from Redis!");
            
            // Force a re-render after loading
            initCanvas.requestRenderAll();
          }
        } catch (error) {
          console.error("❌ Failed to load canvas:", error);
          console.error("Error details:", (error as Error).message);
        }
      };

      fetchCanvasData();

      initCanvas.on('after:render', () => {
        console.log("Canvas rendered");
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

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === "stroke-created") {

          const strokeData = data.stroke.strokeData;

          console.log("The stroke data ", strokeData)
          util.enlivenObjects([strokeData],
            {
              reviver: (objects: any) => {
                objects.forEach((obj: any) => initCanvas?.add(obj));
              }

            }
          );
        }
      };

      const updateCanvasState = () => {
        dispatch(setCanvasState(initCanvas.toJSON()));
      };

      initCanvas.on("object:modified", updateCanvasState);
      initCanvas.on("object:added", updateCanvasState);
      initCanvas.on("object:removed", updateCanvasState);


      return () => {
        initCanvas.dispose();
        initCanvas.off("object:modified", updateCanvasState);
        initCanvas.off("object:added", updateCanvasState);
        initCanvas.off("object:removed", updateCanvasState);
        initCanvas.dispose();
        dispatch(closeWebSocket());
      };
    }
  }, [dispatch]);



  return (
    <canvas className="w-full h-full" ref={canvasRef} />
  );
};

export default DrwaingBoard;
