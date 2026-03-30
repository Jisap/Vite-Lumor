import React, { useEffect, useRef } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/layout/Navbar/Navbar'

import Footer from './components/layout/Footer/Footer'
import Home from './pages/Home'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ScrollSmoother from 'gsap/ScrollSmoother'
import gsap from 'gsap'


const App = () => {

  const smootherWrapperRef = useRef(null);
  const smootherContentRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);  // Plugin de GSAP para scroll suave
    const smoother = ScrollSmoother.create({             // Creación del scroll suave
      wrapper: smootherWrapperRef.current,
      content: smootherContentRef.current,
      smooth: 1.8,                                       // Suavidad del scroll
      effects: true,                                     // Efectos de scroll
    });
    return () => {
      smoother && smoother.kill();                       // Limpieza del scroll suave
      ScrollTrigger.getAll().forEach(t => t.kill());     // Limpieza de los triggers
    }
  }, [])

  return (
    <>
      <div id="smooth-wrapper" ref={smootherWrapperRef}>
        <Navbar />
        <div id="smooth-content" ref={smootherContentRef}>
          <div className='min-h-screen overflow-clip'>
            <Routes>
              <Route path='/' element={<Home />} />

            </Routes>
          </div>
          <Footer />
        </div>
      </div>
    </>
  )
}

export default App