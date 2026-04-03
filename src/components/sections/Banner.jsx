import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import bannerbg from "/images/Index/Banner/banner-bg.jpg";

gsap.registerPlugin(ScrollTrigger);

const Banner = () => {
  const playRef = useRef(null);
  const bannerRef = useRef(null);

  // mouse Parallax effect
  const handleMouseMove = (e) => {
    if (!playRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(playRef.current, {
      x: x / 10,
      y: y / 10,
      duration: 0.6,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    if (!playRef.current) return;
    gsap.to(playRef.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animación de entrada para el botón Play
      gsap.from(playRef.current, {
        scale: 0,
        opacity: 0,
        duration: 1.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: bannerRef.current,
          start: "top 80%",
        }
      });

      // Efecto Parallax Real
      gsap.fromTo(bannerRef.current,
        {
          scale: 0.9,
          backgroundPosition: "50% 30%"
        },
        {
          scale: 1,
          backgroundPosition: "50% 70%",
          ease: "none",
          scrollTrigger: {
            trigger: bannerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      );
    }, bannerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="container py-24 mx-auto px-4 overflow-hidden">
      <div
        ref={bannerRef}
        className="banner relative rounded-[40px] overflow-hidden bg-no-repeat bg-cover bg-center"
        style={{
          backgroundImage: `url(${bannerbg})`,
          backgroundSize: "cover",
          height: "600px"
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="overlay absolute inset-0 bg-black/40"></div>

        {/* Play Button - Centered using absolute positioning and flexbox as a fallback */}
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
          <div
            ref={playRef}
            className="play-btn w-24 h-24 sm:w-32 sm:h-32 border-2 border-white/50 rounded-full flex justify-center items-center cursor-pointer pointer-events-auto hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-md group"
            style={{
               boxShadow: "0 0 30px rgba(0,0,0,0.3)"
            }}
          >
            {/* Play Icon */}
            <div className="relative z-10 w-full h-full flex items-center justify-center">
              <svg 
                className="w-8 h-8 sm:w-12 sm:h-12 fill-white group-hover:fill-black transition-colors duration-300 translate-x-1" 
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            
            {/* Ripples / Animation background could go here if needed, 
                but keeping it simple and centered first */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;