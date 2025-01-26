"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { FileImage, Layers, Settings, Menu } from "lucide-react"
import CanvasSettings from "../CanvasSettings"
import ShapesSettings from "../ShapesSettings"
import CroppingSettings from "../CroppingSettings"
import LayersList from "../LayersList"

const Sidebar=()=> {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="md:hidden fixed top-4 left-4 z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu className="h-4 w-4" />
      </Button>
      <div
        className={`w-64 bg-white border-r border-gray-200 flex flex-col fixed inset-y-0 left-0 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 transition-transform duration-200 ease-in-out md:static`}
      >
        <h1 className="text-2xl font-bold border-b py-3 px-2 ">Shape Designer</h1>
        {/* <CanvasSettings /> */}
        <ShapesSettings />
        <LayersList />
        <CroppingSettings />
        <div className="space-y-4">
          <Button className="w-full justify-start">
            <FileImage className="mr-2 h-4 w-4" />
            New Design
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Layers className="mr-2 h-4 w-4" />
            My Designs
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
        <div className="mt-8 space-y-4">
          <div>
            <Label htmlFor="design-name">Design Name</Label>
            <Input id="design-name" placeholder="Untitled Design" />
          </div>
          <div>
            <Label htmlFor="canvas-size">Canvas Size</Label>
            <Slider id="canvas-size" defaultValue={[50]} max={100} step={1} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar

