import React, { useEffect, useRef } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/layout/Navbar/Navbar'

import Footer from './components/layout/Footer/Footer'
import Home from './pages/Home'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ScrollSmoother from 'gsap/ScrollSmoother'
import gsap from 'gsap'
import Wishlist from './pages/Wishlist'
import { Toaster } from 'react-hot-toast'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import ShopDetails from './pages/ShopDetails'
import TeamDetails from './pages/TeamDetails'
import BlogDetails from './pages/BlogDetails'
import ScrollToTop from './components/ui/ScrollToTop'
import About from './pages/About'
import GalleryDetails from './pages/GalleryDetails'
import Shop from './pages/Shop'
import Blogs from './pages/Blogs'
import Contact from './pages/Contact'




const App = () => {

  const smootherWrapperRef = useRef(null);
  const smootherContentRef = useRef(null);
  const smoother = useRef(null);
  const location = useLocation();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);  // Plugin de GSAP para scroll suave
    smoother.current = ScrollSmoother.create({             // Creación del scroll suave
      wrapper: smootherWrapperRef.current,
      content: smootherContentRef.current,
      smooth: 1.8,                                       // Suavidad del scroll
      effects: true,                                     // Efectos de scroll
    });
    return () => {
      smoother.current && smoother.current.kill();       // Limpieza del scroll suave
      ScrollTrigger.getAll().forEach(t => t.kill());     // Limpieza de los triggers
    }
  }, [])

  // Resetear scroll y refrescar triggers al cambiar de página
  useEffect(() => {
    if (smoother.current) {
      smoother.current.scrollTop(0);
      ScrollTrigger.refresh();
    }
  }, [location]);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div id="smooth-wrapper" ref={smootherWrapperRef}>
        <Navbar />
        <div id="smooth-content" ref={smootherContentRef}>
          <div className='min-h-screen overflow-clip'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/wishlist' element={<Wishlist />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/checkout' element={<Checkout />} />
              <Route path='/product/:id' element={<ShopDetails />} />
              <Route path='/team/:id' element={<TeamDetails />} />
              <Route path='/blog/:id' element={<BlogDetails />} />
              <Route path='/about' element={<About />} />
              <Route path='/gallery/:id' element={<GalleryDetails />} />
              <Route path='/shop' element={<Shop />} />
              <Route path='/blogs' element={<Blogs />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </div>
          <Footer />
        </div>
        <ScrollToTop />
      </div>
    </>
  )
}

export default App