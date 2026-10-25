import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhatWeBuild from "@/components/WhatWeBuild";
import SelectedWork from "@/components/SelectedWork";
import Process from "@/components/Process";
import Commitments from "@/components/Commitments";
import Faq from "@/components/Faq";
import EnquiryForm from "@/components/EnquiryForm";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#080c1d] text-[#f8fafc] antialiased selection:bg-violet-500 selection:text-white relative">
      <Header />
      <main className="flex-1">
        <Hero />
        <WhatWeBuild />
        <SelectedWork />
        <Process />
        <Commitments />
        <Faq />
        <EnquiryForm />
      </main>
      <Footer />
    </div>
  );
}
