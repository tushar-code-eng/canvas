import { setSelectedShape } from '@/features/selectedObjectSlice';
import { RootState } from '../store/store';
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Gradient, Path, Rect, Shadow } from 'fabric';

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
    const [radiusX, setRadiusX] = useState("")
    const [radiusY, setRadiusY] = useState("")
    const [color, setColor] = useState("")
    const [strokeColor, setStrokeColor] = useState("#ffffff")
    const [strokeWeight, setStrokeWeight] = useState("")
    const [cornerRadiusX, setCornerRadiusX] = useState("")
    const [cornerRadiusY, setCornerRadiusY] = useState("")
    const [borderStyle, setBoderStyle] = useState("Solid")
    const [shadowColor,setShadowColor] = useState("")
    const [shadowSpread,setShadowSpread] = useState(5)

    const handleObjectSelection = (object: any) => {
        if (!object) return
        dispatch(setSelectedShape(object))
        console.log(object)

        setWidth(Math.round(object.width * object.scaleX).toString())
        setHeight(Math.round(object.height * object.scaleY).toString())
        setColor(object.fill)
        setStrokeColor(object.stroke)
        setStrokeWeight(object.strokeWidth)
        if (object.type === "rect") {
            setRadiusX("")
            setRadiusY("")
            setCornerRadiusX(object.rx)
            setCornerRadiusY(object.ry)
        } else if (object.type === "triangle") {
            setRadiusX("")
            setRadiusY("")
        } else if (object.type === "circle") {
            setRadiusX((Math.round(object.width / 2 * object.scaleX).toString()))
            setRadiusY((Math.round(object.height / 2 * object.scaleY).toString()))
        }
    }

    const clearSettings = () => {
        setWidth("")
        setHeight("")
        setColor("")
        setRadiusX("")
        setRadiusY("")
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
    // const handleDiameterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const value = e.target.value.replace(/,/g, "");
    //     const intValue = parseInt(value, 10);
    //     setWidth(intValue.toString());
    //     if (selectedObject && selectedObject.type === "rect" && intValue >= 0) {
    //         selectedObject.set({ width: intValue / selectedObject.scaleX });
    //         canvasValue?.renderAll();
    //     }
    // }
    const handleRadiusX = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/,/g, "");
        const intValue = parseInt(value, 10) / 2;
        setRadiusX(intValue.toString());
        if (selectedObject && selectedObject.type === "circle" && intValue >= 0) {
            selectedObject.set({ width: intValue * 2 / selectedObject.scaleX });
            canvasValue?.renderAll();
        }
    }
    const handleRadiusY = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/,/g, "");
        const intValue = parseInt(value, 10) / 2;
        setRadiusY(intValue.toString());
        if (selectedObject && selectedObject.type === "circle" && intValue >= 0) {
            selectedObject.set({ scaleY: intValue * 2 / selectedObject.width });
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

    const handleStrokeWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setStrokeWeight(value);
        if (selectedObject) {
            selectedObject.set({ strokeWidth: value });
            canvasValue?.renderAll();
        }
    }

    const handleCornerRadiusX = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setCornerRadiusX(value);
        if (selectedObject) {
            selectedObject.set({ rx: value });
            canvasValue?.renderAll();
        }
    }

    const handleCornerRadiusY = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setCornerRadiusY(value);
        if (selectedObject) {
            selectedObject.set({ ry: value });
            canvasValue?.renderAll();
        }
    }

    const handleBorderStyle = (value: string) => {
        if (!selectedObject) return;
        switch (value) {
            case "Solid":
                setBoderStyle("Solid")
                selectedObject.set({
                    strokeDashArray: null,
                });
                break;

            case "Dashed":
                setBoderStyle("Dashed")
                selectedObject.set({
                    strokeDashArray: [10, 5],
                });
                break;

            case "Dotted":
                setBoderStyle("Dotted")
                selectedObject.set({
                    strokeDashArray: [2, 2],
                });
                break;

            // case "Gradient":
            //     setBoderStyle("Gradient")
            //     selectedObject.set({
            //         stroke: new Gradient({
            //             type: "linear",
            //             gradientUnits: "percentage",
            //             coords: { x1: 0, y1: 0, x2: 1, y2: 1 },
            //             colorStops: [
            //                 { offset: 0, color: "red" },
            //                 { offset: 1, color: "blue" },
            //             ],
            //         }),
            //     });
            //     break;

            case "Blur":
                setBoderStyle("Blur")
                selectedObject.set({
                    shadow: {
                        color: "blue",
                        blur: 10,
                        offsetX: 0,
                        offsetY: 0,
                    },
                });
                break;

            // case "wavy":
            //     setBoderStyle("Wavy")
            //     const path = new Path(
            //         "M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80",
            //         {
            //             fill: "transparent",
            //             stroke: "blue",
            //             strokeWidth: 3,
            //         }
            //     );
            //     canvasValue?.remove(selectedObject); // Remove the default rectangle
            //     canvasValue?.add(path); // Add wavy path
            //     break;

            default:
                break;
        }
        canvasValue?.renderAll();

    }

    const handleShadowChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setShadowColor(value);
        const shadowValue = new Shadow({
            blur: parseInt("10", 10) || 0,
            offsetX: 0,
            offsetY: 0,
            affectStroke: true,
            color: value,
        });
        if (selectedObject) {
            selectedObject.set({ shadow: shadowValue });
            canvasValue?.renderAll();
        }
    }

    return (

        selectedObject ?
            (
                <div className=' w-full rounded-xl' >

                    <div className='border-b-2 p-2 '>
                        <div className='font-semibold'>Layout</div>
                        {selectedObject && selectedObject.type === "rect" &&
                            (<div className=''>
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
                            </div>)
                        }
                        {
                            selectedObject && selectedObject.type === "circle" &&
                            (<div className=''>
                                <div className='text-xs'>
                                    Radius
                                </div>
                                <div className='flex w-full items-center justify-between'>
                                    <div className='flex items-center justify-between rounded'>
                                        <div>X</div>
                                        <input className='text-center bg-transparent border-none w-full border-2 px-1' type="text" placeholder='radiusX' value={radiusX} onChange={handleRadiusX} />
                                    </div>
                                    <div className="flex items-center justify-between rounded">
                                        <div>
                                            Y
                                        </div>
                                        <input className='text-center bg-transparent border-none w-full border-2 px-1' type="text" placeholder='radiusY' value={radiusY} onChange={handleRadiusY} />
                                    </div>
                                </div>
                            </div>)

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
                        <div className=''>
                            <div className='text-xs'>
                                Dimensions
                            </div>
                            <div className='flex w-full items-center justify-between'>
                                <div className='flex items-center justify-between rounded'>
                                    <div>Weight</div>
                                    <input className='text-center bg-transparent border-none w-full border-2 px-1' type="text" placeholder='Stroke Weight' value={strokeWeight} onChange={handleStrokeWeightChange} />
                                </div>
                                <div className="flex items-center justify-between rounded gap-4">
                                    <div>
                                        Style
                                    </div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>{borderStyle}</DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem onClick={() => handleBorderStyle("Blur")}>Blur</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleBorderStyle("Dashed")}>Dashed</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleBorderStyle("Dotted")}>Dotted</DropdownMenuItem>
                                            {/* <DropdownMenuItem onClick={() => handleBorderStyle("Gradient")}>Gradient</DropdownMenuItem> */}
                                            <DropdownMenuItem onClick={() => handleBorderStyle("Solid")}>Solid</DropdownMenuItem>
                                            {/* <DropdownMenuItem onClick={() => handleBorderStyle("Wavy")}>Wavy</DropdownMenuItem> */}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>

                        </div>
                        {
                            selectedObject && selectedObject.type === "rect" && (
                                <div className=''>
                                    <div className='text-xs'>
                                        Corner Radius
                                    </div>
                                    <div className='flex w-full items-center justify-between'>
                                        <div className='flex items-center justify-between rounded'>
                                            <div>X</div>
                                            <input className='text-center bg-transparent border-none w-full border-2 px-1' type="text" placeholder='Stroke Weight' value={cornerRadiusX} onChange={handleCornerRadiusX} />
                                        </div>
                                        <div className="flex items-center justify-between rounded">
                                            <div>
                                                Y
                                            </div>
                                            <input className='text-center bg-transparent border-none w-full border-2 px-1' type="text" placeholder=' Corner Radius' value={cornerRadiusY} onChange={handleCornerRadiusY} />
                                        </div>
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
                        <div className='mt-2'>
                            <div className='text-xs'>
                                Shadow
                            </div>
                            {/* <div>
                                <div className='w-[85%] flex items-center justify-between '>
                                    <div>Spread</div>
                                    <input className='cursor-pointer' type="number" value={shadowSpread} onChange={handleShadowChange} />
                                </div>
                            </div> */}
                            <div>
                                <div className='w-[85%] flex items-center justify-between '>
                                    <div>#QHJK18</div>
                                    <input className='cursor-pointer' type="color" value={shadowColor} onChange={handleShadowChange} />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            ) : <></>

    )
}

export default ShapesSettings
