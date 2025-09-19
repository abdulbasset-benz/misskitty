import Navigation from "@/components/Navigation"
import { Outlet } from "react-router"
const Layout = () => {
  return (
    <div className="app-layout">
      <Navigation />
      <main>
        <Outlet /> {/* This renders the current page */}
      </main>
      {/* <Footer /> */}
    </div>
  )
}

export default Layout