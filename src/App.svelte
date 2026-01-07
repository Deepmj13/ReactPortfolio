<script>
  import { onMount } from "svelte";
  import Lenis from "lenis";
  import gsap from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import Hero from "./components/Hero.svelte";
  import Services from "./components/Services.svelte";
  import Projects from "./components/Projects.svelte";
  import WorkWithMe from "./components/WorkWithMe.svelte";
  import Footer from "./components/Footer.svelte";
  import Loader from "./components/Loader.svelte";
  import Cursor from "./components/Cursor.svelte";

  gsap.registerPlugin(ScrollTrigger);

  let loader = true;

  setTimeout(() => {
    loader = false;
  }, 3000);

  onMount(() => {
    const lenisConfig = {
      duration: 2.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 1.5,
    };

    const lenis = new Lenis(lenisConfig);

    lenis.on("scroll", ScrollTrigger.update);

    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateTicker);
    };
  });
</script>

<Cursor />

{#if loader}
  <Loader />
{:else}
  <main>
    <Hero />
    <Services />
    <Projects />
    <WorkWithMe />
    <Footer />
  </main>
{/if}
