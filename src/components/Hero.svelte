<script>
  import { onMount } from "svelte";
  import profile from "../assets/profile.webp";
  import gsap from "gsap";

  let heroSection;
  let profileImg;
  let nameText;
  let portfolioText;
  let subheadline;
  let navItems;

  onMount(() => {
    // Force a layout calculation for rects
    const rect = profileImg.getBoundingClientRect();

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Initial State Set
    gsap.set([nameText, portfolioText, subheadline, navItems], {
      opacity: 0,
      y: 30,
    });

    // Set profileImg to cover the whole page initially
    gsap.set(profileImg, {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      zIndex: 500,
      borderRadius: 0,
      margin: 0,
      opacity: 1,
    });

    // Animation 1: Profile image from full-screen to its hero position
    tl.to(profileImg, {
      duration: 1.8,
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
      ease: "expo.inOut",
      onUpdate: function () {
        // Bring image to front during middle of animation
        if (this.progress() > 0.5) {
          gsap.set(profileImg, { zIndex: 1000 });
        }
      },
      onComplete: () => {
        // Clear styles so responsive CSS takes over
        gsap.set(profileImg, {
          position: "",
          top: "",
          left: "",
          width: "",
          height: "",
          zIndex: "",
          borderRadius: "",
          margin: "",
        });
      },
    })
      .to(
        navItems,
        {
          duration: 0.8,
          y: 0,
          opacity: 1,
          stagger: 0.1,
        },
        "-=0.6",
      )
      .to(
        nameText,
        {
          duration: 1,
          y: 0,
          opacity: 1,
        },
        "-=0.8",
      )
      .to(
        portfolioText,
        {
          duration: 1,
          y: 0,
          opacity: 1,
        },
        "-=0.7",
      )
      .to(
        subheadline,
        {
          duration: 1,
          y: 0,
          opacity: 1,
        },
        "-=0.6",
      );

    // Parallax effect
    const onMouseMove = (e) => {
      const xPos = (e.clientX / window.innerWidth - 0.5) * 50;
      const yPos = (e.clientY / window.innerHeight - 0.5) * 50;
      gsap.to(profileImg, {
        x: xPos,
        y: yPos,
        duration: 1,
        ease: "power2.out",
      });
    };

    if (window.innerWidth > 1024) {
      heroSection.addEventListener("mousemove", onMouseMove);
    }
    return () => {
      if (window.innerWidth > 1024) {
        heroSection.removeEventListener("mousemove", onMouseMove);
      }
    };
  });
</script>

<section class="hero" bind:this={heroSection}>
  <header>
    <nav>
      <span class="logo" bind:this={navItems}>Portfolio</span>
      <a
        href="mailto:deepmujpara@gmail.com"
        class="contact-btn"
        bind:this={navItems}>Let's Talk</a
      >
    </nav>
  </header>

  <div class="main-content">
    <div class="name-wrapper" bind:this={nameText}>
      <h1>Deep Mujpara</h1>
    </div>

    <div class="image-wrapper">
      <div class="image-container" bind:this={profileImg}>
        <img src={profile} alt="Deep Mujpara" />
      </div>
    </div>

    <div class="portfolio-wrapper" bind:this={portfolioText}>
      <h2 class="portfolio-title">PORTFOLIO</h2>
    </div>

    <div class="tagline" bind:this={subheadline}>
      <p>Software Developer and Designer</p>
    </div>
  </div>
</section>

<style>
  :global(body) {
    background-color: var(--bg);
    margin: 0;
    overflow-x: hidden;
  }

  .hero {
    position: relative;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    padding: 0 2rem;
    font-family: "Inter", sans-serif;
    color: var(
      --text-primary,
      var(--text-dark)
    ); /* Fallback for better theme coverage */
  }

  header {
    width: 100%;
    max-width: 1400px;
    height: 80px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    z-index: 100;
  }

  nav {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    font-weight: 700;
    font-size: 1.2rem;
  }

  .contact-btn {
    font-size: 0.9rem;
    padding: 0.6rem 1.2rem;
    border: 1px solid currentColor;
    border-radius: 50px;
    text-decoration: none;
    color: inherit;
    transition: all 0.3s ease;
  }

  .main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    padding-bottom: 5vh;
  }

  .name-wrapper {
    z-index: 5;
    margin-bottom: -4vw; /* Overlap image */
  }

  h1 {
    font-family: "Playfair Display", serif;
    font-size: clamp(4rem, 7vw, 10rem);
    font-weight: 500;
    margin: 0;
    letter-spacing: -2px;
    white-space: nowrap;
  }

  .image-wrapper {
    position: relative;
    width: clamp(200px, 40vw, 500px);
    aspect-ratio: 4 / 3;
    z-index: 2;
  }

  .image-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: var(--text-secondary);
    transform: rotate(-4deg); /* Added slight tilt like the design */
  }

  .image-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    /* Removed hardcoded grayscale to let CSS vars or preferences handle it if needed */
  }

  .portfolio-wrapper {
    margin-top: -6vw; /* Overlap image */
    z-index: 5;
  }

  .portfolio-title {
    font-size: clamp(5rem, 12vw, 14rem);
    font-weight: 900;
    margin: 0;
    letter-spacing: -4px;
    line-height: 0.8;
    color: var(--text-primary);
  }

  .tagline {
    margin-top: 3rem;
  }

  .tagline p {
    font-size: 1.1rem;
    color: var(--text-secondary);
    letter-spacing: 0.5px;
    margin: 0;
  }

  /* Responsive Adjustments */
  @media (max-width: 768px) {
    h1 {
      font-size: clamp(3rem, 12vw, 6rem);
    }
    .portfolio-title {
      font-size: clamp(4rem, 15vw, 8rem);
    }
    .name-wrapper {
      margin-bottom: -5vw;
    }
    .portfolio-wrapper {
      margin-top: -8vw;
    }
  }
</style>
