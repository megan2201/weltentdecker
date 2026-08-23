import { useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowUpDown,
  CalendarDays,
  Clock3,
  Heart,
  MapPin,
  Search,
  SlidersHorizontal,
  Star,
  Users,
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
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { useTrip } from "../context/trip-context";
import {
  experiences,
  getExperienceCategories,
  getExperienceCategoryCount,
  getExperienceTags,
} from "@/assets/data/experiences";

type SortOption =
  | "Empfohlen"
  | "Preis aufsteigend"
  | "Preis absteigend"
  | "Beste Bewertungen";

export default function Experiences() {
  const { trip, setDate, setGuests } = useTrip();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sort, setSort] = useState<SortOption>("Empfohlen");

  const filteredExperiences = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    const result = experiences.filter((experience) => {
      // --------------------------------------------------
      // Suche
      // --------------------------------------------------
      const matchesSearch =
        !normalizedSearch ||
        experience.title.toLowerCase().includes(normalizedSearch) ||
        experience.location.toLowerCase().includes(normalizedSearch) ||
        experience.country.toLowerCase().includes(normalizedSearch) ||
        experience.category.toLowerCase().includes(normalizedSearch) ||
        experience.description.toLowerCase().includes(normalizedSearch) ||
        experience.tags.some((tag) =>
          tag.toLowerCase().includes(normalizedSearch),
        );

      // --------------------------------------------------
      // Teilnehmer
      // --------------------------------------------------
      const matchesGuests = experience.maxGuests >= trip.guests;

      // --------------------------------------------------
      // Preis
      // --------------------------------------------------
      const matchesPrice =
        experience.price >= priceRange[0] && experience.price <= priceRange[1];

      // --------------------------------------------------
      // Kategorie
      // --------------------------------------------------
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(experience.category);

      // --------------------------------------------------
      // Tags
      // --------------------------------------------------
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.every((tag) => experience.tags.includes(tag));

      return (
        matchesSearch &&
        matchesGuests &&
        matchesPrice &&
        matchesCategory &&
        matchesTags
      );
    });

    // --------------------------------------------------
    // Sortierung
    // --------------------------------------------------
    return [...result].sort((a, b) => {
      switch (sort) {
        case "Preis aufsteigend":
          return a.price - b.price;

        case "Preis absteigend":
          return b.price - a.price;

        case "Beste Bewertungen":
          return b.rating - a.rating;

        default:
          if (Boolean(a.featured) !== Boolean(b.featured)) {
            return a.featured ? -1 : 1;
          }

          return b.rating - a.rating;
      }
    });
  }, [search, trip.guests, priceRange, selectedCategories, selectedTags, sort]);

  const activeFilterCount =
    selectedCategories.length +
    selectedTags.length +
    (priceRange[0] !== 0 || priceRange[1] !== 500 ? 1 : 0);

  function toggleCategory(category: string) {
    setSelectedCategories((current) =>
      current.includes(category)
        ? current.filter((item) => item !== category)
        : [...current, category],
    );
  }

  function toggleTag(tag: string) {
    setSelectedTags((current) =>
      current.includes(tag)
        ? current.filter((item) => item !== tag)
        : [...current, tag],
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
    setSearchInput("");
    setGuests(2);
    setPriceRange([0, 500]);
    setSelectedCategories([]);
    setSelectedTags([]);
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
              Erlebnisse entdecken
            </h1>

            <p className="mt-2 text-gray-500">
              Entdecke besondere Aktivitäten und unvergessliche Momente an
              deinem Reiseziel.
            </p>
          </div>

          <div className="flex flex-col gap-3 rounded-2xl border bg-gray-50 p-2 lg:flex-row">
            {/* Destination */}
            <div className="flex flex-1 items-center gap-3 rounded-xl bg-white px-4 py-3">
              <MapPin className="h-5 w-5 text-emerald-600" />

              <div className="flex-1">
                <p className="text-xs font-semibold text-gray-500">Suche</p>

                <Input
                  value={searchInput}
                  onChange={(event) => setSearchInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      setSearch(searchInput);
                    }
                  }}
                  placeholder="Was interessiert dich?"
                  className="mt-0.5 h-auto border-0 p-0 text-sm shadow-none focus-visible:ring-0"
                />
              </div>
            </div>

            {/* Date */}
            <Popover open={isDateOpen} onOpenChange={setIsDateOpen}>
              <PopoverTrigger>
                <div className="flex items-center gap-3 rounded-xl bg-white px-5 py-3 text-left lg:min-w-52">
                  <div>
                    <p className="text-xs font-semibold text-gray-500">Datum</p>

                    <p className="mt-0.5 text-sm font-medium">
                      {trip.date
                        ? trip.date.toLocaleDateString("de-DE")
                        : "Datum auswählen"}
                    </p>
                  </div>

                  <CalendarDays className="ml-auto h-5 w-5 text-gray-400" />
                </div>
              </PopoverTrigger>

              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={trip.date}
                  onSelect={(date) => {
                    setDate(date);
                    setIsDateOpen(false);
                  }}
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>

            {/* Guests */}
            <Popover>
              <PopoverTrigger>
                <div className="flex items-center gap-3 rounded-xl bg-white px-5 py-3 text-left lg:min-w-48">
                  <div>
                    <p className="text-xs font-semibold text-gray-500">
                      Teilnehmer
                    </p>

                    <p className="mt-0.5 text-sm font-medium">
                      {trip.guests} Personen
                    </p>
                  </div>

                  <Users className="ml-auto h-5 w-5 text-gray-400" />
                </div>
              </PopoverTrigger>

              <PopoverContent align="end" className="w-72 rounded-2xl p-5">
                <p className="font-semibold">Wie viele Teilnehmer?</p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-gray-500">Teilnehmer</span>

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
          {/* =================================================
              DESKTOP FILTER
          ================================================== */}
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

              <div className="mb-6 h-px bg-gray-200" />

              <FilterContent
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                selectedCategories={selectedCategories}
                toggleCategory={toggleCategory}
                selectedTags={selectedTags}
                toggleTag={toggleTag}
              />
            </div>
          </aside>

          {/* =================================================
              RESULTS
          ================================================== */}
          <section className="min-w-0 flex-1">
            <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <p className="text-sm text-gray-500">
                  {filteredExperiences.length}{" "}
                  {filteredExperiences.length === 1 ? "Erlebnis" : "Erlebnisse"}{" "}
                  gefunden
                </p>

                <h2 className="mt-1 text-xl font-semibold">
                  Besondere Erlebnisse für dich
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
                        <div className="flex items-center">
                          <p>Erlebnisse filtern</p>

                          {activeFilterCount > 0 && (
                            <span className="ml-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-600 px-1.5 text-[10px] font-bold text-white">
                              {activeFilterCount}
                            </span>
                          )}
                        </div>
                      </SheetTitle>

                      {activeFilterCount > 0 && (
                        <button
                          onClick={resetFilters}
                          className="text-left text-sm text-emerald-600 hover:underline"
                        >
                          Zurücksetzen
                        </button>
                      )}
                    </SheetHeader>

                    <div className="mx-5 mb-5">
                      <FilterContent
                        priceRange={priceRange}
                        setPriceRange={setPriceRange}
                        selectedCategories={selectedCategories}
                        toggleCategory={toggleCategory}
                        selectedTags={selectedTags}
                        toggleTag={toggleTag}
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

            {/* =================================================
                EXPERIENCE CARDS
            ================================================== */}
            {filteredExperiences.length > 0 ? (
              <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
                {filteredExperiences.map((experience) => (
                  <article key={experience.id} className="group">
                    {/* Image */}
                    <div className="relative overflow-hidden rounded-2xl">
                      <Link to={`/experiences/${experience.id}`}>
                        <img
                          src={experience.images[0]}
                          alt={experience.title}
                          className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      </Link>

                      {/* Favorite */}
                      <button
                        onClick={() => toggleFavorite(experience.id)}
                        className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur transition hover:scale-105"
                      >
                        <Heart
                          className={`h-5 w-5 ${
                            favorites.includes(experience.id)
                              ? "fill-red-500 text-red-500"
                              : "text-gray-700"
                          }`}
                        />
                      </button>

                      {/* Featured */}
                      {experience.featured && (
                        <div className="absolute left-3 top-3 rounded-full bg-white px-3 py-1.5 text-xs font-semibold shadow-sm">
                          Beliebt
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="mt-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <Link to={`/experiences/${experience.id}`}>
                            <h3 className="truncate text-lg font-semibold hover:underline">
                              {experience.title}
                            </h3>
                          </Link>

                          <p className="mt-1 flex items-center gap-1 text-sm text-gray-500">
                            <MapPin className="h-3.5 w-3.5" />
                            {experience.location}
                          </p>
                        </div>

                        <div className="flex shrink-0 items-center gap-1">
                          <Star className="h-4 w-4 fill-current" />

                          <span className="text-sm font-medium">
                            {experience.rating}
                          </span>
                        </div>
                      </div>

                      <p className="mt-2 text-sm text-gray-500">
                        {experience.category}
                      </p>

                      {/* Meta */}
                      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock3 className="h-3.5 w-3.5" />
                          {experience.duration}
                        </span>

                        <span className="flex items-center gap-1">
                          <Users className="h-3.5 w-3.5" />
                          Bis zu {experience.maxGuests}
                        </span>
                      </div>

                      {/* Tags */}
                      <div className="mt-3 flex flex-wrap gap-2">
                        {experience.tags.slice(0, 3).map((tag) => (
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
                            {experience.price} €
                          </span>

                          <span className="text-sm text-gray-500">
                            {" "}
                            / Person
                          </span>

                          <p className="mt-0.5 text-xs text-gray-500">
                            zzgl. Steuern & Gebühren
                          </p>
                        </div>

                        <Link
                          to={`/experiences/${experience.id}`}
                          className="flex items-center text-sm font-medium text-emerald-700"
                        >
                          Entdecken
                          <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              /* Empty state */
              <div className="rounded-3xl border bg-white px-6 py-20 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
                  <Search className="h-6 w-6 text-gray-500" />
                </div>

                <h3 className="mt-5 text-xl font-semibold">
                  Keine Erlebnisse gefunden
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                  Passe deine Suche oder Filter an, um weitere Erlebnisse zu
                  entdecken.
                </p>

                <Button
                  onClick={resetFilters}
                  className="mt-6 rounded-xl bg-emerald-600 hover:bg-emerald-700"
                >
                  Filter zurücksetzen
                </Button>
              </div>
            )}
          </section>
        </div>
      </section>

      {/* =====================================================
          CTA
      ====================================================== */}
      <section className="border-t bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
                Mehr erleben
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Deine Reise besteht aus mehr als nur einem schönen Ort.
              </h2>

              <p className="mt-5 max-w-xl leading-7 text-gray-500">
                Von lokalen Food-Touren über Outdoor-Abenteuer bis hin zu
                einzigartigen Workshops – entdecke Erlebnisse, die deine Reise
                unvergesslich machen.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-3xl bg-emerald-50 p-6">
                <MapPin className="h-6 w-6 text-emerald-600" />

                <p className="mt-5 text-2xl font-semibold">850+</p>

                <p className="mt-1 text-sm text-gray-500">
                  einzigartige Erlebnisse
                </p>
              </div>

              <div className="rounded-3xl bg-gray-100 p-6">
                <Users className="h-6 w-6 text-gray-700" />

                <p className="mt-5 text-2xl font-semibold">35+</p>

                <p className="mt-1 text-sm text-gray-500">Reiseziele</p>
              </div>

              <div className="rounded-3xl bg-gray-100 p-6">
                <Clock3 className="h-6 w-6 text-gray-700" />

                <p className="mt-5 text-2xl font-semibold">2–8h</p>

                <p className="mt-1 text-sm text-gray-500">
                  flexible Aktivitäten
                </p>
              </div>

              <div className="rounded-3xl bg-emerald-50 p-6">
                <Star className="h-6 w-6 text-emerald-600" />

                <p className="mt-5 text-2xl font-semibold">4.9/5</p>

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

/* ============================================================
   FILTER COMPONENT
============================================================ */

interface FilterContentProps {
  priceRange: number[];
  setPriceRange: (value: number[]) => void;

  selectedCategories: string[];
  toggleCategory: (category: string) => void;

  selectedTags: string[];
  toggleTag: (tag: string) => void;
}

function FilterContent({
  priceRange,
  setPriceRange,
  selectedCategories,
  toggleCategory,
  selectedTags,
  toggleTag,
}: FilterContentProps) {
  return (
    <div className="space-y-8">
      {/* Preis */}
      <div>
        <h3 className="font-semibold">Preis pro Person</h3>

        <div className="mt-5">
          <Slider
            value={priceRange}
            onValueChange={(value) => setPriceRange(value as number[])}
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

      {/* Kategorie */}
      <div>
        <h3 className="font-semibold">Kategorie</h3>

        <div className="mt-4 space-y-3">
          {getExperienceCategories().map((category) => (
            <label
              key={category}
              className="flex cursor-pointer items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={() => toggleCategory(category)}
                />

                <span className="text-sm">{category}</span>
              </div>

              <span className="text-xs text-gray-400">
                {getExperienceCategoryCount(category)}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="h-px bg-gray-200" />

      {/* Tags */}
      <div>
        <h3 className="font-semibold">Tags</h3>

        <div className="mt-4 space-y-3">
          {getExperienceTags()
            .slice(0, 7)
            .map((tag) => (
              <label
                key={tag}
                className="flex cursor-pointer items-center gap-3"
              >
                <Checkbox
                  checked={selectedTags.includes(tag)}
                  onCheckedChange={() => toggleTag(tag)}
                />

                <span className="text-sm">{tag}</span>
              </label>
            ))}
        </div>
      </div>
    </div>
  );
}
