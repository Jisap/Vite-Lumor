import React, { useRef, useEffect } from 'react'
import gsap from "gsap"
import MainBtn from '../components/ui/Buttons/MainBtn'

const Page404 = () => {
  const containerRef = useRef();
  const textRef = useRef();
  const numberRef = useRef();
  const blobRef1 = useRef();
  const blobRef2 = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background blobs floating animation
      gsap.to(blobRef1.current, {
        x: "random(-50, 50)",
        y: "random(-50, 50)",
        rotation: "random(-20, 20)",
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.to(blobRef2.current, {
        x: "random(-50, 50)",
        y: "random(-50, 50)",
        rotation: "random(-20, 20)",
        scale: "random(0.9, 1.1)",
        duration: 5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 1,
      });

      // Entrance animation
      gsap.from(numberRef.current.children, {
        y: 150,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.1,
      });

      gsap.from(textRef.current.children, {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.4
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className='bg-light-yellow min-h-screen flex items-center justify-center relative overflow-hidden'>
      {/* Background Blobs (Abstract elements) */}
      <div 
        ref={blobRef1} 
        className="absolute w-[40vw] h-[40vw] rounded-full bg-white opacity-60 blur-[80px] -top-20 -left-20 pointer-events-none mix-blend-overlay"
      ></div>
      <div 
        ref={blobRef2} 
        className="absolute w-[50vw] h-[50vw] rounded-full bg-yellow-200 opacity-40 blur-[100px] -bottom-40 -right-20 pointer-events-none mix-blend-multiply"
      ></div>

      <div className='container text-center py-[12%] mx-auto px-4 relative z-10'>
        <div className='flex flex-col items-center max-w-4xl mx-auto'>
          
          <div ref={numberRef} className='flex overflow-hidden pb-4 mb-2'>
            <span className='text-[10rem] sm:text-[14rem] md:text-[18rem] lg:text-[22rem] font-bold text-heading leading-none tracking-tighter drop-shadow-sm select-none'>
              4
            </span>
            <span className='text-[10rem] sm:text-[14rem] md:text-[18rem] lg:text-[22rem] font-bold text-heading leading-none tracking-tighter drop-shadow-sm select-none'>
              0
            </span>
            <span className='text-[10rem] sm:text-[14rem] md:text-[18rem] lg:text-[22rem] font-bold text-heading leading-none tracking-tighter drop-shadow-sm select-none'>
              4
            </span>
          </div>

          <div ref={textRef} className='flex flex-col items-center'>
            <span className='text-xl sm:text-2xl lg:text-3xl font-semibold mb-6 block text-heading tracking-widest uppercase'>
              Oops! Page Not Found
            </span>

            <p className='text-lg sm:text-xl text-muted mb-10 max-w-md mx-auto'>
              The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>

            <div className="hover:scale-105 transition-transform duration-300">
              <MainBtn
                path="/"
                text="Back to Home"
                className="bg-black! text-white! rounded-full shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page404