import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Partners from "./components/Partners";
import Security from "./components/Security";
import Workflows from "./components/Workflows";
import Control from "./components/Control";
import SiteFooter from "./components/SiteFooter";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="platform">
        <Hero />
        <Partners />
        <Security />
        <Workflows />
        <Control />
      </main>
      <SiteFooter />
    </>
  );
}
