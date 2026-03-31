import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);



const Shop = () => {

  const shopRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = shopRef.current.querySelectorAll(".product-card");

      gsap.from(cards, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: shopRef.current,
          start: "top 85%",
          toggleActions: "play none none reset",
        },
      });
    }, shopRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 90%",
          toggleActions: "play none none reset",
        },
      });
    }, headingRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div className="bg-light-yellow">
        <div className="container py-[8%] mx-auto px-4">
          <div ref={headingRef} className="text-center w-full mb-16">
            <span className="title-span">
              Our Shop
            </span>

            <h2 className="heading-1 mb-5">
              Trending
              <span className="text-coffe"> items</span>
            </h2>
          </div>

          <div ref={shopRef} className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-10">

          </div>
        </div>
      </div>
    </>
  )
}

export default Shop