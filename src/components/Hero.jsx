import React from 'react';
import '../App.css';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

function Hero() {

  useGSAP(() => {
    gsap.fromTo(".profile", 
      { scale:"5",
        rotate:"0",
        top:"50%",left:"50%",translateX:"-50%",translateY:"-50%",zIndex:"2"
       },   // image spans full width
      { 
        scale:"1.3",      
        duration: 1.8,
        ease: "power4.inOut",top:"60%",left:"50%",translateX:"-60%",translateY:"-50%",rotate:"-15deg",zIndex:"1",
      }
    );
  });

  return (
    <section className="hero">
        <span className="grey"></span>

      <div className="container">
        <div className="wrapper">
          <span className="name">Deep Mujpara</span>
          <span className="profile">
            <img src="./profile.jpg" alt="" />
          </span>

          <span className="portfolio">Portfolio</span>
        </div>
      </div>
    </section>
  );
}

export default Hero;
