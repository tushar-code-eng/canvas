import { setSelectedShape } from '@/features/selectedObjectSlice';
import { RootState } from '../store/store';
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


const ShapesSettings = () => {

    const canvasValue = useSelector((state: RootState) => state.canvas.value)

    const selectedObject = useSelector((state: RootState) => state.shape.selectedShape) as any;

    const dispatch = useDispatch()

    // const [selectedObject, setSelectedObject] = useState<any>(null)
    const [width, setWidth] = useState("")
    const [height, setHeight] = useState("")
    const [diameter, setDiameter] = useState("")
    const [color, setColor] = useState("")
    const [strokeColor, setStrokeColor] = useState("#ffffff")
    const [strokeWeight, setStrokeWeight] = useState("")
    const [cornerRadiusX, setCornerRadiusX] = useState("")
    const [cornerRadiusY, setCornerRadiusY] = useState("")
    const [borderStyle, setBoderStyle] = useState("Solid")

    const handleObjectSelection = (object: any) => {
        if (!object) return
        dispatch(setSelectedShape(object))
        console.log(object)

        if (object.type === "rect") {
            setWidth(Math.round(object.width * object.scaleX).toString())
            setHeight(Math.round(object.height * object.scaleY).toString())
            setColor(object.fill)
            setStrokeColor(object.stroke)
            setDiameter("")
            setStrokeWeight(object.strokeWidth)
            setCornerRadiusX(object.rx)
            setCornerRadiusY(object.ry)
        } else if (object.type === "triangle") {
            setWidth(Math.round(object.width * object.scaleX).toString())
            setHeight(Math.round(object.height * object.scaleY).toString())
            setColor(object.fill)
            setStrokeColor(object.stroke)
            setDiameter("")
        } else if (object.type === "circle") {
            setWidth("")
            setHeight("")
            setColor(object.fill)
            setStrokeColor(object.stroke)
            setDiameter((Math.round(object.radius * 2 * object.scaleX).toString()))
        }
    }

    const clearSettings = () => {
        setWidth("")
        setHeight("")
        setColor("")
        setDiameter("")
        setStrokeColor("")
    }

    useEffect(() => {
        if (canvasValue) {
            canvasValue.on("selection:created", (event) => {
                handleObjectSelection(event.selected[0]);
            });
            canvasValue.on("selection:updated", (event) => {
                handleObjectSelection(event.selected[0]);
            });
            canvasValue.on("selection:cleared", () => {
                dispatch(setSelectedShape(null))
                clearSettings();
            });
            canvasValue.on("object:modified", (event) => {
                handleObjectSelection(event.target);
            });
            canvasValue.on("object:scaling", (event) => {
                handleObjectSelection(event.target);
            });
        }
    }, [canvasValue]);

    const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/,/g, "");
        const intValue = parseInt(value, 10);
        setWidth(intValue.toString());
        if (selectedObject && selectedObject.type === "rect" && intValue >= 0) {
            selectedObject.set({ width: intValue / selectedObject.scaleX });
            canvasValue?.renderAll();
        }
    }

    const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/,/g, "");
        const intValue = parseInt(value, 10);
        setHeight(intValue.toString());
        if (selectedObject && selectedObject.type === "rect" && intValue >= 0) {
            selectedObject.set({ height: intValue / selectedObject.scaleY });
            canvasValue?.renderAll();
        }
    }
    const handleDiameterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/,/g, "");
        const intValue = parseInt(value, 10);
        setDiameter(intValue.toString());
        if (selectedObject && selectedObject.type === "circle" && intValue >= 0) {
            selectedObject.set({ radius: intValue / 2 / selectedObject.scaleX });
            canvasValue?.renderAll();
        }
    }
    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setColor(value);
        if (selectedObject) {
            selectedObject.set({ fill: value });
            canvasValue?.renderAll();
        }
    }
    
    const handleStrokeColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setStrokeColor(value);
        if (selectedObject) {
            selectedObject.set({ stroke: value });
            canvasValue?.renderAll();
        }
    }

    const handleStrokeWeightChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const value = e.target.value;
        setStrokeColor(value);
        if (selectedObject) {
            selectedObject.set({ stroke: value });
            canvasValue?.renderAll();
        }
    }

    return (

        selectedObject ?
            (
                <div className=' w-full rounded-xl mb-4' >
                    <div className='text-xl font-semibold px-2'>
                        Properties
                    </div>
                    <div className='border-b-2 p-2 '>
                        <div className='font-semibold'>Layout</div>
                        {selectedObject && selectedObject.type === "rect" && (
                            <div className=''>
                                <div className='text-xs'>
                                    Dimensions
                                </div>
                                <div className='flex w-full items-center justify-between'>
                                    <div className='flex items-center justify-between rounded'>
                                        <div>W</div>
                                        <input className='text-center bg-transparent border-none w-full border-2 px-1' type="text" placeholder='width' value={width} onChange={handleWidthChange} />
                                    </div>
                                    <div className="flex items-center justify-between rounded">
                                        <div>
                                            H
                                        </div>
                                        <input className='text-center bg-transparent border-none w-full border-2 px-1' type="text" placeholder='height' value={height} onChange={handleHeightChange} />
                                    </div>
                                </div>
                                {/* <div className='mt-2'>
                                Stroke Weight
                            </div>
                            <div>

                            </div> */}
                            </div>
                        )}
                        {
                            selectedObject && selectedObject.type === "circle" && (
                                <div className='flex w-full items-center justify-around mt-4'>
                                    <div className='flex items-center justify-between'>
                                        <div>D</div>
                                        <input className='text-center bg-transparent border-none w-20 border-2 px-1' type="text" placeholder='diameter' value={diameter} onChange={handleDiameterChange} />
                                    </div>
                                </div>
                            )
                        }

                        <div className='mt-2'>
                            <div className='text-xs'>
                                Fill
                            </div>
                            <div>
                                <div className='w-[85%] flex items-center justify-between '>
                                    <div>#ockjmn</div>
                                    <input className='cursor-pointer' type="color" value={color} onChange={handleColorChange} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='border-b-2 p-2 '>
                        <div className='font-semibold'>Stroke</div>
                        {selectedObject && selectedObject.type === "rect" && (
                            <div className=''>
                                <div className='text-xs'>
                                    Dimensions
                                </div>
                                <div className='flex w-full items-center justify-between'>
                                    <div className='flex items-center justify-between rounded'>
                                        <div>Weight</div>
                                        <input className='text-center bg-transparent border-none w-full border-2 px-1' type="text" placeholder='Stroke Weight' value={strokeWeight} onChange={handleStrokeWeightChange} />
                                    </div>
                                    <div className="flex items-center justify-between rounded">
                                        <div>
                                            Style
                                        </div>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger>{borderStyle}</DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuItem onClick={()=>setBoderStyle("Blur")}>Blur</DropdownMenuItem>
                                                <DropdownMenuItem onClick={()=>setBoderStyle("Dashed")}>Dashed</DropdownMenuItem>
                                                <DropdownMenuItem onClick={()=>setBoderStyle("Dotted")}>Dotted</DropdownMenuItem>
                                                <DropdownMenuItem onClick={()=>setBoderStyle("Double")}>Double</DropdownMenuItem>
                                                <DropdownMenuItem onClick={()=>setBoderStyle("Gradient")}>Gradient</DropdownMenuItem>
                                                <DropdownMenuItem onClick={()=>setBoderStyle("Solid")}>Solid</DropdownMenuItem>
                                                <DropdownMenuItem onClick={()=>setBoderStyle("Wavy")}>Wavy</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>
                                {/* <div className='mt-2'>
                                Stroke Weight
                            </div>
                            <div>

                            </div> */}
                            </div>

                        )}
                        <div className=''>
                            <div className='text-xs'>
                                Corner Radius
                            </div>
                            <div className='flex w-full items-center justify-between'>
                                <div className='flex items-center justify-between rounded'>
                                    <div>X</div>
                                    <input className='text-center bg-transparent border-none w-full border-2 px-1' type="text" placeholder='Stroke Weight' value={cornerRadiusX} onChange={handleWidthChange} />
                                </div>
                                <div className="flex items-center justify-between rounded">
                                    <div>
                                        Y
                                    </div>
                                    <input className='text-center bg-transparent border-none w-full border-2 px-1' type="text" placeholder=' Corner Radius' value={cornerRadiusY} onChange={handleHeightChange} />
                                </div>
                            </div>
                            {/* <div className='mt-2'>
                                Stroke Weight
                            </div>
                            <div>

                            </div> */}
                        </div>
                        {
                            selectedObject && selectedObject.type === "circle" && (
                                <div className='flex w-full items-center justify-around mt-4'>
                                    <div className='flex items-center justify-between'>
                                        <div>D</div>
                                        <input className='text-center bg-transparent border-none w-20 border-2 px-1' type="text" placeholder='diameter' value={diameter} onChange={handleDiameterChange} />
                                    </div>
                                </div>
                            )
                        }

                        <div className='mt-2'>
                            <div className='text-xs'>
                                Fill
                            </div>
                            <div>
                                <div className='w-[85%] flex items-center justify-between '>
                                    <div>#QHJK18</div>
                                    <input className='cursor-pointer' type="color" value={strokeColor} onChange={handleStrokeColorChange} />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            ) : <></>

    )
}

export default ShapesSettings
