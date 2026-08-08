import React from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import EventsSection from "@/components/EventsSection";
import RulesSection from "@/components/RulesSection";
import ScheduleSection from "@/components/ScheduleSection";
import MapSection from "@/components/MapSection";
import RegistrationSection from "@/components/RegistrationSection";
import SpeakersSection from "@/components/SpeakersSection";
import GallerySection from "@/components/GallerySection";
import Footer from "@/components/Footer";
import { FloatingParticles } from "@/components/ui/FloatingParticles";


export default function Home() {
  return (
    <main className="min-h-screen bg-brand-navy">
      <FloatingParticles />
      <Navbar />
      <HeroSection />
      <RulesSection />
      <EventsSection />
      <ScheduleSection />
      <MapSection />
      <RegistrationSection />
      <GallerySection />
      <SpeakersSection />
      <Footer />
    </main>
  );
}