import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/layout/Navbar/Navbar'

import Footer from './components/layout/Footer/Footer'
import Home from './pages/Home'
import About from './components/sections/about'


const App = () => {
  return (
    <>
      <div id="smooth-wrapper">
        <Navbar />
        <div id="smooth-content">
          <div className='min-h-screen overflow-clip'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </div>
    </>
  )
}

export default App