import { RootState } from '../store/store';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const ShapesSettings = () => {

    const canvasValue = useSelector((state: RootState) => state.canvas.value)


    const [selectedObject, setSelectedObject] = useState<any>(null)
    const [width, setWidth] = useState("")
    const [height, setHeight] = useState("")
    const [diameter, setDiameter] = useState("")
    const [color, setColor] = useState("")

    const handleObjectSelection = (object: any) => {
        if (!object) return
        setSelectedObject(object)

        if (object.type === "rect") {
            setWidth(Math.round(object.width * object.scaleX).toString())
            setHeight(Math.round(object.width * object.scaleY).toString())
            setColor(object.fill)
            setDiameter("")
        } else if (object.type === "triangle") {
            setWidth(Math.round(object.width * object.scaleX).toString())
            setHeight(Math.round(object.width * object.scaleY).toString())
            setColor(object.fill)
            setDiameter("")
        } else if (object.type === "circle") {
            setWidth("")
            setHeight("")
            setColor(object.fill)
            setDiameter((Math.round(object.radius * 2 * object.scaleX).toString()))
        }
    }

    const clearSettings = () => {
        setWidth("")
        setHeight("")
        setColor("")
        setDiameter("")
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
                setSelectedObject(null);
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

    return (
        <div>
            {selectedObject && selectedObject.type === "rect" && (
                <>
                    <input className='border-2 p-2' type="text" placeholder='width' value={width} onChange={handleWidthChange} />
                    <input className='border-2 p-2' type="text" placeholder='width' value={height} onChange={handleHeightChange} />
                </>
            )}
            {selectedObject && selectedObject.type === "circle" && (
                <>
                    <input className='border-2 p-2' type="text" placeholder='diameter' value={diameter} onChange={handleDiameterChange} />
                    {/* <input type="text" value={height} onChange={handleHeightChange} /> */}
                </>
            )}
        </div>
    )
}

export default ShapesSettings
