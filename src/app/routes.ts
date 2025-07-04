import { createBrowserRouter } from "react-router"
import App from "./App"
import { Home, About, BluePrint, Git } from "./pages"

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: "about",
        Component: About,
      },
      {
        path: "blueprint",
        Component: BluePrint
      },
      {
        path: "git",
        Component: Git
      }
    ]
  }
])