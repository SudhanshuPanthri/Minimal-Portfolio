import StickyNav from "@/components/StickyNav";
import CategoryNav from "@/components/CategoryNav";
import Hero from "@/components/Hero";
import Works from "@/components/Works";
import Stack from "@/components/Stack";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <StickyNav />
      <main>
        <CategoryNav />
        <Hero />
        <Works />
        <Stack />
        <About />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
