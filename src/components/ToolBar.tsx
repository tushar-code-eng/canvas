"use client"
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { setCanvas } from '@/features/canvasSlice'
import { Canvas,Circle,Triangle,Rect } from "fabric";

import Crop54Icon from "@mui/icons-material/Crop54";
import Brightness1OutlinedIcon from '@mui/icons-material/Brightness1Outlined';
import ChangeHistoryOutlinedIcon from '@mui/icons-material/ChangeHistoryOutlined';

const ToolBar = () => {
    const canvasValue = useSelector((state: RootState) => state.canvas.value)
    const addRec = () => {
        if (canvasValue) {
            const rectangle = new Rect({
                top: 100,
                left: 50,
                width: 100,
                height: 60,
                fill: "#D84D42",
            });

            canvasValue.add(rectangle);
        }
    };
    const addCir = () => {
        if (canvasValue) {
            const circle = new Circle({
                top: 100,
                left: 50,
                radius:50,
                fill: "#142b4f",
            });

            canvasValue.add(circle);
        }
    };
    const addTri = () => {
        if (canvasValue) {
            const traingle = new Triangle({
                top: 100,
                left: 50,
                width: 100,
                height: 60,
                fill: "#738fcf",
            });

            canvasValue.add(traingle);
        }
    };
    return (
        <div className='flex flex-col gap-2'>
            <div className="hover:bg-[#424141] p-1 cursor-pointer rounded-xl" onClick={() => addRec()}>
                <Crop54Icon />
            </div>
            <div className="hover:bg-[#424141] p-1 cursor-pointer rounded-xl" onClick={() => addCir()}>
                <Brightness1OutlinedIcon />
            </div>
            <div className="hover:bg-[#424141] p-1 cursor-pointer rounded-xl" onClick={() => addTri()}>
                <ChangeHistoryOutlinedIcon />
            </div>
        </div>
    )
}

export default ToolBar
