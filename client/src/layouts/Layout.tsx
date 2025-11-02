import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import { Outlet } from "react-router"
const Layout = () => {
  return (
    <div className="app-layout">
      <Navigation />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout