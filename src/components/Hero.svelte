<script>
  import { onMount } from "svelte";
  import profile from "../assets/profile.webp";
  import gsap from "gsap";

  let image;
  onMount(() => {
    gsap.fromTo(
      image,
      {
        scale: 5,
        opacity: 1,
      },
      {
        scale: 0.2,
        duration: 1,
        rotation: "-10deg",
        ease: "power3.out",
        opacity: 0.7,
      }
    );
  });
</script>

<section class="hero">
  <header>
    <span class="portfolio"> Portfolio </span>
    <span class="contact">
      <a href="#contact">Contact</a>
    </span>
  </header>
  <div class="content">
    <div class="profile">
      <img bind:this={image} src={profile} alt="" />
    </div>
    <h1>Deep Mujpara</h1>
    <h4>Software Developer</h4>
  </div>
</section>
