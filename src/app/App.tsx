import { Outlet } from "react-router"
import { SideMenu } from "./components/organisms"

function App() {
  return (
    <>
      <div className={"flex flex-wrap w-full min-h-screen"}>
        <SideMenu />
        <div className={"flex-1 min-w-0 p-4"}>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default App