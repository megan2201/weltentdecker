import Hero from "@/components/home/hero"
import Destinations from "@/components/home/destinations"
import Inspiration from "@/components/home/inspiration"
import Stays from "@/components/home/stays"
import WhyUs from "@/components/home/why-us"
import Experiences from "@/components/home/experiences"
import Newsletter from "./home/newsletter"

export default function Home() {
  
  return (
    <div>
        <Hero />
        <Destinations />
        <Inspiration />
        <Stays />
        <WhyUs />
        <Experiences />
        <Newsletter />
    </div>
  )
}