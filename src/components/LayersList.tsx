import React, { useEffect, useState } from 'react'
import { Canvas, FabricObject } from 'fabric'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import zIndex from '@mui/material/styles/zIndex';

import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

declare module 'fabric' {
    interface Canvas {
        updateZIndices(): void;
    }
    interface Object {
        zIndex?: number;
        id?: string;
        prevOpacity?: number;
    }
}

const LayersList = () => {

    const canvas = useSelector((state: RootState) => state.canvas.value)

    const [layers, setLayers] = useState<any[]>([])
    const [selectedLayer, setSelectedLayer] = useState<string | null>(null)

    const hideSelectedLayer = (e: any) => {
        if (!selectedLayer || !canvas) return;

        const object = canvas.getObjects().find((obj) => obj.id === selectedLayer)
        if (!object) return;

        if (object.opacity === 0) {
            object.opacity = object.prevOpacity || 1
            object.prevOpacity = undefined
        } else {
            object.prevOpacity = object.opacity || 1
            object.opacity = 0
        }

        canvas.renderAll()
        updateLayers()
    }

    const moveSelectedLayer = (direction: string) => {
        if (!selectedLayer || !canvas) return;

        const objects = canvas.getObjects();
        const object = objects.find((obj) => obj.id === selectedLayer);
        if (object) {
            const currentIndex = objects.indexOf(object);
            if (direction === "up" && currentIndex < objects.length - 1) {
                const temp = objects[currentIndex];
                objects[currentIndex] = objects[currentIndex + 1];
                objects[currentIndex + 1] = temp;
            } else if (direction === "down" && currentIndex > 0) {
                const temp = objects[currentIndex];
                objects[currentIndex] = objects[currentIndex - 1];
                objects[currentIndex - 1] = temp;
            }

            const backgroundColor = canvas.backgroundColor;
            canvas.clear();
            objects.forEach((obj) => canvas.add(obj));
            canvas.backgroundColor = backgroundColor;
            canvas.renderAll();
            objects.forEach((obj, index) => {
                obj.zIndex = index;
            });

            canvas.setActiveObject(object)

            canvas.renderAll()

            updateLayers()

        }
    }



    const addIdToObject = (object: any) => {
        if (!object.id) {
            const timestamp: number = new Date().getTime()
            object.id = `${object.type}_${timestamp}`
        }
    }

    Canvas.prototype.updateZIndices = function () {
        const objects = this.getObjects()
        objects.forEach((obj, index) => {
            addIdToObject(obj)
            obj.zIndex = index
        });
    }

    const updateLayers = () => {
        if (canvas) {
            canvas.updateZIndices()
            const objects = canvas.getObjects().filter(
                (obj) => !(
                    obj.id?.startsWith("vertical-") || obj.id?.startsWith("horizontal-")
                )
            ).map((obj) => ({
                id: obj.id,
                zIndex: obj.zIndex,
                type: obj.type
            }))
            setLayers([...objects].reverse())
        }
    }

    const handleObjectSelected = (e: any) => {
        const selectedObject = e.selected ? e.selected[0] : null

        if (selectedObject) {
            setSelectedLayer(selectedObject.id)
        } else {
            setSelectedLayer(null)
        }
    }

    const selectLayerCanvas = (layerId: any) => {
        const object = canvas?.getObjects().find((obj) => obj.id === layerId)
        if (object) {
            canvas?.setActiveObject(object)
            canvas?.renderAll()
        }
    }

    useEffect(() => {
        if (canvas) {
            canvas.on("object:added", updateLayers)
            canvas.on("object:removed", updateLayers)
            canvas.on("object:modified", updateLayers)

            canvas.on("selection:created", handleObjectSelected)
            canvas.on("selection:updated", handleObjectSelected)
            canvas.on("selection:cleared", () => setSelectedLayer(null))

            updateLayers()

            return () => {
                canvas.off("object:added", updateLayers)
                canvas.off("object:removed", updateLayers)
                canvas.off("object:modified", updateLayers)

                canvas.off("selection:created", handleObjectSelected)
                canvas.off("selection:updated", handleObjectSelected)
                canvas.off("selection:cleared", () => setSelectedLayer(null))

            }
        }
    }, [canvas])

    return (
        <div className='inline-block bg-[#31303B] w-full text-white rounded-xl'>
            <div className='py-3 px-2 font-bold border-b border-neutral-600 flex w-full items-center justify-between'>
                <div>Layers</div>
                <div className='flex gap-2'>
                    <div className={`${(!selectedLayer || layers[0]?.id === selectedLayer) ? 'opacity-50 pointer-events-none' : ''} cursor-pointer`} onClick={() => moveSelectedLayer("up")} >
                        <ArrowUpwardOutlinedIcon />
                    </div>
                    <div className={`${(!selectedLayer || layers[layers.length - 1]?.id === selectedLayer) ? 'opacity-50 pointer-events-none' : ''} cursor-pointer`} onClick={() => moveSelectedLayer("down")} >
                        <ArrowDownwardOutlinedIcon />
                    </div>
                    <div className={` cursor-pointer`} onClick={(e) => hideSelectedLayer(e)} >
                        <RemoveRedEyeOutlinedIcon />
                    </div>
                </div>
            </div>
            <ul className='m-2 mb-6'>
                {layers.map((layer) => (
                    <li key={layer.id} className=' text-white p-1 cursor-pointer' onClick={() => selectLayerCanvas(layer.id)}>
                        {layer.type} ({layer.zIndex})
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default LayersList
