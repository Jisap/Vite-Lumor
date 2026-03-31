import React, { useEffect, useRef } from 'react'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import sectionBanner from "/images/section-banner.jpg"



gsap.registerPlugin(ScrollTrigger);


const PageBanner = ({ title, currentPage, productName }) => {

  const bannerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const heading = bannerRef.current.querySelector("h3");
      const breadcrumb = bannerRef.current.querySelector("ul");

      gsap.from(heading, {
        x: -100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: bannerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        },
      });

      gsap.from(breadcrumb, {
        x: -50,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: bannerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        },
      });
    }, bannerRef);

    return () => ctx.revert();
  }, [])

  return (
    <>
      <div
        ref={bannerRef}
        className='section-banner bg-center bg-cover bg-no-repeat min-h-120 md:min-h-132 flex flex-col justify-center relative z-1 pt-22 overflow-hidden'
        style={{
          backgroundImage: `url(${sectionBanner})`
        }}
      >
        <div className='container mx-auto px-4 z-10'>
          <h3 className='text-4xl md:text-5xl lg:text-7xl text-white font-semibold mb-5'>
            {productName ? productName : title}
          </h3>

          <ul className='flex items-center text-white space-x-3 text-lg font-medium montserrat'>
            <li>
              <Link to="/" className='text-white hover:text-cyan-brand transition-colors'>
                Home
              </Link>
            </li>

            <ChevronRight size={18} className='text-cyan-brand' />

            <li>
              <span className="opacity-80">
                {currentPage}
              </span>
            </li>

            {productName && (
              <>
                <ChevronRight size={18} className='text-cyan-brand' />
                <li className="text-cyan-brand">
                  {productName}
                </li>
              </>
            )}
          </ul>
        </div>

        <div className='overlay bg-primary absolute top-0 left-0 w-full h-full opacity-60'></div>
      </div>
    </>
  )
}

export default PageBanner;