import React, { useEffect, useRef, useState } from 'react';
import { Canvas, Path } from 'fabric';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

interface Point {
    x: number;
    y: number;
}

const LineDrawer = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [fabricCanvas, setFabricCanvas] = useState<Canvas | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [currentLine, setCurrentLine] = useState<Path | null>(null);
    const [points, setPoints] = useState<Point[]>([]);
    const [mousePosition, setMousePosition] = useState<Point | null>(null);

    const canvas = useSelector((state: RootState) => state.canvas.value)

    useEffect(() => {
        if (!canvas) return
        setFabricCanvas(canvas);
        return () => {
            canvas.dispose();

        }
    }, []);

    const startDrawing = () => {
        if (!canvas) return;
        setIsDrawing(true);
        setPoints([]);
        canvas.defaultCursor = 'crosshair';
    };

    const createCurvedPath = (points: Point[], currentMouse: Point | null) => {
        if (points.length === 0) return '';

        let pathData = `M ${points[0].x} ${points[0].y}`;

        if (points.length > 1) {
            for (let i = 0; i < points.length - 1; i++) {
                const current = points[i];
                const next = points[i + 1];
                const controlPoint1 = {
                    x: current.x + (next.x - current.x) / 2,
                    y: current.y
                };
                const controlPoint2 = {
                    x: current.x + (next.x - current.x) / 2,
                    y: next.y
                };
                pathData += ` C ${controlPoint1.x} ${controlPoint1.y}, ${controlPoint2.x} ${controlPoint2.y}, ${next.x} ${next.y}`;
            }
        }

        if (currentMouse && points.length > 0) {
            const last = points[points.length - 1];
            const controlPoint1 = {
                x: last.x + (currentMouse.x - last.x) / 2,
                y: last.y
            };
            const controlPoint2 = {
                x: last.x + (currentMouse.x - last.x) / 2,
                y: currentMouse.y
            };
            pathData += ` C ${controlPoint1.x} ${controlPoint1.y}, ${controlPoint2.x} ${controlPoint2.y}, ${currentMouse.x} ${currentMouse.y}`;
        }

        return pathData;
    };

    useEffect(() => {
        if (!fabricCanvas || !isDrawing) return;

        const handleCanvasClick = (e: any) => {
            const pointer = fabricCanvas.getPointer(e.e);
            const newPoint = { x: pointer.x, y: pointer.y };

            if ((e.e as MouseEvent).detail === 2) {
                // Double click - end drawing
                setIsDrawing(false);
                setCurrentLine(null);
                setPoints([]);
                fabricCanvas.defaultCursor = 'default';
                fabricCanvas.off('mouse:down', handleCanvasClick);
                fabricCanvas.off('mouse:move', handleMouseMove);
            } else {
                // Single click - add point
                setPoints(prev => [...prev, newPoint]);
            }
        };

        const handleMouseMove = (e: any) => {
            const pointer = fabricCanvas.getPointer(e.e);
            setMousePosition({ x: pointer.x, y: pointer.y });
        };

        fabricCanvas.on('mouse:down', handleCanvasClick);
        fabricCanvas.on('mouse:move', handleMouseMove);

        return () => {
            if (fabricCanvas) {
                fabricCanvas.off('mouse:down', handleCanvasClick);
                fabricCanvas.off('mouse:move', handleMouseMove);
            }
        };
    }, [fabricCanvas, isDrawing]);

    useEffect(() => {
        if (!fabricCanvas || !isDrawing) return;

        // Remove previous line
        if (currentLine) {
            fabricCanvas.remove(currentLine);
        }

        // Create new path
        const pathData = createCurvedPath(points, mousePosition);
        const path = new Path(pathData, {
            fill: '',
            stroke: '#000',
            strokeWidth: 2,
            selectable: false
        });

        fabricCanvas.add(path);
        setCurrentLine(path);
        fabricCanvas.renderAll();
    }, [points, mousePosition, isDrawing]);

    return (
        <div className="relative">
            <button
                onClick={startDrawing}
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Start Drawing
            </button>
            <canvas ref={canvasRef} />
        </div>
    );
};

export default LineDrawer;