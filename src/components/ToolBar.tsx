"use client"
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { setCanvas } from '@/features/canvasSlice'
import { Canvas, Circle, Triangle, Rect } from "fabric";

import Crop54Icon from "@mui/icons-material/Crop54";
import Brightness1OutlinedIcon from '@mui/icons-material/Brightness1Outlined';
import ChangeHistoryOutlinedIcon from '@mui/icons-material/ChangeHistoryOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import WavingHandOutlinedIcon from '@mui/icons-material/WavingHandOutlined';

import { togglePanning } from "../features/panningSlice";

import { useEffect, useState } from 'react';

const ToolBar = () => {
    const canvasValue = useSelector((state: RootState) => state.canvas.value)

    const selectedObject = useSelector((state: RootState) => state.shape.selectedShape) as any;

    const dispatch = useDispatch()

    const isPanning = useSelector((state: RootState) => state.panning.isPanning);

    const addRec = () => {
        if (canvasValue) {
            const rectangle = new Rect({
                top: window.innerHeight / 2,
                left: window.innerWidth / 2 - 50,
                width: 100,
                height: 60,
                fill: "transparent", 
                stroke: "#ffffff",   
                strokeWidth: 1,      
              });

            canvasValue.add(rectangle);
        }
    };
    const addCir = () => {
        if (canvasValue) {
            const circle = new Circle({
                top: window.innerHeight / 2,
                left: window.innerWidth / 2 - 50,
                radius: 50,
                fill: "transparent", 
                stroke: "#ffffff",   
                strokeWidth: 1,      
            });

            canvasValue.add(circle);
        }
    };
    const addTri = () => {
        if (canvasValue) {
            const traingle = new Triangle({
                top: window.innerHeight / 2,
                left: window.innerWidth / 2 - 50,
                width: 100,
                height: 60,
                fill: "#738fcf",
            });

            canvasValue.add(traingle);
        }
    };

    const deleteShape = () => {
        if (canvasValue) {
            const activeObjects = canvasValue.getActiveObjects();
            if (activeObjects.length > 0) {
                activeObjects.forEach((obj) => canvasValue.remove(obj));
                canvasValue.discardActiveObject();
                canvasValue.renderAll();
            }
        }
    }
    return (
        <>
            <div className=' inline-block mx-auto'>
                <div className='flex gap-2 text-white bg-[#232329] p-2 rounded-xl'>
                    
                    <div className="hover:bg-[#31303B] p-1 cursor-pointer rounded-xl" onClick={() => addRec()}>
                        <Crop54Icon />
                    </div>
                    <div className="hover:bg-[#31303B] p-1 cursor-pointer rounded-xl" onClick={() => addCir()}>
                        <Brightness1OutlinedIcon />
                    </div>
                    <div className="hover:bg-[#31303B] p-1 cursor-pointer rounded-xl" onClick={() => addTri()}>
                        <ChangeHistoryOutlinedIcon />
                    </div>
                    {selectedObject &&
                        <div className="hover:bg-[#31303B] p-1 cursor-pointer rounded-xl" onClick={() => deleteShape()}>
                            <DeleteOutlineOutlinedIcon />
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default ToolBar
