import React from "react";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import EventsSection from "@/components/EventsSection";
import RulesSection from "@/components/RulesSection";
import ScheduleSection from "@/components/ScheduleSection";
import MapSection from "@/components/MapSection";
import RegistrationSection from "@/components/RegistrationSection";
import SpeakersSection from "@/components/SpeakersSection";
import Footer from "@/components/Footer";
import IQBusterCard from "@/components/IQBusterCard";
import BitBuzzPosters from "@/components/IQBusterCard";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <CustomCursor />
      <Navbar />
      <HeroSection />
      <EventsSection />
      <BitBuzzPosters/>
      <RulesSection />
      <ScheduleSection />
      <MapSection />
      <RegistrationSection />
      <SpeakersSection />
      <Footer />
    </main>
  );
}