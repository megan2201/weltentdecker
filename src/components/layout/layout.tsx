import { Outlet } from "react-router-dom"
import Navbar from "./navbar"
import Footer from "./footer"

type LayoutProps = {
  transparentNavbar?: boolean
}

export default function Layout({
    transparentNavbar = false
}: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar transparent={transparentNavbar} />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}