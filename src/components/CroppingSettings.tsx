import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { FabricObject } from 'fabric'

declare module 'fabric' {
    interface Object {
        name?: string;
    }
}

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { RootState } from "@/store/store";

import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';


const CroppingSettings = () => {

    const refreshKey = useSelector((state: RootState) => state.refresh.value)

    const [frames, setFrames] = useState<FabricObject[]>([])
    const [selectedFrame, setSelectedFrame] = useState<FabricObject | null>(null)

    const canvas = useSelector((state: RootState) => state.canvas.value)


    const updateFrames = () => {
        if (canvas) {
            const framesFromCanvas = canvas.getObjects("rect").filter((obj) => {
                return obj.name && obj.name.startsWith("Frame")
            })

            console.log("wow->", framesFromCanvas)

            setFrames(framesFromCanvas)

            if (framesFromCanvas.length > 0) {
                setSelectedFrame(framesFromCanvas[0])
            }
        }
    }

    useEffect(() => {
        const handleObjectDeleted = () => {
            updateFrames();
        }
        canvas?.on('object:removed', handleObjectDeleted);
        canvas?.on('object:added', handleObjectDeleted);
        return () => {
            canvas?.off('object:removed', handleObjectDeleted);
            canvas?.off('object:added', handleObjectDeleted);
        };
    }, [canvas]);

    useEffect(() => {
        if (!canvas) return;

        const handleObjectSelected = () => {
            const activeFrame: any = canvas.getActiveObject()
            if (activeFrame) {
                setSelectedFrame(activeFrame as FabricObject)
            }
        }

        canvas.on('selection:created', handleObjectSelected)
        canvas.on('selection:updated', handleObjectSelected)
        canvas.on('selection:cleared', () => setSelectedFrame(null))

        return () => {
            canvas.off('selection:created', handleObjectSelected)
            canvas.off('selection:updated', handleObjectSelected)
            canvas.off('selection:cleared', () => setSelectedFrame(null))
        }
    }, [canvas, refreshKey])


    const handleFrameSelect = (value: any) => {
        console.log(frames)
        const selected: any = frames.find((frame: any) => frame.name === value)
        setSelectedFrame(selected)

        canvas?.setActiveObject(selected)
        canvas?.renderAll()
    }

    const exportFrameAsPNG = () => {
        if (!selectedFrame || !canvas) return;

        frames.forEach((frame) => {
            frame.set("visible", false);
        });

        selectedFrame.set({
            strokeWidth: 0,
            visible: true,
        });

        const dataURL = canvas.toDataURL({
            left: selectedFrame.left,
            top: selectedFrame.top,
            width: selectedFrame.width * selectedFrame.scaleX,
            height: selectedFrame.height * selectedFrame.scaleY,
            format: "png",
            multiplier: 1
        });

        selectedFrame.set({
            strokeWidth: 1,
        });

        frames.forEach((frame) => {
            frame.set("visible", true);
        });

        canvas.renderAll();

        const link = document.createElement("a");
        link.href = dataURL;
        link.download = `${selectedFrame.name}.png`;
        link.click();
    }

    return (
        <div>
            {
                frames.length > 0 &&
                (
                    <>
                        <DropdownMenu >
                            <DropdownMenuTrigger>
                                {selectedFrame && <DropdownMenuLabel>
                                    {selectedFrame?.name}
                                </DropdownMenuLabel>}
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                {frames.map((frame, index) => (
                                    <DropdownMenuItem key={index} onClick={() => handleFrameSelect(frame.name)} textValue={frame.name}>
                                        {frame.name}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <div>
                            <button onClick={exportFrameAsPNG}>
                                <FileDownloadOutlinedIcon /> Download as PNG
                            </button>
                        </div>

                    </>
                )
            }
        </div>
    )
}

export default CroppingSettings
