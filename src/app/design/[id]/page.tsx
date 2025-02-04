
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