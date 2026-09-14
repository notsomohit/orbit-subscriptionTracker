import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Hero } from '../components/landing/Hero';
import { ReminderTimeline } from '../components/landing/ReminderTimeline';
import { LandingFeatures } from '../components/landing/LandingFeatures';
import { LandingStats } from '../components/landing/LandingStats';
import { ArchitectureOverview } from '../components/landing/ArchitectureOverview';
import { WorkflowEngine } from '../components/landing/WorkflowEngine';
import { ApiReferenceSection } from '../components/landing/ApiReferenceSection';
import { FinalCTA } from '../components/landing/FinalCTA';
import { Footer } from '../components/layout/Footer';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5F0] text-black">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <ReminderTimeline />
        <LandingFeatures />
        <LandingStats />
        <ArchitectureOverview />
        <WorkflowEngine />
        <ApiReferenceSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};
