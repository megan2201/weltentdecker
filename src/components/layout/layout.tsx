import { Outlet } from "react-router-dom"
import Navbar from "./navbar"
import Footer from "./footer"

type LayoutProps = {
  transparentNavbar?: boolean,
  noLayout?: boolean
}

export default function Layout({
    transparentNavbar = false,
    noLayout = false
}: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      { !noLayout && <Navbar transparent={transparentNavbar} /> }

      <main className="flex-1">
        <Outlet />
      </main>

      { !noLayout && <Footer /> }
    </div>
  )
}