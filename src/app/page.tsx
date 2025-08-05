import Navigation from "@/components/Navigation";
import Work from "@/components/Work";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <div className="min-h-screen">
          <Navigation/>
          <Work/>
          <Contact/>
    </div>
  );
}
