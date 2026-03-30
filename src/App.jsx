import React, { useEffect, useRef } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/layout/Navbar/Navbar'

import Footer from './components/layout/Footer/Footer'
import Home from './pages/Home'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'
import ScrollSmoother from 'gsap/ScrollSmoother'


const App = () => {

  const contactRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
    const smoother = ScrollSmoother.create({
      smooth: 1.8,
      effects: true,
    });
    return () => {
      smoother && smoother.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    }
  }, [])

  return (
    <>
      <div id="smooth-wrapper" ref={contactRef}>
        <Navbar />
        <div id="smooth-content">
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