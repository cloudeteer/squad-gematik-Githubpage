import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { FeaturesSection } from "@/components/sections/features";
import { ProjectsSection } from "@/components/sections/projects";
import { CTASection } from "@/components/sections/cta";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <FeaturesSection />
        <ProjectsSection />
        <CTASection />
      </main>
      
      <Footer />
    </div>
  );
}
