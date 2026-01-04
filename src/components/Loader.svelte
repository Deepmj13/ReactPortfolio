<script>
  import { onMount } from 'svelte';
  import gsap from 'gsap';

  let loaderContainer;

  onMount(() => {
    const dots = loaderContainer.querySelectorAll('.dot');

    gsap.to(dots, {
      y: -20,            
      duration: 0.4,
      stagger: 0.2,      
      repeat: -1,         
      yoyo: true,    
      ease: "power1.inOut"
    });
  });
</script>

<div bind:this={loaderContainer} class="loader">
  <div class="dot"></div>
  <div class="dot"></div>
  <div class="dot"></div>
</div>
