"use client"

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { setCanvas } from '@/features/canvasSlice'
import { Canvas, Circle, Triangle, Rect, Line, Group, Path, PencilBrush, PatternBrush, Shadow, Text, IText } from "fabric";

import Crop54Icon from "@mui/icons-material/Crop54";
import Brightness1OutlinedIcon from '@mui/icons-material/Brightness1Outlined';
import ChangeHistoryOutlinedIcon from '@mui/icons-material/ChangeHistoryOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import RemoveIcon from '@mui/icons-material/Remove';
import NorthWestIcon from '@mui/icons-material/NorthWest';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import TitleOutlinedIcon from '@mui/icons-material/TitleOutlined';

import { togglePanning } from "../features/panningSlice";

import { useEffect, useState } from 'react';
import Cropping from './Cropping';

import Mouse from '../assets/main/mouse.svg'

const ToolBar = () => {
    const canvas = useSelector((state: RootState) => state.canvas.value)

    const selectedObject = useSelector((state: RootState) => state.shape.selectedShape) as any;

    const dispatch = useDispatch()

    const isPanning = useSelector((state: RootState) => state.panning.isPanning);

    const [normal, setNormal] = useState(true)
    const [isRect, setIsRect] = useState(false)
    const [isCircle, setIsCircle] = useState(false)
    const [isLine, setIsLine] = useState(false)
    const [isPen, setIsPen] = useState(false);
    const [isText, setIsText] = useState(false)
    let path: Path | null = null;

    const [isDrawingMode, setIsDrawingMode] = useState(false);

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
        if (!canvas || !isLine) return;

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
            setIsLine(false);

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
            canvas.defaultCursor = isRect || isCircle || isLine ? 'crosshair' : 'default';
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
        if (!canvas) return
        const text = new IText("Enter Text", {
            left: 100,
            top: 100,
            fontSize: 20,
            fill: "#000", // Text color
            editable: true,
        })
        canvas.add(text)
        canvas.setActiveObject(text)
        canvas.renderAll()
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
                            setIsRect(false);
                            setIsLine(false);
                            setNormal(false)
                            setIsPen(false)
                        }}>
                        <Brightness1OutlinedIcon />
                    </div>
                    <div className={`hover:bg-[#d8d8d8] ${isLine ? 'bg-[#d8d8d8]' : 'bg-transparent'} p-1 cursor-pointer rounded-xl`}
                        onClick={() => {
                            if (canvas) {
                                canvas.isDrawingMode = false
                            }
                            setIsLine(!isLine);
                            setIsRect(false);
                            setIsCircle(false);
                            setNormal(false)
                            setIsPen(false)
                        }}>
                        <NorthWestIcon />
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
                    {/* <div className={`hover:bg-[#d8d8d8] ${isPen ? 'bg-[#d8d8d8]' : 'bg-transparent'} p-1 cursor-pointer rounded-xl`}
                        onClick={() => {
                            setIsPen(!isPen);
                            setIsRect(false);
                            setIsCircle(false);
                            setIsLine(false);
                            setNormal(false);
                        }}>
                        <CreateOutlinedIcon />
                    </div> */}
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
