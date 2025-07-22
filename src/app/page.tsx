import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";
import Work from "@/components/Work";
import Bio from "@/components/Bio";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <div className="min-h-screen">
          <Navigation/>
          <Hero/>
          <Work/>
          <Bio/>
          <Contact/>
    </div>
  );
}
