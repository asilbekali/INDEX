import HeroSection from "@/components/home/hero"
import FreeDeliverySection from "@/components/home/delivery"
import ValuesSection from "@/components/home/icons-section"
import AboutSection from "@/components/home/about"

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <FreeDeliverySection />
      <ValuesSection />
      <AboutSection/>
    </div>
  )
}
