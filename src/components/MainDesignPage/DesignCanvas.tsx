import DrwaingBoard from "../DrwaingBoard";

export default function DesignCanvas() {
    return (
        <div className="flex-1 bg-gray-50 p-4 overflow-auto">
            
        <div className="w-full overflow-hidden h-full min-h-[300px] border-2 border-dashed bg-dot-black/[0.3] border-gray-300 rounded-lg flex items-center justify-center">
          <DrwaingBoard />
        </div>
      </div>
    )
  }
  
  