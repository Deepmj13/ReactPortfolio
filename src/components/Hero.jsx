import React, { useEffect } from 'react';
import '../App.css';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

function Hero() {
  
  useEffect(() => {
    const loader = document.getElementById("loader");
    window.addEventListener("load", () => {
      loader.style.display = "none";
    })
  },[]);

  if(window.innerWidth > 1000){
    useGSAP(() => {
      gsap.fromTo(".profile", 
        { scale:"5",
          rotate:"0",
          top:"50%",left:"50%",translateX:"-50%",translateY:"-50%",zIndex:"2"
        },   
        { 
          scale:"1.3",      
          duration: 1.8,
          ease: "power4.inOut",top:"60%",left:"50%",translateX:"-60%",translateY:"-50%",rotate:"-15deg",zIndex:"1",
        }
      );
    });
  }
  else{
    useGSAP(() => {
      gsap.fromTo(".profile", 
        { scale:"9",
          rotate:"0",
          top:"50%",left:"50%",translateX:"-50%",translateY:"-50%",zIndex:"2"
        },   
        { 
          scale:"2.5",      
          duration: 1.8,
          ease: "power4.inOut",top:"60%",left:"50%",translateX:"-60%",translateY:"-50%",rotate:"-15deg",zIndex:"1",
        }
      );
    });

  }
  return (
    <section className="hero">
      <div className="container">
        <div className="loader" id="loader"></div>
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
