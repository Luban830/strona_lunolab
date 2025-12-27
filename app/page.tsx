import Hero from '@/components/Hero'
import Services from '@/components/Services'
import CaseStudies from '@/components/CaseStudies'
import VideoSection from '@/components/VideoSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Services />
      <CaseStudies />
      <VideoSection />
      <Footer />
    </main>
  )
}
