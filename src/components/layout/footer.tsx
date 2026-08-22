import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer
        id="about"
        className="border-t bg-[#fafafa] px-6 py-14 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-4">
            <div className="md:col-span-2">
              <Link
                to="/"
                className="text-2xl font-bold tracking-tight"
              >
                welt<span className="text-emerald-600">entdecken</span>
              </Link>

              <p className="mt-4 max-w-sm text-sm leading-6 text-gray-500">
                Wir machen es einfacher, besondere Orte zu entdecken und
                Reisen zu buchen, die du nie vergessen wirst.
              </p>

              <div className="flex items-center gap-2 text-sm text-gray-400 mt-4">
                Made for travelers
                <span className="text-emerald-600">♥</span>
              </div>
            </div>

            <div>
              <h3 className="font-semibold">Entdecken</h3>

              <div className="mt-4 space-y-3 text-sm text-gray-500">
                <Link to="/destinations" className="block hover:text-gray-900">
                  Reiseziele
                </Link>
                <Link to="/stays" className="block hover:text-gray-900">
                  Unterkünfte
                </Link>
                <Link to="/experiences" className="block hover:text-gray-900">
                  Erlebnisse
                </Link>
                <Link to="/inspirations" className="block hover:text-gray-900">
                  Reiseinspiration
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-semibold">Über weltentdecken</h3>

              <div className="mt-4 space-y-3 text-sm text-gray-500">
                <a href="#" className="block hover:text-gray-900">
                  Über uns
                </a>
                <a href="#" className="block hover:text-gray-900">
                  Kontakt
                </a>
                <a href="#" className="block hover:text-gray-900">
                  Hilfe & FAQ
                </a>
                <a href="#" className="block hover:text-gray-900">
                  Datenschutz
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    )
}