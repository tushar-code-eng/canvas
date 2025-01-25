import { setRefreshKey } from "@/features/refreshSlice"
import { RootState } from "@/store/store"
import { Rect } from "fabric"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import CropIcon from '@mui/icons-material/Crop';

const Cropping = () => {

    const dispatch = useDispatch()
    const canvas = useSelector((state: RootState) => state.canvas.value)

    const onFramesUpdate = () => {
        dispatch(setRefreshKey())
    }


    const addFrameToCanvas = () => {
        if (!canvas) return;

        const frameName = `Frame ${canvas.getObjects("rect").length + 1}`

        const frame = new Rect({
            left: 100,
            top: 100,
            width: 200,
            height: 200,
            fill: "transparent",
            stroke: "red",
            strokeWidth: 1,
            selectable: true,
            evented: true,
            name: frameName
        })

        canvas.add(frame)
        canvas.renderAll()

        const maintainStrokeWidth = (object: any) => {
            const scaleX = object.scaleX || 1
            const scaleY = object.scaleY || 1

            object.set({
                width: object.width * scaleX,
                height: object.height * scaleY,
                scaleX: 1,
                scaleY: 1,
                strokeWidth: 1
            })

            object.setCoords()
        }

        frame.on("scaling", () => {
            maintainStrokeWidth(frame)
            canvas.renderAll()
        })

        frame.on("modified", () => {
            maintainStrokeWidth(frame)
            canvas.renderAll()
        })

        onFramesUpdate()

    }

    return (
        <div onClick={addFrameToCanvas}>
            <CropIcon />
        </div>
    )
}

export default Cropping
