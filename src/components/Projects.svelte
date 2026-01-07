<script>
  import { onMount } from "svelte";
  import gsap from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import fintech from "../assets/fintech_dashboard_mockup_1767595777543.png";
  import ecommerce from "../assets/ecommerce_minimalist_mockup_1767595795069.png";

  gsap.registerPlugin(ScrollTrigger);

  let section;
  let horizontalContainer;

  const projects = [
    {
      title: "Fintech Flow",
      category: "DASHBOARD / WEB APP",
      year: "2023",
      image: fintech,
      color: "#1a1a1a",
    },
    {
      title: "Aethereal Luxe",
      category: "E-COMMERCE / DESIGN",
      year: "2024",
      image: ecommerce,
      color: "#f5f5f5",
      textColor: "#000",
    },
  ];

  onMount(() => {
    // Horizontal Scroll Animation
    let scrollTween = gsap.to(horizontalContainer, {
      x: () => -(horizontalContainer.scrollWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 1,
        end: () => "+=" + horizontalContainer.scrollWidth,
        invalidateOnRefresh: true,
      },
    });

    // Entrance animation for project titles
    gsap.utils.toArray(".project-card").forEach((card) => {
      gsap.from(card.querySelector(".project-info"), {
        y: 100,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: card,
          containerAnimation: scrollTween,
          start: "left center",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(card.querySelector("img"), {
        scale: 1.2,
        duration: 1.5,
        scrollTrigger: {
          trigger: card,
          containerAnimation: scrollTween,
          start: "left center",
          toggleActions: "play none none reverse",
        },
      });
    });

    // Animate section-title color on horizontal scroll
    gsap.to(".section-title", {
      color: "#aaaaaa",
      scrollTrigger: {
        trigger: horizontalContainer,
        start: "left 70%",
        end: "left 60%",
        toggleActions: "play reverse play reverse",
        containerAnimation: scrollTween,
        scrub: true,
      },
    });
  });
</script>

<section class="projects-section" bind:this={section}>
  <div class="header-wrap">
    <h2 class="section-title">
      DEVELOPED <span class="outline">STUFF</span>
    </h2>
  </div>

  <div class="horizontal-container" bind:this={horizontalContainer}>
    {#each projects as project}
      <div
        class="project-card"
        style="background-color: {project.color}; color: {project.textColor ||
          'white'}"
      >
        <div class="project-inner">
          <div class="image-box">
            <img src={project.image} alt={project.title} />
          </div>
          <div class="project-info">
            <div class="meta">
              <span>{project.year}</span>
              <span class="sep">/</span>
              <span>{project.category}</span>
            </div>
            <h3 class="project-title">{project.title}</h3>
            <a href="https://github.com/deepmj13" class="view-btn"
              >VIEW PROJECT <span class="arrow">→</span></a
            >
          </div>
        </div>
      </div>
    {/each}

    <!-- Ending Card -->
    <div class="project-card final-card">
      <div class="final-content">
        <p>YOUR NEXT BIG PROJECT STARTS HERE.</p>
        <a href="#work-with-me" class="big-link">LET'S TALK</a>
      </div>
    </div>
  </div>
</section>

<style>
  .projects-section {
    overflow: hidden;
    background: var(--bg);
    position: relative;
  }

  .header-wrap {
    padding: 5vh 5vw;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    pointer-events: none;
  }

  .section-title {
    font-size: clamp(3rem, 8vw, 8rem);
    font-weight: 900;
    margin: 0;
    letter-spacing: -2px;
    line-height: 0.9;
  }

  .outline {
    color: transparent;
    -webkit-text-stroke: 1.5px var(--text-primary);
  }

  .horizontal-container {
    display: flex;
    height: 100vh;
    width: fit-content;
    will-change: transform;
  }

  .project-card {
    width: 100vw;
    height: 100vh;
    flex-shrink: 0;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 10vw;
  }

  .project-inner {
    display: flex;
    align-items: center;
    gap: 5vw;
    width: 100%;
    max-width: 1400px;
  }

  .image-box {
    flex: 1.2;
    height: 60vh;
    overflow: hidden;
    border-radius: 4px;
    box-shadow: 0 40px 100px rgba(0, 0, 0, 0.5);
  }

  .image-box img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .project-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .meta {
    font-size: 0.9rem;
    letter-spacing: 2px;
    opacity: 0.7;
    font-weight: 700;
  }

  .sep {
    margin: 0 10px;
  }

  .project-title {
    font-size: clamp(3rem, 5vw, 6rem);
    font-weight: 900;
    margin: 0;
    line-height: 1;
  }

  .view-btn {
    display: flex;
    align-items: center;
    gap: 15px;
    font-size: 1rem;
    font-weight: 700;
    text-decoration: none;
    color: inherit;
    border: 1px solid currentColor;
    width: fit-content;
    padding: 1rem 2rem;
    border-radius: 50px;
    transition: all 0.3s ease;
    margin-top: 1rem;
  }

  .view-btn:hover {
    background: var(--text-primary);
    color: var(--bg);
  }

  .final-card {
    background: var(--text-primary);
    color: var(--bg);
  }

  .final-content {
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .final-content p {
    font-size: 1.5rem;
    letter-spacing: 2px;
    max-width: 400px;
    font-weight: 700;
  }

  .big-link {
    font-size: clamp(4rem, 10vw, 10rem);
    font-weight: 900;
    text-decoration: none;
    color: inherit;
    letter-spacing: -5px;
    line-height: 0.8;
    transition: all 0.3s ease;
  }

  .big-link:hover {
    -webkit-text-stroke: 2px currentColor;

    color: var(--text-secondary);
  }

  @media (max-width: 1024px) {
    .project-inner {
      flex-direction: column;
      gap: 2rem;
      text-align: center;
    }

    .image-box {
      width: 100%;
      height: 40vh;
    }

    .view-btn {
      margin: 0 auto;
    }
  }
</style>
