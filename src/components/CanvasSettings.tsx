import { RootState } from "@/store/store"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"


const CanvasSettings = () => {
    
    const canvasValue = useSelector((state: RootState) => state.canvas.value)
    const [canvasHeight, setCanvasHeight] = useState(canvasValue?.height)
    const [canvasWidth, setCanvasWidth] = useState(canvasValue?.width)

    useEffect(() => {
        if (canvasValue) {
            canvasValue.setDimensions({
                width: canvasWidth,
                height: canvasHeight
            })
            canvasValue.renderAll()
        }
    }, [canvasHeight, canvasWidth, canvasValue])

    const handleWidthChange = (e: any) => {
        const value = e.target.value.replace(/,/g, "")
        const intValue = parseInt(value, 10)

        if (intValue >= 0) {
            setCanvasWidth(intValue)
        }
    }
    const handleHeightChange = (e: any) => {
        const value = e.target.value.replace(/,/g, "")
        const intValue = parseInt(value, 10)

        if (intValue >= 0) {
            setCanvasHeight(intValue)
        }
    }

    return (
        <div className="bg-[#31303B] text-white p-2 rounded-xl w-full">
            <div className='font-bold'>
                Frame
            </div>
            <div className='flex w-full items-center justify-around mt-4'>
                <div className='flex items-center justify-between'>
                    <div>W</div>
                    <input className='text-center bg-transparent border-none w-20 border-2 px-1' type="text" placeholder='width' value={canvasWidth} onChange={handleWidthChange} />
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        H
                    </div>
                    <input className='text-center bg-transparent border-none w-20 border-2 px-1' type="text" placeholder='height' value={canvasHeight} onChange={handleHeightChange} />
                </div>
            </div>
        </div>
    )
}

export default CanvasSettings
