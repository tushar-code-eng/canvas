"use client"

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { setCanvas } from '@/features/canvasSlice'
import { Canvas, Circle, Triangle, Rect, Line, Group, Path, PencilBrush, PatternBrush, Shadow, Text, IText, Textbox, Polyline, util } from "fabric";

import Crop54Icon from "@mui/icons-material/Crop54";
import Brightness1OutlinedIcon from '@mui/icons-material/Brightness1Outlined';
import ChangeHistoryOutlinedIcon from '@mui/icons-material/ChangeHistoryOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import RemoveIcon from '@mui/icons-material/Remove';
import NorthWestIcon from '@mui/icons-material/NorthWest';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import TitleOutlinedIcon from '@mui/icons-material/TitleOutlined';
import AirlineStopsIcon from '@mui/icons-material/AirlineStops';

import { togglePanning } from "../features/panningSlice";

import { useEffect, useState } from 'react';
import Cropping from './Cropping';

import Mouse from '../assets/main/mouse.svg'
import LineDrawer from './subComponents/CurveLines';
import useWebSocket from '@/hooks/websocket';

interface CustomCanvas extends Canvas {
    isDragging?: boolean; // Add the isDragging property
}

const ToolBar = () => {
    let socketURL = " "

    const socket = useWebSocket(socketURL)

    const canvas = useSelector((state: RootState) => state.canvas.value)
    const ws = useSelector((state: RootState) => state.webSocket.ws)


    const selectedObject = useSelector((state: RootState) => state.shape.selectedShape) as any;

    const dispatch = useDispatch()

    const [normal, setNormal] = useState(true)
    const [isRect, setIsRect] = useState(false)
    const [isCircle, setIsCircle] = useState(false)
    const [isStraightLine, setIsStraightLine] = useState(false)
    const [isLine, setIsLine] = useState(false)
    const [isPen, setIsPen] = useState(false);
    const [isText, setIsText] = useState(false)
    let path: Path | null = null;

    const [isDrawingMode, setIsDrawingMode] = useState(false);

    let points: { x: number; y: number }[] = [];
    let isDragging = false; // Custom variable to track dragging state

    const disablePanning = () => {
        (canvas as CustomCanvas).isDragging = false; // Use the custom interface
    };

    useEffect(() => {
        if (!canvas || !isRect) return;

        let isDrawing = false;
        let origX: number, origY: number;


        const handleMouseDown = (o: any) => {
            isDrawing = true;
            var pointer = canvas.getPointer(o.e);
            origX = pointer.x;
            origY = pointer.y;
            canvas.selection = false
            const rect = new Rect({
                left: pointer.x,
                top: pointer.y,
                width: 0,
                height: 0,
                fill: '#ffffff',
                stroke: '#000000',
                strokeWidth: 1,
                originX: 'center',
                originY: 'center',
                // strokeDashArray: [10, 5]
            });
            canvas.add(rect);
        };

        const handleMouseMove = (o: any) => {
            if (!isDrawing) return;
            var pointer = canvas.getPointer(o.e);
            var rect = canvas.getObjects()[canvas.getObjects().length - 1];
            rect.set({ width: Math.abs(pointer.x - origX), height: Math.abs(pointer.y - origY) });
            rect.set({ left: Math.min(pointer.x, origX) + rect.width / 2, top: Math.min(pointer.y, origY) + rect.height / 2 });
            canvas.renderAll();
        };

        const handleMouseUp = () => {
            isDrawing = false;
            canvas.selection = true
            canvas.setActiveObject(canvas.getObjects()[canvas.getObjects().length - 1])
            setIsRect(false)
        };

        canvas.on('mouse:down', handleMouseDown);
        canvas.on('mouse:move', handleMouseMove);
        canvas.on('mouse:up', handleMouseUp);

        return () => {
            canvas.off('mouse:down', handleMouseDown);
            canvas.off('mouse:move', handleMouseMove);
            canvas.off('mouse:up', handleMouseUp);
        };
    }, [canvas, isRect]);


    useEffect(() => {
        if (!canvas || !isCircle) return;

        let isDrawing = false;
        let origX: number, origY: number

        const handleMouseDown = (o: any) => {
            isDrawing = true;
            const pointer = canvas.getPointer(o.e);
            origX = pointer.x;
            origY = pointer.y;
            canvas.selection = false
            const circle = new Circle({
                left: pointer.x,
                top: pointer.y,
                radius: 0,
                fill: '#ffffff',
                stroke: '#000000',
                strokeWidth: 1,
                originX: 'center',
                originY: 'center',
                selectable: true
            });
            canvas.add(circle);
        };

        const handleMouseMove = (o: any) => {
            if (!isDrawing) return;
            const pointer = canvas.getPointer(o.e);
            const circle = canvas.getObjects()[canvas.getObjects().length - 1];
            const radius = Math.abs(origX - pointer.x) / 2;
            circle.set({
                radius: radius,
                left: origX + (pointer.x - origX) / 2,
                top: origY + (pointer.y - origY) / 2
            });
            canvas.renderAll();
        };

        const handleMouseUp = () => {
            isDrawing = false;
            canvas.selection = true
            canvas.setActiveObject(canvas.getObjects()[canvas.getObjects().length - 1])
            setIsCircle(false)
        };

        canvas.on('mouse:down', handleMouseDown);
        canvas.on('mouse:move', handleMouseMove);
        canvas.on('mouse:up', handleMouseUp);

        return () => {
            canvas.off('mouse:down', handleMouseDown);
            canvas.off('mouse:move', handleMouseMove);
            canvas.off('mouse:up', handleMouseUp);
        };
    }, [canvas, isCircle]);


    useEffect(() => {
        if (!canvas || !isStraightLine) return;

        let isDrawing = false;
        let origX: number, origY: number;

        const handleMouseDown = (o: any) => {
            isDrawing = true;
            const pointer = canvas.getPointer(o.e);
            origX = pointer.x;
            origY = pointer.y;
            canvas.selection = false;

            const points: [number, number, number, number] = [pointer.x, pointer.y, pointer.x, pointer.y];
            const line = new Line(points, {
                fill: 'white',
                stroke: 'black',
                strokeWidth: 1,
                selectable: true,
                hasControls: false,
                evented: true
            });
            canvas.add(line);
        };

        const handleMouseMove = (o: any) => {
            if (!isDrawing) return;
            const pointer = canvas.getPointer(o.e);
            const line = canvas.getObjects()[canvas.getObjects().length - 1] as Line;

            // Calculate the angle of the line
            const angle = Math.atan2(pointer.y - origY, pointer.x - origX);
            const length = Math.sqrt(Math.pow(pointer.x - origX, 2) + Math.pow(pointer.y - origY, 2));

            // Update the line's endpoint based on the angle and length
            line.set({
                x2: origX + length * Math.cos(angle),
                y2: origY + length * Math.sin(angle)
            });
            canvas.renderAll();
        };

        const handleMouseUp = () => {
            if (!isDrawing) return;
            isDrawing = false;

            const line = canvas.getObjects()[canvas.getObjects().length - 1] as Line;
            const endX = line.x2 || 0;
            const endY = line.y2 || 0;
            const startX = line.x1 || 0;
            const startY = line.y1 || 0;

            // Calculate line length
            const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));

            // Only create triangle if line has meaningful length
            if (length > 1) {
                const angle = Math.atan2(endY - startY, endX - startX) * 180 / Math.PI;

                const triangle = new Triangle({
                    left: endX,
                    top: endY,
                    fill: 'white',
                    stroke: 'black',
                    width: 15,
                    height: 15,
                    angle: angle + 90,
                    originX: 'center',
                    originY: 'center',
                    selectable: true,
                    hasControls: true,
                    evented: true
                });

                canvas.add(triangle);

                // Group line and triangle
                const lineAndArrow = [line, triangle];
                const group = new Group(lineAndArrow, {
                    hasControls: false,
                    selectable: true
                });

                canvas.remove(line, triangle);
                canvas.add(group);
            }

            canvas.selection = true;
            // canvas.setActiveObject(canvas.getObjects()[canvas.getObjects().length - 1]);
            setIsStraightLine(false);

            canvas.renderAll();
        };

        canvas.on('mouse:down', handleMouseDown);
        canvas.on('mouse:move', handleMouseMove);
        canvas.on('mouse:up', handleMouseUp);

        return () => {
            canvas.off('mouse:down', handleMouseDown);
            canvas.off('mouse:move', handleMouseMove);
            canvas.off('mouse:up', handleMouseUp);
        };
    }, [canvas, isStraightLine]);









    let isPanning = false; // Custom variable to track panning state

    // Store original panning state
    const originalPanning = isPanning; // Use the custom variable

    useEffect(() => {
        if (!canvas || !isLine) return;

        let currentPath: Path | null = null;
        let points: { x: number; y: number }[] = [];

        // Store original state using a local variable
        let isCurrentlyDrawing = false;

        const createSmoothLine = (points: { x: number; y: number }[]) => {
            if (points.length < 2) return '';

            let path = `M ${points[0].x} ${points[0].y}`;

            if (points.length === 2) {
                path += ` L ${points[1].x} ${points[1].y}`;
                return path;
            }

            for (let i = 1; i < points.length - 2; i = i + 3) {
                console.log("x->", points[i].x, "y->", points[i].y)
                const xc = (points[i].x + points[i + 1].x) / 2;
                const yc = (points[i].y + points[i + 1].y) / 2;
                path += `Q ${points[i].x} ${points[i].y}, ${xc} ${yc}`;
            }

            const n = points.length - 1;
            path += ` Q ${points[n - 1].x} ${points[n - 1].y}, ${points[n].x} ${points[n].y}`;

            return path;
        };

        const createArrowhead = (fromX: number, fromY: number, toX: number, toY: number) => {
            const angle = Math.atan2(toY - fromY, toX - fromX);
            const headLength = 15;
            const headAngle = Math.PI / 6;

            const x1 = toX - headLength * Math.cos(angle - headAngle);
            const y1 = toY - headLength * Math.sin(angle - headAngle);
            const x2 = toX - headLength * Math.cos(angle + headAngle);
            const y2 = toY - headLength * Math.sin(angle + headAngle);

            return new Path(
                `M ${toX} ${toY} L ${x1} ${y1} M ${toX} ${toY} L ${x2} ${y2}`,
                {
                    stroke: 'black',
                    fill: '',
                    strokeWidth: 2
                }
            );
        };

        const updateCurrentPath = () => {
            if (!currentPath) return;

            const pathString = createSmoothLine(points);
            currentPath.set({ path: util.makePathSimpler(util.parsePath(pathString)) });
            canvas.requestRenderAll();
        };

        const handleMouseDown = (o: any) => {
            if (!isLine || (o.e as MouseEvent).altKey || (o.e as MouseEvent).button === 2) return;

            const pointer = canvas.getPointer(o.e);

            if (!currentPath) {
                isCurrentlyDrawing = true;
                points = [{ x: pointer.x, y: pointer.y }];
                currentPath = new Path(`M ${pointer.x} ${pointer.y}`, {  // Update this line
                    stroke: 'black',
                    strokeWidth: 2,
                    fill: '',
                    selectable: false,
                    evented: false
                });
                canvas.add(currentPath);
            } else {
                points.push({ x: pointer.x, y: pointer.y });
                updateCurrentPath();
            }
        };

        // const handleMouseMove = (o: any) => {
        //     if (!currentPath || !isCurrentlyDrawing) return;
        //     const pointer = canvas.getPointer(o.e);
        //     const tempPoints = [...points, { x: pointer.x, y: pointer.y }];
        //     console.log("running", tempPoints)
        //     const pathString = createSmoothLine(tempPoints);

        //     currentPath.set({ path: util.makePathSimpler(util.parsePath(pathString)) });
        //     canvas.requestRenderAll();
        // };

        // const handleMouseMove = (o: any) => {
        //     if (!currentPath || !isCurrentlyDrawing) return;

        //     const pointer = canvas.getPointer(o.e);
        //     const tempPoints = [...points, { x: pointer.x, y: pointer.y }];

        //     // Create a simple path string connecting all points with straight lines
        //     let pathString = `M ${points[0].x} ${points[0].y}`;
        //     for (let i = 1; i < tempPoints.length; i++) {
        //         pathString += ` L ${tempPoints[i].x} ${tempPoints[i].y}`;
        //     }

        //     // Update the path directly without using util.makePathSimpler
        //     currentPath.set({ path: pathString });
        //     canvas.requestRenderAll();
        // };

        const handleMouseMove = (o: any) => {
            if (!currentPath || !isCurrentlyDrawing) return;

            const pointer = canvas.getPointer(o.e);
            const tempPoints = [...points, { x: pointer.x, y: pointer.y }];

            // Create a simple path string connecting all points with straight lines
            let pathString = `M ${points[0].x} ${points[0].y}`;
            for (let i = 1; i < tempPoints.length; i++) {
                pathString += ` L ${tempPoints[i].x} ${tempPoints[i].y}`;
            }

            // Update the path directly without using util.makePathSimpler
            currentPath.set({ path: pathString });
            canvas.requestRenderAll();
        };

        const handleMouseUp = (o: any) => {
            isCurrentlyDrawing = false;
        };

        const handleDblClick = (o: any) => {
            if (!currentPath || points.length < 2) return;

            const pointer = canvas.getPointer(o.e);
            points.push({ x: pointer.x, y: pointer.y });

            // Create final smooth path
            const pathString = createSmoothLine(points);
            const finalPath = new Path(pathString, {
                stroke: 'black',
                strokeWidth: 2,
                fill: '',
                selectable: true
            });

            // Create arrow using last two points
            const lastPoint = points[points.length - 1];
            const secondLastPoint = points[points.length - 2];
            const arrow = createArrowhead(
                secondLastPoint.x,
                secondLastPoint.y,
                lastPoint.x,
                lastPoint.y
            );

            // Group path and arrow
            const group = new Group([finalPath, arrow], {
                selectable: true,
                hasControls: true,
                subTargetCheck: true
            });

            canvas.remove(currentPath);
            canvas.add(group);
            canvas.requestRenderAll();

            // Reset
            currentPath = null;
            points = [];
            isCurrentlyDrawing = false;
            setIsLine(false);
        };

        // Add event listeners
        canvas.on('mouse:down', handleMouseDown);
        canvas.on('mouse:move', handleMouseMove);
        canvas.on('mouse:up', handleMouseUp);
        canvas.on('mouse:dblclick', handleDblClick);

        // Cleanup
        return () => {
            canvas.off('mouse:down', handleMouseDown);
            canvas.off('mouse:move', handleMouseMove);
            canvas.off('mouse:up', handleMouseUp);
            canvas.off('mouse:dblclick', handleDblClick);
            if (currentPath) {
                canvas.remove(currentPath);
            }
        };
    }, [canvas, isLine]);

    // useEffect(() => {
    //     if (!canvas || !isPen) return;

    //     let isDrawing = false;
    //     let points: string[] = []; // To store the path points

    //     const handleMouseDown = (o: any) => {
    //         isDrawing = true;
    //         const pointer = canvas.getPointer(o.e);
    //         points = [`M ${pointer.x} ${pointer.y}`]; // Initialize the path with the starting point
    //         path = new Path(points.join(' '), {
    //             stroke: '#000000',
    //             strokeWidth: 2,
    //             fill: null, // Ensure it's not filled
    //             selectable: true,
    //             evented: false,
    //         });
    //         canvas.add(path);
    //     };

    //     const handleMouseMove = (o: any) => {
    //         if (!isDrawing || !path) return;
    //         const pointer = canvas.getPointer(o.e);
    //         points.push(`L ${pointer.x} ${pointer.y}`); // Add the new point to the path
    //         path.set({ path: points });
    //         canvas.renderAll();
    //     };

    //     const handleMouseUp = () => {
    //         isDrawing = false;
    //         path = null; // Reset the path variable
    //         points = []; // Clear the points array
    //         setIsPen(false); // Optionally disable pen mode after drawing
    //     };

    //     canvas.on('mouse:down', handleMouseDown);
    //     canvas.on('mouse:move', handleMouseMove);
    //     canvas.on('mouse:up', handleMouseUp);

    //     return () => {
    //         canvas.off('mouse:down', handleMouseDown);
    //         canvas.off('mouse:move', handleMouseMove);
    //         canvas.off('mouse:up', handleMouseUp);
    //     };
    // }, [canvas, isPen]);

    useEffect(() => {
        if (canvas) {
            canvas.defaultCursor = isRect || isCircle || isLine || isStraightLine ? 'crosshair' : 'default';
            canvas.renderAll();
        }
    }, [canvas, isRect, isCircle, isLine]);

    const addRec = () => {
        if (canvas) {
            const rectangle = new Rect({
                top: canvas.height / 2,
                left: canvas.width / 2,
                width: 100,
                height: 60,
                fill: '#ffffff',
                stroke: 'black',
                strokeWidth: 1,
            });

            canvas.add(rectangle);

            if (ws) {
                const serializedStroke = rectangle.toJSON()

                ws.send(JSON.stringify({
                    type: 'stroke-created',
                    strokeData: serializedStroke,
                    sessionUrl: "http://localhost/5000"
                }));
            }

        }
    };
    const addCir = () => {
        if (canvas) {
            const circle = new Circle({
                top: canvas.height / 2,
                left: canvas.width / 2,
                radius: 50,
                fill: 'white',
                stroke: 'black',
                strokeWidth: 1,
            });

            canvas.add(circle);
        }
    };
    const addTri = () => {
        if (canvas) {
            const traingle = new Triangle({
                top: canvas.height / 2,
                left: canvas.width / 2,
                width: 100,
                height: 60,
                fill: 'white',
                stroke: 'black',
            });

            canvas.add(traingle);
        }
    };

    const deleteShape = () => {
        if (canvas) {
            const activeObjects = canvas.getActiveObjects();
            if (activeObjects.length > 0) {
                console.log('runs')
                activeObjects.forEach((obj) => canvas.remove(obj));
                canvas.discardActiveObject();
                canvas.renderAll();
            }
        }
    }

    const toggleDrawingMode = () => {
        if (!canvas) return
        setIsPen(!isPen)
        setIsRect(false);
        setIsCircle(false);
        setIsLine(false);
        setIsStraightLine(false);
        setNormal(false);
        canvas.freeDrawingBrush = new PencilBrush(canvas)
        canvas.freeDrawingBrush.color = "#32a852"
        canvas.freeDrawingBrush.width = 10
        canvas.freeDrawingBrush.shadow = new Shadow({
            blur: parseInt("5", 10) || 0,
            offsetX: 0,
            offsetY: 0,
            affectStroke: true,
            color: "#3f93d4",
        });
        canvas.isDrawingMode = !canvas.isDrawingMode
    }

    const addText = () => {
        if (!canvas) return;

        const text = new Textbox("Enter Text", {
            left: 300,
            top: 300,
            fontSize: 30,
            fill: "#000",
            editable: true,
            textAlign: 'left',
            width: 150,
            originX: 'center',
            originY: 'center',
            centeredScaling: true,
        });

        // Show only corner controls and middle controls
        text.setControlsVisibility({
            mt: false,  // middle top
            mb: false,  // middle bottom
            ml: true,   // middle left
            mr: true,   // middle right
            bl: true,   // bottom left
            br: true,   // bottom right
            tl: true,   // top left
            tr: true,   // top right
            mtr: true,  // rotation control
        });

        text.on('scaling', function () {
            const newWidth = text.width * text.scaleX;
            const newFontSize = text.fontSize * text.scaleX;

            text.set({
                fontSize: newFontSize,
                width: newWidth,
                scaleX: 1,
                scaleY: 1
            });

            text.setCoords();
            canvas.renderAll();
        });

        canvas.add(text);
        canvas.setActiveObject(text);
        canvas.renderAll();
    }

    return (
        <>
            <div className=' inline-block mx-auto'>
                <div className='flex gap-2 rounded-xl'>

                    <div className={`hover:bg-[#d8d8d8] ${normal ? 'bg-[#d8d8d8]' : 'bg-transparent'} flex items-center justify-center p-1 cursor-pointer rounded-xl`}
                        onClick={() => {
                            if (canvas) {
                                canvas.isDrawingMode = false
                            }
                            setNormal(!normal)
                            setIsStraightLine(false);
                            setIsRect(false);
                            setIsCircle(false);
                            setIsLine(false);
                            setIsPen(false)
                        }}>
                        {/* <img className='w-full' src={mouse} alt="mouse" /> */}
                        <Mouse />
                    </div>
                    <div className={`hover:bg-[#d8d8d8] ${isRect ? 'bg-[#d8d8d8]' : 'bg-transparent'} p-1 cursor-pointer rounded-xl`}
                        onDoubleClick={() => addRec()}
                        onClick={() => {
                            if (canvas) {
                                canvas.isDrawingMode = false
                            }
                            setIsRect(!isRect);
                            setIsStraightLine(false);
                            setIsCircle(false);
                            setIsLine(false);
                            setNormal(false)
                            setIsPen(false)
                        }}>
                        <Crop54Icon />
                    </div>
                    <div className={`hover:bg-[#d8d8d8] ${isCircle ? 'bg-[#d8d8d8]' : 'bg-transparent'} p-1 cursor-pointer rounded-xl`}
                        onDoubleClick={() => addCir()}
                        onClick={() => {
                            if (canvas) {
                                canvas.isDrawingMode = false
                            }
                            setIsCircle(!isCircle);
                            setIsStraightLine(false);
                            setIsRect(false);
                            setIsLine(false);
                            setNormal(false)
                            setIsPen(false)
                        }}>
                        <Brightness1OutlinedIcon />
                    </div>
                    <div className={`hover:bg-[#d8d8d8] ${isStraightLine ? 'bg-[#d8d8d8]' : 'bg-transparent'} p-1 cursor-pointer rounded-xl`}
                        onClick={() => {
                            if (canvas) {
                                canvas.isDrawingMode = false
                            }
                            setIsStraightLine(!isStraightLine);
                            setIsLine(false);
                            setIsRect(false);
                            setIsCircle(false);
                            setNormal(false)
                            setIsPen(false)
                        }}>
                        <NorthWestIcon />
                    </div>
                    <div className={`hover:bg-[#d8d8d8] ${isLine ? 'bg-[#d8d8d8]' : 'bg-transparent'} p-1 cursor-pointer rounded-xl`}
                        onClick={() => {
                            if (canvas) {
                                canvas.isDrawingMode = false
                            }
                            setIsLine(!isLine);
                            setIsStraightLine(false);
                            setIsRect(false);
                            setIsCircle(false);
                            setNormal(false)
                            setIsPen(false)
                        }}>
                        <AirlineStopsIcon />
                    </div>
                    <div className="hover:bg-[#d8d8d8] p-1 cursor-pointer rounded-xl" onClick={() => addTri()}>
                        <ChangeHistoryOutlinedIcon />
                    </div>
                    <div className={`hover:bg-[#d8d8d8] ${isPen ? 'bg-[#d8d8d8]' : 'bg-transparent'} cursor-pointer p-1 rounded-xl`}
                        onClick={
                            toggleDrawingMode
                        }>
                        <CreateOutlinedIcon />
                    </div>
                    <div className={`hover:bg-[#d8d8d8] ${isText ? 'bg-[#d8d8d8]' : 'bg-transparent'} cursor-pointer p-1 rounded-xl`}
                        onClick={
                            addText
                        }>
                        <TitleOutlinedIcon />
                    </div>

                    {selectedObject &&
                        <div className="hover:bg-[#d8d8d8] p-1 cursor-pointer rounded-xl" onClick={() => deleteShape()}>
                            <DeleteOutlineOutlinedIcon />
                        </div>
                    }
                    <div className="hover:bg-[#d8d8d8] p-1 cursor-pointer rounded-xl">
                        <Cropping />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ToolBar
