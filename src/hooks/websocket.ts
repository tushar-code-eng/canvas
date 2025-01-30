import { useEffect, useState } from "react"

const useWebSocket = (socketURL: string) => {
    const [socket, setSocket] = useState<WebSocket | null>(null)

    useEffect(() => {
        const ws = new WebSocket(socketURL)
        setSocket(ws)

        ws.onopen = () => {
            console.log("Connected to the server.")
        }

        ws.onclose = () => {
            console.log("Disconnected from the server.")
        }

        ws.onmessage = (event) => {
            const stroke = JSON.parse(event.data);
            // Render incoming stroke on the canvas
        };

        return () => {
            ws.close();
        };
    }, [socketURL])

    return socket
}

export default useWebSocket