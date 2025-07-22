import HeroSection from "@/components/home/hero-section"
import FreeDeliverySection from "@/components/home/free-delivery-section"
import ValuesSection from "@/components/home/values-section"
import AboutSection from "@/components/home/about-section"

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <FreeDeliverySection />
      <ValuesSection />
      <AboutSection />
    </div>
  )
}
