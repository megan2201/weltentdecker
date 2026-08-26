import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"

type TripSearch = {
  checkIn: Date | undefined
  checkOut: Date | undefined
  date: Date | undefined
  guests: number
}

type StoredTrip = {
  checkIn: string | null
  checkOut: string | null
  date: string | null
  guests: number
}

type TripContextType = {
  trip: TripSearch

  setCheckIn: (value: Date | undefined) => void
  setCheckOut: (value: Date | undefined) => void
  setDate: (value: Date | undefined) => void
  setGuests: (value: number) => void

  updateTrip: (
    values: Partial<TripSearch>,
  ) => void

  clearTrip: () => void
}

const defaultTrip: TripSearch = {
  checkIn: undefined,
  checkOut: undefined,
  date: undefined,
  guests: 2,
}

const TripContext =
  createContext<TripContextType | undefined>(
    undefined,
  )

export function TripProvider({
  children,
}: {
  children: ReactNode
}) {
  const [trip, setTrip] =
    useState<TripSearch>(() => {
      try {
        const saved =
          localStorage.getItem(
            "weltentdecker-trip",
          )

        if (!saved) {
          return defaultTrip
        }

        const parsed: StoredTrip =
          JSON.parse(saved)

        return {
          checkIn: parsed.checkIn
            ? new Date(parsed.checkIn)
            : undefined,

          checkOut: parsed.checkOut
            ? new Date(parsed.checkOut)
            : undefined,
          
          date: parsed.date
            ? new Date(parsed.date)
            : undefined,

          guests: parsed.guests ?? 2,
        }
      } catch {
        return defaultTrip
      }
    })

  useEffect(() => {
    const data: StoredTrip = {
      checkIn: trip.checkIn
        ? trip.checkIn.toISOString()
        : null,

      checkOut: trip.checkOut
        ? trip.checkOut.toISOString()
        : null,
      
      date: trip.date
        ? trip.date.toISOString()
        : null,

      guests: trip.guests,
    }

    localStorage.setItem(
      "weltentdecker-trip",
      JSON.stringify(data),
    )
  }, [trip])

  function updateTrip(
    values: Partial<TripSearch>,
  ) {
    setTrip((current) => ({
      ...current,
      ...values,
    }))
  }

  function setCheckIn(
    value: Date | undefined,
  ) {
    updateTrip({
      checkIn: value,
    })
  }

  function setCheckOut(
    value: Date | undefined,
  ) {
    updateTrip({
      checkOut: value,
    })
  }

  function setDate(
    value: Date | undefined,
  ) {
    updateTrip({
      date: value,
    })
  }

  function setGuests(value: number) {
    updateTrip({
      guests: value,
    })
  }

  function clearTrip() {
    setTrip(defaultTrip)

    localStorage.removeItem(
      "weltentdecker-trip",
    )
  }

  return (
    <TripContext.Provider
      value={{
        trip,
        setCheckIn,
        setCheckOut,
        setDate,
        setGuests,
        updateTrip,
        clearTrip,
      }}
    >
      {children}
    </TripContext.Provider>
  )
}

export function useTrip() {
  const context = useContext(TripContext)

  if (!context) {
    throw new Error(
      "useTrip must be used inside TripProvider",
    )
  }

  return context
}