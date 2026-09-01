import HomeHero from "@/components/pages/home/home-hero"
import HomeDestinations from "@/components/pages/home/home-destinations"
import HomeInspiration from "@/components/pages/home/home-inspiration"
import HomeStays from "@/components/pages/home/home-stays"
import HomeWhyUs from "@/components/pages/home/home-why-us"
import HomeExperiences from "@/components/pages/home/home-experiences"

export default function Home() {
  
  return (
    <div>
        <HomeHero />
        <HomeDestinations />
        <HomeInspiration />
        <HomeStays />
        <HomeWhyUs />
        <HomeExperiences />
    </div>
  )
}