import { setSelectedShape } from '@/features/selectedObjectSlice';
import { RootState } from '../store/store';
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

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

    const handleObjectSelection = (object: any) => {
        if (!object) return
        dispatch(setSelectedShape(object))

        if (object.type === "rect") {
            setWidth(Math.round(object.width * object.scaleX).toString())
            setHeight(Math.round(object.height * object.scaleY).toString())
            setColor(object.fill)
            setStrokeColor(object.stroke)
            setDiameter("")
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

    return (
        selectedObject ?
            (<div className='bg-[#31303B] w-60 text-white p-2 rounded-xl ml-4 my-4'>
                <div className='font-bold'>
                    Canvas
                </div>
                {selectedObject && selectedObject.type === "rect" && (
                    <div className='flex w-full items-center justify-around mt-4'>
                        <div className='flex items-center justify-between'>
                            <div>W</div>
                            <input className='text-center bg-transparent border-none w-20 border-2 px-1' type="text" placeholder='width' value={width} onChange={handleWidthChange} />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                H
                            </div>
                            <input className='text-center bg-transparent border-none w-20 border-2 px-1' type="text" placeholder='height' value={height} onChange={handleHeightChange} />
                        </div>
                    </div>
                )}
                {selectedObject && selectedObject.type === "circle" && (
                    <div className='flex w-full items-center justify-around mt-4'>
                        <div className='flex items-center justify-between'>
                            <div>D</div>
                            <input className='text-center bg-transparent border-none w-20 border-2 px-1' type="text" placeholder='diameter' value={diameter} onChange={handleDiameterChange} />
                        </div>
                    </div>
                )}
                <div className='w-full items-center justify-around mt-4'>
                    <div>Background</div>
                    <input type="color" value={color} onChange={handleColorChange} />
                </div>
                <div className='w-full items-center justify-around mt-4'>
                    <div>Border</div>
                    <input type="color" value={strokeColor} onChange={handleStrokeColorChange} />
                </div>
            </div>) : <></>
    )
}

export default ShapesSettings
