"use client";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';

import { useEffect, useRef, useState } from "react";

import { setCanvas } from '@/features/canvasSlice'
import { setWebSocket, closeWebSocket } from "@/features/websocketSlice";
import { setSessionUrl } from '@/features/sessionSlice';

import { Canvas, Rect, Line, util, FabricObject } from "fabric";

import axios from 'axios'

import { SnappingHelpers, clearGuidelines } from './SnappingHelpers';
import useWebSocket from '@/hooks/websocket';
import { useRouter, useSearchParams } from 'next/navigation';

const DrwaingBoard = () => {

  const socket = useWebSocket(`ws://localhost:5000`)

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const canvas = useSelector((state: RootState) => state.canvas.value)
  const ws = useSelector((state: RootState) => state.webSocket)
  // const sessionUrl = useSearchParams().get('sessionUrl');

  const isPanning = useSelector((state: RootState) => state.panning.isPanning);
  const dispatch = useDispatch()

  const router = useRouter();

  const [loading, setLoading] = useState(true)

  // const [isDrawing, setIsDrawing] = useState(false);
  // const [currentShape, setCurrentShape] = useState<Rect | null>(null);

  const [guidelines, setGuidelines] = useState([])

  useEffect(() => {
    const fetchStrokes = async () => {
      console.log("Fetch Strokes Working")
      const response = await axios.get(`http://localhost:5000/api/getSession`);
      if (response.data) {
        response.data.strokes.forEach((stroke: any) => {
          util.enlivenObjects(JSON.parse(stroke.strokeData),
            {
              reviver: (objects: any) => {
                console.log("Inside Reviver")
                objects.forEach((obj: any) => canvas?.add(obj));
              }
            }
          );
        });
      }
    };

    fetchStrokes();
  }, []);

  useEffect(() => {
    const fetchSession = async () => {
      console.log("Fetch Session 1")
      const url = "http://localhost:5000"
      try {
        let response = await axios.get("http://localhost:5000/api/getSession")

        if (!response.data) {
          response = await axios.post("http://localhost:5000/api/createSession", {
            url,
            hostId: "12345",
          });
        }

        console.log(response.data)

        // dispatch(setSessionUrl(url));

      } catch (error) {
        console.log("Fetch Session 5", error)
        return;
      }
    }

    fetchSession();

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
                objects.forEach((obj: any) => canvas?.add(obj));
              }

            }
          );
        }
      };


      return () => {
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
