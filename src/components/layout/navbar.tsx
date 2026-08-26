import { CircleUser, Menu } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { useUser } from "../context/user-context";

type NavbarProps = {
  transparent?: boolean;
};

export default function Navbar({ transparent = false }: NavbarProps) {
  const { user } = useUser();
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!transparent) return;
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [transparent]);

  const isTransparent = transparent && !scrolled;

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
  ];

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
            className={isTransparent ? "text-emerald-300" : "text-emerald-600"}
          >
            entdecker
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
        {user.isLoggedIn ? (
          <div className="flex items-center gap-4">
            <div className="hidden text-right sm:block">
              <NavLink
                key={"/profile"}
                to="/profile"
                className={({isActive}) =>
                  isActive
                    ? isTransparent
                      ? "text-sm font-semibold text-emerald-300"
                      : "text-sm font-semibold text-emerald-600"
                    : isTransparent
                      ? "text-sm font-semibold text-white/90 hover:text-white"
                      : "text-sm font-semibold text-gray-600 hover:text-gray-900"
                }
              >
                {user.firstName} {user.lastName}
              </NavLink>
            </div>

            <Link
              to="/profile"
              className={
                isTransparent ? "text-emerald-300" : "text-emerald-600"
              }
            >
              <CircleUser className="h-7 w-7" />
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Button
              onClick={() => navigate("/login")}
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
        )}
      </nav>
    </header>
  );
}
