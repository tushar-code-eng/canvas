// "use client"

// import { useState, useRef, useEffect } from "react"
// import Toolbar from "./Toolbar"
// import type { Shape, ShapeType } from "../utils/Shape"
// import { drawShape } from "../utils/drawUtils"

// export default function ShapeDesigner() {
//   const canvasRef = useRef<HTMLCanvasElement>(null)
//   const [shapes, setShapes] = useState<Shape[]>([])
//   const [selectedShape, setSelectedShape] = useState<ShapeType>("rectangle")
//   const [isDrawing, setIsDrawing] = useState(false)
//   const [startPoint, setStartPoint] = useState<{ x: number; y: number } | null>(null)

//   useEffect(() => {
//     const canvas = canvasRef.current
//     if (!canvas) return

//     const ctx = canvas.getContext("2d")
//     if (!ctx) return

//     ctx.clearRect(0, 0, canvas.width, canvas.height)
//     shapes.forEach((shape) => drawShape(ctx, shape))
//   }, [shapes])

//   const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
//     const canvas = canvasRef.current
//     if (!canvas) return

//     const rect = canvas.getBoundingClientRect()
//     const x = e.clientX - rect.left
//     const y = e.clientY - rect.top

//     setIsDrawing(true)
//     setStartPoint({ x, y })
//   }

//   const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
//     if (!isDrawing || !startPoint) return

//     const canvas = canvasRef.current
//     if (!canvas) return

//     const rect = canvas.getBoundingClientRect()
//     const x = e.clientX - rect.left
//     const y = e.clientY - rect.top

//     const newShape: Shape = {
//       type: selectedShape,
//       x: startPoint.x,
//       y: startPoint.y,
//       width: x - startPoint.x,
//       height: y - startPoint.y,
//     }

//     setShapes([...shapes.slice(0, -1), newShape])
//   }

//   const handleMouseUp = () => {
//     setIsDrawing(false)
//     setStartPoint(null)
//   }

//   return (
//     <div className="flex flex-col items-center">
//       <Toolbar selectedShape={selectedShape} onSelectShape={setSelectedShape} />
//       <canvas
//         ref={canvasRef}
//         width={800}
//         height={600}
//         className="border border-gray-300"
//         onMouseDown={handleMouseDown}
//         onMouseMove={handleMouseMove}
//         onMouseUp={handleMouseUp}
//       />
//     </div>
//   )
// }

