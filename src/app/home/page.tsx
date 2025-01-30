// "use client"
// import DrwaingBoard from "@/components/DrwaingBoard";
// import ToolBar from '@/components/ToolBar'
// import ShapesSettings from '@/components/ShapesSettings';
// import LayersList from "@/components/LayersList";
// import CanvasSettings from "@/components/CanvasSettings";
// import CroppingSettings from "@/components/CroppingSettings";

// const page = () => {

//     return (
//       <div className="w-full bg-neutral-800 h-screen">
//         <DrwaingBoard />
//         <div className=' flex p-4'>
//           <ToolBar />
//         </div>
//         <LayersList />
//         <ShapesSettings />
//         <CanvasSettings />
//         <CroppingSettings />
//       </div>
//     );
// }

// export default page

import DesignCanvas from "@/components/MainDesignPage/DesignCanvas"
import Toolbar from "@/components/MainDesignPage/Toolbar"
import Sidebar from "@/components/MainDesignPage/Sidebar"

const Page = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-100 md:flex-row">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <Toolbar />
        <DesignCanvas  />
      </main>
    </div>
  )
}

export default Page