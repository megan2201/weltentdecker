import { useMemo, useState } from "react";
import {
  ArrowUpDown,
  Bath,
  BedDouble,
  CalendarDays,
  Heart,
  MapPin,
  Search,
  SlidersHorizontal,
  Star,
  Users,
  Wifi,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link } from "react-router-dom";
import {
  getStayFacilities,
  getStayTypeCount,
  getStayTypes,
  stays,
} from "@/assets/data/stays";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { useTrip } from "../context/TripContext";

type SortOption =
  | "Empfohlen"
  | "Preis aufsteigend"
  | "Preis absteigend"
  | "Beste Bewertungen";

export default function Stays() {
  const { trip, setCheckIn, setCheckOut, setGuests } = useTrip();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);
  const [isCheckOutOpen, setIsCheckOutOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [sort, setSort] = useState<SortOption>("Empfohlen");

  const filteredStays = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    const result = stays.filter((stay) => {
      // -----------------------------
      // Suche
      // -----------------------------
      const matchesSearch =
        !normalizedSearch ||
        stay.name.toLowerCase().includes(normalizedSearch) ||
        stay.location.toLowerCase().includes(normalizedSearch) ||
        stay.country.toLowerCase().includes(normalizedSearch) ||
        stay.type.toLowerCase().includes(normalizedSearch) ||
        stay.description.toLowerCase().includes(normalizedSearch) ||
        stay.tags.some((tag) => tag.toLowerCase().includes(normalizedSearch));

      // -----------------------------
      // Gäste
      // -----------------------------
      const matchesGuests = stay.guests >= trip.guests;

      // -----------------------------
      // Preis
      // -----------------------------
      const matchesPrice =
        stay.pricePerNight >= priceRange[0] &&
        stay.pricePerNight <= priceRange[1];

      // -----------------------------
      // Unterkunftstyp
      // -----------------------------
      const matchesType =
        selectedTypes.length === 0 || selectedTypes.includes(stay.type);

      // -----------------------------
      // Ausstattung
      // -----------------------------
      const matchesFacilities =
        selectedFacilities.length === 0 ||
        selectedFacilities.every((facility) =>
          stay.facilities.includes(facility),
        );

      return (
        matchesSearch &&
        matchesGuests &&
        matchesPrice &&
        matchesType &&
        matchesFacilities
      );
    });

    // -----------------------------
    // Sortierung
    // -----------------------------
    return [...result].sort((a, b) => {
      switch (sort) {
        case "Preis aufsteigend":
          return a.pricePerNight - b.pricePerNight;

        case "Preis absteigend":
          return b.pricePerNight - a.pricePerNight;

        case "Beste Bewertungen":
          return b.rating - a.rating;

        default:
          // Featured zuerst,
          // danach Bewertung
          if (Boolean(a.featured) !== Boolean(b.featured)) {
            return a.featured ? -1 : 1;
          }

          return b.rating - a.rating;
      }
    });
  }, [search, trip.guests, priceRange, selectedTypes, selectedFacilities, sort]);

  const activeFilterCount =
    selectedTypes.length +
    selectedFacilities.length +
    (priceRange[0] !== 0 || priceRange[1] !== 500 ? 1 : 0);

  function toggleType(type: string) {
    setSelectedTypes((current) =>
      current.includes(type)
        ? current.filter((item) => item !== type)
        : [...current, type],
    );
  }

  function toggleFacility(facility: string) {
    setSelectedFacilities((current) =>
      current.includes(facility)
        ? current.filter((item) => item !== facility)
        : [...current, facility],
    );
  }

  function toggleFavorite(id: string) {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  }

  function resetFilters() {
    setSearch("");
    setGuests(2);
    setPriceRange([0, 500]);
    setSelectedTypes([]);
    setSelectedFacilities([]);
    setSort("Empfohlen");
  }

  return (
    <main className="min-h-screen bg-[#fafafa] text-gray-900">
      {/* =====================================================
          SEARCH HERO
      ====================================================== */}
      <section className="mt-20 border-b bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
          <div className="mb-6">
            <h1 className="text-3xl font-semibold tracking-tight">
              Unterkünfte entdecken
            </h1>

            <p className="mt-2 text-gray-500">
              Finde den perfekten Ort für deine nächste Reise.
            </p>
          </div>

          <div className="flex flex-col gap-3 rounded-2xl border bg-gray-50 p-2 lg:flex-row">
            <div className="flex flex-1 items-center gap-3 rounded-xl bg-white px-4 py-3">
              <MapPin className="h-5 w-5 text-emerald-600" />

              <div className="flex-1">
                <p className="text-xs font-semibold text-gray-500">Reiseziel</p>

                <Input
                  value={searchInput}
                  onChange={(event) => setSearchInput(event.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setSearch(searchInput);
                    }
                  }}
                  placeholder="Wohin möchtest du?"
                  className="mt-0.5 h-auto border-0 p-0 text-sm shadow-none focus-visible:ring-0"
                />
              </div>
            </div>

            {/* Check-in */}
            <Popover open={isCheckInOpen} onOpenChange={setIsCheckInOpen}>
              <PopoverTrigger>
                <div className="flex items-center gap-3 rounded-xl bg-white px-5 py-3 text-left lg:min-w-48">
                  <div>
                    <p className="text-xs font-semibold text-gray-500">
                      Check-in
                    </p>
                    <p className="mt-0.5 text-sm font-medium">
                      {trip.checkIn
                        ? trip.checkIn.toLocaleDateString("de-DE")
                        : "Datum auswählen"}
                    </p>
                  </div>

                  <CalendarDays className="ml-auto h-5 w-5 text-gray-400" />
                </div>
              </PopoverTrigger>

              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={trip.checkIn}
                  onSelect={(date) => {
                    if (date) {
                      setCheckIn(date);
                      if (trip.checkOut && date > trip.checkOut) setCheckOut(undefined);
                      setIsCheckInOpen(false);
                    }
                  }}
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>

            {/* Check-out */}
            <Popover open={isCheckOutOpen} onOpenChange={setIsCheckOutOpen}>
              <PopoverTrigger>
                <div className="flex items-center gap-3 rounded-xl bg-white px-5 py-3 text-left lg:min-w-48">
                  <div>
                    <p className="text-xs font-semibold text-gray-500">
                      Check-out
                    </p>
                    <p className="mt-0.5 text-sm font-medium">
                      {trip.checkOut
                        ? trip.checkOut.toLocaleDateString("de-DE")
                        : "Datum auswählen"}
                    </p>
                  </div>

                  <CalendarDays className="ml-auto h-5 w-5 text-gray-400" />
                </div>
              </PopoverTrigger>

              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={trip.checkOut}
                  onSelect={(date) => {
                    setCheckOut(date);
                    setIsCheckOutOpen(false);
                  }}
                  disabled={(date) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);

                    const isPast = date < today;

                    // 2. Tage deaktivieren, die nach/ab dem Check-Out-Datum liegen (falls Check-Out gesetzt ist)
                    const isAfterCheckIn = trip.checkIn ? date < trip.checkIn : false;

                    return isPast || isAfterCheckIn;
                  }}
                />
              </PopoverContent>
            </Popover>

            {/* Guests */}
            <Popover>
              <PopoverTrigger>
                <div className="flex items-center gap-3 rounded-xl bg-white px-5 py-3 text-left lg:min-w-48">
                  <div>
                    <p className="text-xs font-semibold text-gray-500">Reisende</p>
                    <p className="mt-0.5 text-sm font-medium">{trip.guests} Personen</p>
                  </div>

                  <Users className="ml-auto h-5 w-5 text-gray-400" />
                </div>
              </PopoverTrigger>

              <PopoverContent align="end" className="w-72 rounded-2xl p-5">
                <p className="font-semibold">Wie viele Reisende?</p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-gray-500">Anzahl Reisende</span>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setGuests(Math.max(1, trip.guests - 1))}
                      className="flex h-9 w-9 items-center justify-center rounded-full border"
                    >
                      −
                    </button>

                    <span className="w-5 text-center font-medium">
                      {trip.guests}
                    </span>

                    <button
                      onClick={() => setGuests(Math.min(12, trip.guests + 1))}
                      className="flex h-9 w-9 items-center justify-center rounded-full border"
                    >
                      +
                    </button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Button
              onClick={() => setSearch(searchInput)}
              className="h-auto rounded-xl bg-emerald-600 px-7 py-4 hover:bg-emerald-700"
            >
              <Search className="mr-2 h-5 w-5" />
              Suchen
            </Button>
          </div>
        </div>
      </section>

      {/* =====================================================
          CONTENT
      ====================================================== */}
      <section className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="flex gap-10">
          {/* Desktop filters */}
          <aside className="hidden w-64 shrink-0 lg:block">
            <div className="sticky top-28">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold">Filter</h2>

                  {activeFilterCount > 0 && (
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-600 px-1.5 text-[10px] font-bold text-white">
                      {activeFilterCount}
                    </span>
                  )}
                </div>

                {activeFilterCount > 0 && (
                  <button
                    onClick={resetFilters}
                    className="text-sm text-emerald-600 hover:underline"
                  >
                    Zurücksetzen
                  </button>
                )}
              </div>

              <div className="h-px mb-6 bg-gray-200" />

              <FilterContent
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                selectedTypes={selectedTypes}
                toggleType={toggleType}
                selectedFacilities={selectedFacilities}
                toggleFacility={toggleFacility}
              />
            </div>
          </aside>

          {/* Results */}
          <section className="min-w-0 flex-1">
            {/* Result header */}
            <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <p className="text-sm text-gray-500">
                  {filteredStays.length}{" "}
                  {filteredStays.length === 1 ? "Unterkunft" : "Unterkünfte"}{" "}
                  gefunden
                </p>

                <h2 className="mt-1 text-xl font-semibold">
                  Besondere Unterkünfte für dich
                </h2>
              </div>

              <div className="flex gap-2">
                {/* Mobile filter */}
                <Sheet>
                  <SheetTrigger>
                    <div className="inline-flex cursor-pointer items-center justify-center rounded-md border border-input bg-background px-3 py-1 text-sm font-medium hover:bg-accent hover:text-accent-foreground lg:hidden">
                      <SlidersHorizontal className="mr-2 h-4 w-4" />
                      Filter
                    </div>
                  </SheetTrigger>

                  <SheetContent
                    side="left"
                    className="w-[340px] overflow-y-auto"
                  >
                    <SheetHeader>
                      <SheetTitle>
                        <div className="flex">
                          <p>Unterkünfte filtern</p>

                          <div className="ml-2 flex items-center gap-2">
                            {activeFilterCount > 0 && (
                              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-600 px-1.5 text-[10px] font-bold text-white">
                                {activeFilterCount}
                              </span>
                            )}
                          </div>
                        </div>
                      </SheetTitle>

                      {activeFilterCount > 0 && (
                        <button
                          onClick={resetFilters}
                          className="text-sm text-emerald-600 hover:underline text-left"
                        >
                          Zurücksetzen
                        </button>
                      )}
                    </SheetHeader>

                    <div className="mb-5 mx-5">
                      <FilterContent
                        priceRange={priceRange}
                        setPriceRange={setPriceRange}
                        selectedTypes={selectedTypes}
                        toggleType={toggleType}
                        selectedFacilities={selectedFacilities}
                        toggleFacility={toggleFacility}
                      />
                    </div>
                  </SheetContent>
                </Sheet>

                <Select
                  value={sort}
                  onValueChange={(value) => setSort(value as SortOption)}
                >
                  <SelectTrigger className="w-52 rounded-xl">
                    <ArrowUpDown className="mr-2 h-4 w-4" />

                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="Empfohlen">Empfohlen</SelectItem>

                    <SelectItem value="Preis aufsteigend">
                      Preis aufsteigend
                    </SelectItem>

                    <SelectItem value="Preis absteigend">
                      Preis absteigend
                    </SelectItem>

                    <SelectItem value="Beste Bewertungen">
                      Beste Bewertungen
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Cards */}
            <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
              {filteredStays.map((stay) => (
                <article key={stay.id} className="group">
                  {/* Image */}
                  <div className="relative overflow-hidden rounded-2xl">
                    <Link to={`/stays/${stay.id}`}>
                      <img
                        src={stay.images[0]}
                        alt={stay.name}
                        className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    </Link>

                    {/* Favorite */}
                    <button
                      onClick={() => toggleFavorite(stay.id)}
                      className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur transition hover:scale-105"
                    >
                      <Heart
                        className={`h-5 w-5 ${
                          favorites.includes(stay.id)
                            ? "fill-red-500 text-red-500"
                            : "text-gray-700"
                        }`}
                      />
                    </button>

                    {/* Badge */}
                    {stay.featured && (
                      <div className="absolute left-3 top-3 rounded-full bg-white px-3 py-1.5 text-xs font-semibold shadow-sm">
                        Beliebt
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="mt-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <Link to={`/stays/${stay.id}`}>
                          <h3 className="truncate text-lg font-semibold hover:underline">
                            {stay.name}
                          </h3>
                        </Link>

                        <p className="mt-1 flex items-center gap-1 text-sm text-gray-500">
                          <MapPin className="h-3.5 w-3.5" />
                          {stay.location}
                        </p>
                      </div>

                      <div className="flex shrink-0 items-center gap-1">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="text-sm font-medium">
                          {stay.rating}
                        </span>
                      </div>
                    </div>

                    <p className="mt-2 text-sm text-gray-500">{stay.type}</p>

                    {/* Tags */}
                    <div className="mt-3 flex flex-wrap gap-2">
                      {stay.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Price */}
                    <div className="mt-4 flex items-end justify-between">
                      <div>
                        <span className="text-lg font-semibold">
                          {stay.pricePerNight} €
                        </span>

                        <span className="text-sm text-gray-500"> / Nacht</span>

                        <p className="mt-0.5 text-xs text-gray-500">
                          zzgl. Steuern & Gebühren
                        </p>
                      </div>

                      <Link
                        to={`/stays/${stay.id}`}
                        className="text-sm font-semibold text-emerald-600 hover:text-emerald-700"
                      >
                        Details
                        <ArrowRightIcon />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>

      {/* =====================================================
          BOTTOM CTA
      ====================================================== */}
      <section className="border-t bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
                Noch nicht fündig geworden?
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Deine perfekte Unterkunft ist vielleicht nur einen Klick
                entfernt.
              </h2>

              <p className="mt-5 max-w-xl leading-7 text-gray-500">
                Passe deine Suche an und entdecke unsere handverlesenen
                Empfehlungen für beliebte Reiseziele.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-3xl bg-emerald-50 p-6">
                <Wifi className="h-6 w-6 text-emerald-600" />

                <p className="mt-5 text-2xl font-semibold">24/7</p>
                <p className="mt-1 text-sm text-gray-500">Kundenservice</p>
              </div>

              <div className="rounded-3xl bg-gray-100 p-6">
                <Bath className="h-6 w-6 text-gray-700" />

                <p className="mt-5 text-2xl font-semibold">2.400+</p>
                <p className="mt-1 text-sm text-gray-500">
                  besondere Unterkünfte
                </p>
              </div>

              <div className="rounded-3xl bg-gray-100 p-6">
                <BedDouble className="h-6 w-6 text-gray-700" />

                <p className="mt-5 text-2xl font-semibold">48</p>
                <p className="mt-1 text-sm text-gray-500">Länder</p>
              </div>

              <div className="rounded-3xl bg-emerald-50 p-6">
                <Star className="h-6 w-6 text-emerald-600" />

                <p className="mt-5 text-2xl font-semibold">4.8/5</p>
                <p className="mt-1 text-sm text-gray-500">
                  durchschnittliche Bewertung
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

interface FilterContentProps {
  priceRange: number[];
  setPriceRange: (value: number[]) => void;
  selectedTypes: string[];
  toggleType: (type: string) => void;
  selectedFacilities: string[];
  toggleFacility: (type: string) => void;
}

function FilterContent({
  priceRange,
  setPriceRange,
  selectedTypes,
  toggleType,
  selectedFacilities,
  toggleFacility,
}: FilterContentProps) {
  return (
    <div className="space-y-8">
      {/* Preis */}
      <div>
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Preis pro Nacht</h3>
        </div>

        <div className="mt-5">
          <Slider
            value={priceRange}
            onValueChange={(val) => setPriceRange(val as number[])}
            max={500}
            step={10}
          />
        </div>

        <div className="mt-4 flex justify-between text-sm text-gray-500">
          <span>{priceRange[0]} €</span>
          <span>{priceRange[1]} €</span>
        </div>
      </div>

      <div className="h-px bg-gray-200" />

      {/* Unterkunftstyp */}
      <div>
        <h3 className="font-semibold">Unterkunftstyp</h3>

        <div className="mt-4 space-y-3">
          {getStayTypes().map((type) => (
            <label
              key={type}
              className="flex cursor-pointer items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={selectedTypes.includes(type)}
                  onCheckedChange={() => toggleType(type)}
                />
                <span className="text-sm">{type}</span>
              </div>

              <span className="text-xs text-gray-400">
                {getStayTypeCount(type)}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="h-px bg-gray-200" />

      {/* Ausstattung */}
      <div>
        <h3 className="font-semibold">Ausstattung</h3>

        <div className="mt-4 space-y-3">
          {getStayFacilities()
            .slice(0, 6)
            .map((item) => (
              <label
                key={item}
                className="flex cursor-pointer items-center gap-3"
              >
                <Checkbox
                  checked={selectedFacilities.includes(item)}
                  onCheckedChange={() => toggleFacility(item)}
                />
                <span className="text-sm">{item}</span>
              </label>
            ))}
        </div>
      </div>
    </div>
  );
}

function ArrowRightIcon() {
  return <span className="ml-1 inline-block">→</span>;
}
