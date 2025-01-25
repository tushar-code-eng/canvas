"use client"
import { Button } from "@/components/ui/button"
import { Square, Circle, Minus, Type, Image, Share2, MoreHorizontal } from "lucide-react"
import { useState } from "react"

import ToolBar from "../ToolBar"

export default function Toolbar() {

    return (
        <div className="bg-white border-b border-gray-200 p-2 flex justify-between items-center">
            <div className="flex space-x-2 overflow-x-auto">
                <ToolBar />
            </div>
            <div className="flex space-x-2">
                <Button className="hidden sm:flex">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                </Button>
                <Button variant="outline" size="icon" className="sm:hidden">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}

