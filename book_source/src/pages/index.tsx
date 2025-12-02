import { Navbar } from "../components/navbar"
import { HeroSection } from "../components/hero-section"
import { StatsSection } from "../components/stats-section"
import { AboutSection } from "../components/about-section"
import { ModulesSection } from "../components/modules-section"
import { CTASection } from "../components/cta-section"
import { Footer } from "../components/footer"

export default function Home() {
  return (
    <div style={{
      background: "black"
    }}>
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <AboutSection />
        <ModulesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
