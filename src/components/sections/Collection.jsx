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
      gsap.from(".collection-image:first-child", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: collectionRef.current,
          start: 'top 85%',
          toggleActions: "play none none reverse"
        },
      });

      gsap.from(".collection-content", {
        x: 50,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: collectionRef.current,
          start: 'top 85%',
          toggleActions: "play none none reverse"
        },
      });

      gsap.from(".play-btn", {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: collectionRef.current,
          start: 'top 85%',
          toggleActions: "play none none reverse"
        },
      });


    }, collectionRef);

    return () => ctx.revert();
  }, [])

  return (
    <>
      <div ref={collectionRef} className="collection container py-[8%] mx-auto px-4 section-container gap-10 lg:gap-14">
        <div className="collection-image w-full lg:w-1/2 overflow-hidden group rounded-sm max-w-full lg:max-w-150 relative mx-auto">
          <img
            src={collectionImage1}
            alt="collection-image"
            className="section-image group-hover:scale-110 transition-all duration-300"
          />
        </div>

        <div className="collection-content w-full lg:w-1/2">
          <span className="title-span">
            Our Collection
          </span>

          <h2 className="heading-1 mb-5">
            Our sofas
            <span className="text-coffee"> design-focused </span>
            create style
          </h2>

          <p className="pera-text mb-20 sm:mb-40 lg:mb-60">
            We are a company dedicated to the design and manufacture of high-quality furniture, with more than 20 years of experience in the market. Our products are made with the best materials and are designed to satisfy the needs of our customers.
          </p>

          <div className="collection-image mx-0! relative flex justify-center items-center rounded-sm">
            <img
              src={collectionImage2}
              alt="collection-image"
            />

            <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center pointer-events-none">
              <Link to="https://www.youtube.com" className="play-btn bg-white w-14 h-14 flex justify-center items-center rounded-full cursor-pointer shadow-xl pointer-events-auto transition-transform hover:scale-110">
                <Play size={20} fill="currentColor" className="text-coffee ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Collection