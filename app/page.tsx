import Hero from '@/components/Hero'
import StatsSection from '@/components/StatsSection'
import Services from '@/components/Services'
import CaseStudies from '@/components/CaseStudies'
import VideoSection from '@/components/VideoSection'
import SocialSection from '@/components/SocialSection'
import HashScrollHandler from '@/components/HashScrollHandler'
import SectionDivider from '@/components/SectionDivider'
import ProcessTimeline from '@/components/ProcessTimeline'
import OurApproach from '@/components/OurApproach'
import StructuredData from '@/components/StructuredData'

export default function Home() {
  return (
    <main className="min-h-screen">
      <StructuredData />
      <HashScrollHandler />
      <Hero />
      <SectionDivider />
      <StatsSection />
      <SectionDivider />
      <VideoSection />
      <SectionDivider />
      <Services />
      <SectionDivider />
      <ProcessTimeline />
      <SectionDivider />
      <OurApproach />
      <SectionDivider />
      <CaseStudies />
      <SectionDivider />
      <SocialSection />
    </main>
  )
}
