import { Hero } from "@/components/hero"
import { QuickLinks } from "@/components/quick-links"
import { NewsSection } from "@/components/news-section"

export default function HomePage() {
  return (
    <main>
      <Hero />
      <QuickLinks />
      <NewsSection />
    </main>
  )
}
