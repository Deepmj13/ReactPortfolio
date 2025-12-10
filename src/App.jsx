// import gsap from 'gsap';
// import {useGSAP} from '@gsap/react';

import { useEffect } from "react";
import About from "./components/about";
import Hero from "./components/Hero";


function App() {

  useEffect(() => {
    const loader = document.getElementById("loader");
    if(loader) loader.style.display = "none";
  },[]);
  return (
    <>
      <Hero />
      <About />
    </>
  );
}

export default App;