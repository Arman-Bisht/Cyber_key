import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import KeyboardVideoSection from "./components/KeyboardVideoSection";
import Features from "./components/Features";
import Builder from "./components/Builder";
import RGBShowcase from "./components/RGBShowcase";
import Testimonials from "./components/Testimonials";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="bg-cyber-dark min-h-screen text-white font-sans selection:bg-cyber-blue/30 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <KeyboardVideoSection />
        <Features />
        <Builder />
        <RGBShowcase />
        <Testimonials />
        <Gallery />
      </main>
      <Footer />
    </div>
  );
}
