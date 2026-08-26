import { ArrowLeft, Compass } from "lucide-react"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f5f7f5] px-6">
      {/* Decorative background */}
      <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-emerald-200/40 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-emerald-100/50 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        {/* Logo */}
        <Link
          to="/"
          className="inline-block text-2xl font-bold tracking-tight text-gray-900"
        >
          welt<span className="text-emerald-600">entdecker</span>
        </Link>

        {/* Icon */}
        <div className="mx-auto mt-16 flex h-24 w-24 items-center justify-center rounded-3xl bg-emerald-100">
          <Compass className="h-12 w-12 text-emerald-600" />
        </div>

        {/* 404 */}
        <p className="mt-10 text-8xl font-bold tracking-tighter text-gray-900 sm:text-9xl">
          404
        </p>

        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
          Diese Reise führt nirgendwohin.
        </h1>

        <p className="mx-auto mt-5 max-w-lg text-base leading-7 text-gray-500 sm:text-lg">
          Die Seite, die du suchst, konnten wir leider nicht finden. Vielleicht
          hat sie sich auf eine andere Reise begeben.
        </p>

        {/* Back home */}
        <Button
          size="lg"
          className="mt-9 h-12 rounded-xl bg-emerald-600 px-6 hover:bg-emerald-700"
        >
          <Link to="/" className="flex justify-center items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Zurück zur Startseite
          </Link>
        </Button>
      </div>
    </main>
  )
}