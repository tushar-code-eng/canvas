import { Line } from "fabric"

export const snappingDistance = 10  

export const SnappingHelpers = (canvasValue:any, obj: any, guidelines: any, setGuidelines: any) => {

    if (!canvasValue) return;

    const canvasWidth = canvasValue.width
    const canvasHeight = canvasValue.height

    const left = obj.left
    const top = obj.top

    const right = left + obj.width * obj.scaleX
    const bottom = top + obj.height * obj.scaleY

    const centerX = left + (obj.width * obj.scaleX) / 2
    const centerY = top + (obj.height * obj.scaleY) / 2

    const newGuidelines = []

    clearGuidelines(canvasValue)

    let snapped = false

    if (Math.abs(left) < snappingDistance) {
        obj.set({ left: 0 })
        if (!guidelineExists(canvasValue, "vertical-left")) {
            const line = createVerticalGuideline(canvasValue, 0, "vertical-left")
            newGuidelines.push(line)
            canvasValue.add(line)
        }
        snapped = true
    }

    if (Math.abs(top) < snappingDistance) {
        obj.set({ top: 0 })
        if (!guidelineExists(canvasValue, "horizontal-top")) {
            const line = createHorizontalGuideline(canvasValue, 0, "horizontal-top")
            newGuidelines.push(line)
            canvasValue.add(line)
        }
        snapped = true
    }

    if (Math.abs(right - canvasWidth) < snappingDistance) {
        obj.set({ left: canvasWidth - obj.width * obj.scaleX })
        if (!guidelineExists(canvasValue, "vertical-right")) {
            const line = createVerticalGuideline(canvasValue, canvasWidth, "vertical-right")
            newGuidelines.push(line)
            canvasValue.add(line)
        }
        snapped = true
    }

    if (Math.abs(bottom - canvasHeight) < snappingDistance) {
        obj.set({ top: canvasHeight - obj.height * obj.scaleY })
        if (!guidelineExists(canvasValue, "horizontal-bottom")) {
            const line = createHorizontalGuideline(canvasValue, canvasHeight, "horizontal-bottom")
            newGuidelines.push(line)
            canvasValue.add(line)
        }
        snapped = true
    }

    if (Math.abs(centerX - canvasWidth / 2) < snappingDistance) {
        obj.set({ left: canvasWidth / 2 - (obj.width * obj.scaleX) / 2 })
        if (!guidelineExists(canvasValue, "vertical-center")) {
            const line = createVerticalGuideline(canvasValue, canvasWidth / 2, "vertical-center")
            newGuidelines.push(line)
            canvasValue.add(line)
        }
        snapped = true
    }

    if (Math.abs(centerY - canvasHeight / 2) < snappingDistance) {
        obj.set({ top: canvasHeight / 2 - (obj.height * obj.scaleY) / 2 })
        if (!guidelineExists(canvasValue, "horizontal-center")) {
            const line = createHorizontalGuideline(canvasValue, canvasHeight / 2, "horizontal-center")
            newGuidelines.push(line)
            canvasValue.add(line)
        }
        snapped = true
    }

    if (!snapped) {
        clearGuidelines(canvasValue)
    } else {
        setGuidelines(newGuidelines)
    }

    canvasValue.renderAll()
}

export const createVerticalGuideline = (canvas: any, x: any, id: any) => {
    return new Line([x, 0, x, canvas.height], {
        id,
        stroke: "red",
        strokeWidth: 1,
        selectable: false,
        evented: false,
        strokeDashArray: [5, 5],
        opacity: 0.8
    })
}

export const createHorizontalGuideline = (canvas: any, y: any, id: any) => {
    return new Line([0, y, canvas.width,y], {
        id,
        stroke: "red",
        strokeWidth: 1,
        selectable: false,
        evented: false,
        strokeDashArray: [5, 5],
        opacity: 0.8
    })
}

export const clearGuidelines = (canvas: any) => {
    const objects = canvas.getObjects("line")
    objects.forEach((obj: any) => {
        if (
            (obj.id && obj.id.startsWith("vertical-")) || obj.id.startsWith("horizontal-")
        ) {
            canvas.remove(obj)
        }
    })

    canvas.renderAll()
}

const guidelineExists = (canvas: any, id: any) => {
    const objects = canvas.getObjects("line")
    return objects.some((obj: any) => obj.id === id)
}

