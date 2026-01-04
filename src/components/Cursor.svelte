<script>
    import { onMount } from "svelte";
    import gsap from "gsap";

    let cursor;
    let cursorOuter;
    let sparklesContainer;

    // State for smooth lerping
    let mouse = { x: 0, y: 0 };
    let dotPos = { x: 0, y: 0 };
    let outerPos = { x: 0, y: 0 };
    let isHovering = false;

    const lerp = (start, end, amt) => (1 - amt) * start + amt * end;

    const createSparkle = (x, y) => {
        if (!sparklesContainer) return;

        const sparkle = document.createElement("div");
        sparkle.className = "sparkle";
        sparklesContainer.appendChild(sparkle);

        const size = Math.random() * 3 + 1.5;
        const destX = x + (Math.random() - 0.5) * 60;
        const destY = y + Math.random() * 120 + 40;
        const rotation = Math.random() * 360;

        gsap.set(sparkle, {
            x: x,
            y: y,
            width: size,
            height: size,
            rotation: rotation,
            opacity: 0.8,
            scale: 1,
            backgroundColor:
                Math.random() > 0.5
                    ? "var(--text-primary)"
                    : "var(--text-secondary)",
        });

        gsap.to(sparkle, {
            x: destX,
            y: destY,
            opacity: 0,
            scale: 0,
            rotation: rotation + (Math.random() > 0.5 ? 45 : -45),
            duration: 0.8 + Math.random() * 0.7,
            ease: "power2.out",
            onComplete: () => sparkle.remove(),
        });
    };

    onMount(() => {
        let lastSpawnX = 0;
        let lastSpawnY = 0;
        let rafId;

        const handleMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        const handleMouseOver = (e) => {
            const target = e.target;
            if (
                target.closest(
                    "a, button, .contact-btn, .logo, h1, h2, img, input, textarea",
                )
            ) {
                isHovering = true;
            }
        };

        const handleMouseOut = (e) => {
            const target = e.target;
            if (
                target.closest(
                    "a, button, .contact-btn, .logo, h1, h2, img, input, textarea",
                )
            ) {
                isHovering = false;
            }
        };

        const animate = () => {
            // Smoother follow using lerp
            dotPos.x = lerp(dotPos.x, mouse.x, 0.25);
            dotPos.y = lerp(dotPos.y, mouse.y, 0.25);

            outerPos.x = lerp(outerPos.x, mouse.x, 0.15);
            outerPos.y = lerp(outerPos.y, mouse.y, 0.15);

            if (cursor) {
                cursor.style.transform = `translate3d(${dotPos.x}px, ${dotPos.y}px, 0) translate(-50%, -50%)`;
                gsap.to(cursor, {
                    width: isHovering ? 30 : 6,
                    height: isHovering ? 30 : 6,
                    duration: 0.3,
                    ease: "power2.out",
                });
            }
            if (cursorOuter) {
                cursorOuter.style.transform = `translate3d(${outerPos.x}px, ${outerPos.y}px, 0) translate(-50%, -50%)`;
                gsap.to(cursorOuter, {
                    scale: isHovering ? 0 : 1,
                    opacity: isHovering ? 0 : 1,
                    duration: 0.3,
                    ease: "power2.out",
                });
            }

            // Spawn sparkles based on dot movement
            const dist = Math.hypot(
                dotPos.x - lastSpawnX,
                dotPos.y - lastSpawnY,
            );
            if (dist > 8 && !isHovering) {
                createSparkle(dotPos.x, dotPos.y);
                lastSpawnX = dotPos.x;
                lastSpawnY = dotPos.y;
            }

            rafId = requestAnimationFrame(animate);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseover", handleMouseOver);
        window.addEventListener("mouseout", handleMouseOut);
        rafId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseover", handleMouseOver);
            window.removeEventListener("mouseout", handleMouseOut);
            cancelAnimationFrame(rafId);
        };
    });
</script>

<div bind:this={cursor} class="cursor-dot"></div>
<div bind:this={cursorOuter} class="cursor-outline"></div>
<div bind:this={sparklesContainer} class="sparkles-container"></div>

<style>
    :global(body) {
        cursor: none;
    }

    :global(a),
    :global(button),
    :global(.contact-btn) {
        cursor: none !important;
    }

    .cursor-dot,
    .cursor-outline {
        position: fixed;
        top: 0;
        left: 0;
        pointer-events: none;
        z-index: 9999;
        border-radius: 50%;
        will-change: transform;
    }

    .cursor-dot {
        width: 6px;
        height: 6px;
        background-color: var(--text-primary, #ffffff);
        mix-blend-mode: difference;
    }

    .cursor-outline {
        width: 32px;
        height: 32px;
        border: 1.5px solid var(--text-primary, #ffffff);
        mix-blend-mode: difference;
    }

    .sparkles-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        pointer-events: none;
        z-index: 9998;
    }

    :global(.sparkle) {
        position: absolute;
        top: 0;
        left: 0;
        pointer-events: none;
        transform-origin: center;
        border-radius: 50%;
        will-change: transform, opacity;
    }
</style>
