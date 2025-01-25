"use client"
import { useEffect, useRef } from 'react'
import { Canvas,Point } from 'fabric'

interface ExtendedCanvas extends Canvas {
    isDragging?: boolean;
    lastPosX?: number;
    lastPosY?: number;
}

const Page = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        if (!canvasRef.current) return

        // Create a very large canvas
        const canvas = new (Canvas as any)(canvasRef.current, {
            width: window.innerWidth * 2,
            height: window.innerHeight * 2,
            backgroundColor: '#121212',
            selection: true,
        }) as ExtendedCanvas

        canvas.isDragging = false;

        // Center the viewport
        canvas.setViewportTransform([1, 0, 0, 1, window.innerWidth / 2, window.innerHeight / 2])

        // Enable panning
        canvas.on('mouse:down', (opt) => {
            const evt = opt.e;
            if (evt instanceof MouseEvent) {
                if (evt.altKey === true) {
                    canvas.isDragging = true;
                    canvas.lastPosX = evt.clientX;
                    canvas.lastPosY = evt.clientY;
                }
            }
        })

        canvas.on('mouse:move', (opt) => {
            if (canvas.isDragging) {
                const evt = opt.e;
                if (evt instanceof MouseEvent) {
                    const vpt = canvas.viewportTransform;
                    if (!vpt) return;

                    // Use default values if lastPosX or lastPosY are undefined
                    const lastPosX = canvas.lastPosX ?? evt.clientX; 
                    const lastPosY = canvas.lastPosY ?? evt.clientY;

                    vpt[4] += evt.clientX - lastPosX;
                    vpt[5] += evt.clientY - lastPosY;
                    canvas.requestRenderAll();
                    canvas.lastPosX = evt.clientX; // Update lastPosX
                    canvas.lastPosY = evt.clientY; // Update lastPosY
                }
            }
        })

        canvas.on('mouse:up', () => {
            canvas.isDragging = false
        })

        // Enable zooming
        canvas.on('mouse:wheel', (opt) => {
            const delta = opt.e.deltaY
            let zoom = canvas.getZoom()
            zoom *= 0.999 ** delta
            if (zoom > 20) zoom = 20
            if (zoom < 0.01) zoom = 0.01

            // Create a Point instance for zoomToPoint
            const point = new Point(opt.e.offsetX, opt.e.offsetY);
            canvas.zoomToPoint(point, zoom); // Use the Point instance
            opt.e.preventDefault()
            opt.e.stopPropagation()
        })

        // Handle window resize
        const handleResize = () => {
            canvas.setDimensions({
                width: window.innerWidth * 2,
                height: window.innerHeight * 2
            })
        }
        window.addEventListener('resize', handleResize)

        return () => {
            canvas.dispose()
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return (
        <div className="flex-1 bg-gray-50 p-4 overflow-auto">
            <div className="w-full h-full min-h-[300px] border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                <canvas ref={canvasRef} className="w-full h-full" />
            </div>
        </div>
    )
}

export default Page
