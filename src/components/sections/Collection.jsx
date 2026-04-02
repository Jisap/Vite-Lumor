import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Play } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import collectionImage1 from "/images/Index/Collection/collection-image-01.jpg"
import collectionImage2 from "/images/Index/Collection/collection-image-02.jpg"
import { Link } from "react-router-dom"


gsap.registerPlugin(ScrollTrigger);


const Collection = () => {

  const collectionRef = useRef();

  useEffect(() => {
    if (!collectionRef.current) return;

    const ctx = gsap.context(() => {
      // Main image - More dramatic entrance with scale
      gsap.from(".main-image-wrapper", {
        y: 150,
        scale: 0.95,
        opacity: 0,
        duration: 1.8,
        ease: "expo.out",
        scrollTrigger: {
          trigger: collectionRef.current,
          start: 'top 75%',
          toggleActions: "play none none reverse"
        },
      });

      // Staggered text - Lateral movement for more impact
      gsap.from(".text-reveal", {
        x: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out",
        scrollTrigger: {
          trigger: collectionRef.current,
          start: 'top 70%',
          toggleActions: "play none none reverse"
        },
      });

      // Video card - Snappy "back" entrance
      gsap.from(".video-card", {
        y: 100,
        scale: 0.9,
        opacity: 0,
        duration: 1.5,
        delay: 0.2, // Reduced delay for better flow
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: collectionRef.current,
          start: 'top 65%',
          toggleActions: "play none none reverse"
        },
      });
    }, collectionRef);

    return () => ctx.revert();
  }, [])

  return (
    <>
      <div ref={collectionRef} className="collection container py-24 lg:py-32 mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24 relative">

          {/* Main Image Side - Asymmetric Column */}
          <div className="main-image-wrapper w-full lg:w-7/12 relative group">
            <div className="aspect-4/5 overflow-hidden rounded-2xl shadow-2xl relative z-10 transition-transform duration-700 group-hover:scale-[1.02]">
              <img
                src={collectionImage1}
                alt="Main Collection"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
            </div>

            {/* Decorative Background Element */}
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-coffee/10 rounded-full blur-3xl z-0" />
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-coffee/5 rounded-full blur-3xl z-0" />
          </div>

          {/* Content Side */}
          <div className="w-full lg:w-5/12 z-20">
            <div className="text-reveal">
              <span className="title-span mb-6 tracking-[0.3em] text-coffee font-bold">
                ESTABLISHED 2004
              </span>
            </div>

            <div className="text-reveal">
              <h2 className="text-4xl lg:text-6xl font-semibold leading-tight mb-8 text-heading tracking-tight">
                Crafting <span className="font-light text-coffee/80 block lg:inline">Elegance</span> <br className="hidden lg:block" />
                in every detail
              </h2>
            </div>

            <div className="text-reveal">
              <p className="pera-text text-lg leading-relaxed mb-12 opacity-80 max-w-lg">
                We bridge the gap between architectural vision and artisanal craftsmanship.
                Our sofas are more than furniture; they are the centerpiece of your story,
                designed to evolve with your lifestyle.
              </p>
            </div>

            {/* Video Card - Separate and clean */}
            <div className="video-card relative mt-16 max-w-md ml-auto group">
              <div className="relative rounded-2xl overflow-hidden shadow-xl bg-white p-2 border border-coffee/10">
                <div className="relative aspect-video rounded-xl overflow-hidden active:scale-95 transition-transform duration-300">
                  <img
                    src={collectionImage2}
                    alt="Video Preview"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex justify-center items-center bg-black/20 group-hover:bg-black/10 transition-colors duration-300">
                    <Link
                      to="https://www.youtube.com"
                      className="play-btn bg-white/95 backdrop-blur-sm w-16 h-16 flex justify-center items-center rounded-full cursor-pointer shadow-2xl transition-all duration-300 hover:scale-110 hover:bg-white"
                    >
                      <Play size={24} fill="#ae9775" className="text-coffee ml-1 transition-colors group-hover:text-black" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Captions for Video */}
              <div className="mt-4 px-2">
                <p className="text-sm font-semibold tracking-widest text-coffee uppercase">Watch our process</p>
                <p className="text-xs text-paragraph mt-1 italic">Artisan Workshop, 2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Collection