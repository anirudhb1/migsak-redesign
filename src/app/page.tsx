import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhatWeBuild from "@/components/WhatWeBuild";
import SelectedWork from "@/components/SelectedWork";
import Process from "@/components/Process";
import Commitments from "@/components/Commitments";
import Faq from "@/components/Faq";
import EnquiryForm from "@/components/EnquiryForm";
import Footer from "@/components/Footer";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import BackToTop from "@/components/BackToTop";
import SectionDivider from "@/components/SectionDivider";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#080c1d] text-[#f8fafc] antialiased relative animate-page-enter">
      {/* 1. Thin Scroll Progress Bar under header */}
      <ScrollProgressBar />

      {/* 2. Floating Header with Scroll-Spy Nav */}
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero />
        <SectionDivider />

        {/* Feature 2: Service Explorer (Tabbed Bento) */}
        <WhatWeBuild />
        <SectionDivider />

        {/* Feature 4: Selected Work with 3D Tilt, Spotlight & Abstract Art */}
        <SelectedWork />
        <SectionDivider />

        {/* Feature 5: Process Timeline */}
        <Process />
        <SectionDivider />

        {/* Commitments with Spring-Pop Ticks */}
        <Commitments />
        <SectionDivider />

        {/* FAQ with Smooth Grid Height Accordion */}
        <Faq />
        <SectionDivider />

        {/* Enquiry Form with Feature 3 (EnquiryTravelDemo) */}
        <EnquiryForm />
      </main>

      {/* Footer with Migsak Watermark and Animated Link Underlines */}
      <Footer />

      {/* Floating Back to Top with Scroll Progress Ring */}
      <BackToTop />
    </div>
  );
}
