import { Menu } from "lucide-react"
import { Link, NavLink } from "react-router-dom"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"

type NavbarProps = {
  transparent?: boolean
}

export default function Navbar({
  transparent = false,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    if (!transparent) return

    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }

    window.addEventListener("scroll", handleScroll)

    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [transparent])

  const isTransparent = transparent && !scrolled

  const navItems = [
    {
      label: "Reiseziele",
      href: "/destinations",
    },
    {
      label: "Unterkünfte",
      href: "/stays",
    },
    {
      label: "Erlebnisse",
      href: "/experiences",
    },
    {
      label: "Über uns",
      href: "/about",
    },
  ]

  return (
    <header
      className={`
        fixed left-0 right-0 top-0 z-50
        transition-all duration-300
        ${
          isTransparent
            ? "border-transparent bg-transparent"
            : "border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur-xl"
        }
      `}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          className={`text-2xl font-bold tracking-tight transition-colors ${
            isTransparent ? "text-white" : "text-gray-900"
          }`}
        >
          welt
          <span
            className={
              isTransparent
                ? "text-emerald-300"
                : "text-emerald-600"
            }
          >
            entdecken
          </span>
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive
                    ? isTransparent
                      ? "text-emerald-300"
                      : "text-emerald-600"
                    : isTransparent
                      ? "text-white/90 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className={
              isTransparent
                ? "border-white/40 bg-white/10 text-white backdrop-blur-md hover:bg-white hover:text-gray-900"
                : ""
            }
          >
            Anmelden
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className={
              isTransparent
                ? "text-white hover:bg-white/10 hover:text-white md:hidden"
                : "md:hidden"
            }
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </nav>
    </header>
  )
}