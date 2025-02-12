import React, { useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useDispatch } from 'react-redux'

import { setCanvasBg } from '@/features/canvasBgSlice'

const CanvasBg = () => {

    const [canvasBgName, setCanvasBgName] = useState("Dotted")

    const dispatch = useDispatch()

    const handleCanvasBg = (value: string) => {
        switch (value) {
            case "Dotted":
                setCanvasBgName("Dotted")
                dispatch(setCanvasBg("bg-dot-black/[0.25]"))
                break

            case "Grid-lg":
                setCanvasBgName("Grid-lg")
                dispatch(setCanvasBg("bg-grid-black/[0.1]"))
                break;
            case "Grid-sm":
                setCanvasBgName("Grid-sm")
                dispatch(setCanvasBg("bg-grid-small-black/[0.1]"))
                break;
            case "Clear":
                setCanvasBgName("Clear")
                dispatch(setCanvasBg("bg-white"))
                break;
            default:
                break;
        }

    }

    return (
        <div className='w-full'>
            <div className='border-b-2 p-2 '>
                <div className='font-semibold'>Canvas</div>
                <div className=''>
                    <div className='text-xs'>
                        Background
                    </div>
                    <div className='flex w-full items-center justify-between'>
                        <div className="flex items-center justify-between rounded gap-4">
                            <DropdownMenu>
                                <DropdownMenuTrigger>{canvasBgName}</DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem onClick={() => handleCanvasBg("Clear")}>Clear</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleCanvasBg("Grid-lg")}>Grid-lg</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleCanvasBg("Grid-sm")}>Grid-sm</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleCanvasBg("Dotted")}>Dotted</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <div>
                                Opacity
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CanvasBg
