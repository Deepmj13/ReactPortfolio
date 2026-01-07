<script>
  import { onMount, onDestroy } from "svelte";
  import gsap from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";

  gsap.registerPlugin(ScrollTrigger);

  let section;
  let headline;
  let marqueeContainer;
  let magneticBtn;
  let contactSection;

  let mouseX = 0;
  let mouseY = 0;
  let btnX = 0;
  let btnY = 0;

  onMount(() => {
    // --- Headline Scroll Animation ---
    gsap.from(headline, {
      scrollTrigger: {
        trigger: headline,
        start: "top 95%",
        end: "bottom 70%",
        scrub: 1,
      },
      x: -100,
      opacity: 0,
      rotate: 5,
      filter: "blur(8px)",
    });

    // --- Marquee Animation ---
    gsap.to(".marquee-part", {
      xPercent: -100,
      repeat: -1,
      duration: 20,
      ease: "none",
    });

    // --- Magnetic Button Logic ---
    const handleMouseMove = (e) => {
      const isDesktop = window.innerWidth > 1024;
      if (!isDesktop || !magneticBtn) return;

      const rect = magneticBtn.getBoundingClientRect();
      const btnCenterX = rect.left + rect.width / 2;
      const btnCenterY = rect.top + rect.height / 2;

      const dist = Math.hypot(e.clientX - btnCenterX, e.clientY - btnCenterY);

      if (dist < 150) {
        btnX = (e.clientX - btnCenterX) * 0.4;
        btnY = (e.clientY - btnCenterY) * 0.4;
      } else {
        btnX = 0;
        btnY = 0;
      }

      gsap.to(magneticBtn, {
        x: btnX,
        y: btnY,
        duration: 0.6,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  });
</script>

<section class="work-container" id="work-with-me" bind:this={section}>
  <!-- Top Marquee -->
  <div class="marquee" bind:this={marqueeContainer}>
    <div class="marquee-inner">
      <div class="marquee-part">
        LET'S WORK TOGETHER • READY TO COLLABORATE •
      </div>
      <div class="marquee-part">
        LET'S WORK TOGETHER • READY TO COLLABORATE •
      </div>
      <div class="marquee-part">
        LET'S WORK TOGETHER • READY TO COLLABORATE •
      </div>
      <div class="marquee-part">
        LET'S WORK TOGETHER • READY TO COLLABORATE •
      </div>
    </div>
  </div>

  <div class="main-layout">
    <div class="sticky-side">
      <h2 class="headline" bind:this={headline}>
        WORK<br />WITH<br /><span class="outline">ME</span>
      </h2>
    </div>

    <div class="scroll-side">
      <div class="info-block">
        <p class="tagline">HAVE A PROJECT IN MIND?</p>
        <div class="contact-details" bind:this={contactSection}>
          <p>Based in Gujarat, INDIA</p>
          <p>Available for Freelance & Full-time</p>
        </div>
        <div class="sociallinks">
          <a
            href="https://github.com/deepmj13"
            target="_blank"
            rel="noopener noreferrer"
            class="social-link"
            aria-label="GitHub"
          >
            <svg
              width="35"
              height="35"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              ><path
                d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
              /><path d="M9 18c-4.51 2-5-2-7-2" /></svg
            >
          </a>
          <a
            href="https://linkedin.com/in/deepmujpara"
            target="_blank"
            rel="noopener noreferrer"
            class="social-link"
            aria-label="LinkedIn"
          >
            <svg
              width="35"
              height="35"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              ><path
                d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
              /><rect width="4" height="12" x="2" y="9" /><circle
                cx="4"
                cy="4"
                r="2"
              /></svg
            >
          </a>
          <a
            href="https://instagram.com/deepmj13.9"
            target="_blank"
            rel="noopener noreferrer"
            class="social-link"
            aria-label="Instagram"
          >
            <svg
              width="35"
              height="35"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              ><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path
                d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
              /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg
            >
          </a>
        </div>
        <div class="btn-wrap">
          <a
            href="mailto:deepmujpara@gmail.com"
            class="magnetic-btn"
            bind:this={magneticBtn}
          >
            <div class="btn-content">
              <span>GET IN TOUCH</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .work-container {
    min-height: 100vh;
    background-color: var(--bg);
    color: var(--text-primary);
    font-family: "Inter", sans-serif;
    padding-top: 10vh;
    position: relative;
    overflow: hidden;
  }

  /* Marquee Styles */
  .marquee {
    width: 100vw;
    overflow: hidden;
    white-space: nowrap;
    background: var(--text-primary);
    color: var(--bg);
    padding: 1rem 0;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    font-weight: 900;
    font-size: 1.5rem;
    letter-spacing: 2px;
  }

  .marquee-inner {
    display: flex;
    width: fit-content;
  }

  .marquee-part {
    flex-shrink: 0;
    padding-right: 20px;
  }

  .main-layout {
    display: flex;
    padding: 10vh 5vw;
    gap: 10vw;
  }

  .sticky-side {
    flex: 1;
    position: sticky;
    top: 15vh;
    height: min-content;
  }

  .headline {
    font-size: clamp(4rem, 12vw, 12rem);
    font-weight: 900;
    line-height: 0.85;
    margin: 0;
    letter-spacing: -5px;
    text-transform: uppercase;
  }

  .outline {
    color: transparent;
    -webkit-text-stroke: 2px var(--text-primary);
  }

  .scroll-side {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 40vh; /* Space between details and image */
  }

  .info-block {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .tagline {
    font-size: 1.2rem;
    color: var(--text-secondary);
    letter-spacing: 3px;
  }

  .contact-details {
    font-family: "Playfair Display", serif;
    font-size: clamp(1.5rem, 3vw, 3rem);
    line-height: 1.2;
  }

  .btn-wrap {
    margin-top: 4rem;
    width: 200px;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .sociallinks {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .magnetic-btn {
    width: 180px;
    height: 180px;
    background: var(--text-primary);
    color: var(--bg);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    font-weight: 900;
    font-size: 0.9rem;
    transition: transform 0.1s linear;
    border: none;
    cursor: pointer;
  }

  .btn-content {
    pointer-events: none;
  }

  /* Responsive */
  @media (max-width: 1024px) {
    .main-layout {
      flex-direction: column;
      gap: 10vh;
    }

    .sticky-side {
      position: relative;
      top: 0;
    }

    .outline {
      color: var(--text-primary);
      -webkit-text-stroke: 0;
    }

    .scroll-side {
      gap: 15vh;
    }

    .btn-wrap {
      margin: 2rem auto;
    }
  }
</style>
