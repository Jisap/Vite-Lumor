import { useEffect, useRef } from "react";
import MainBtn from "../ui/Buttons/MainBtn";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const aboutMainImg = "/images/Index/About/about-main-image.jpg";
  const aboutImg1 = "/images/Index/About/about-image01.jpg";
  const aboutImg2 = "/images/Index/About/about-image02.jpg";
  const aboutImg3 = "/images/Index/About/about-image03.jpg";

  const aboutRef = useRef(null);
  const mainImgRef = useRef(null);
  const contentRef = useRef(null);
  const img1Ref = useRef(null);
  const img2Ref = useRef(null);
  const img3Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main image slides in from left
      gsap.from(mainImgRef.current, {
        x: -80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: mainImgRef.current,
          start: "top 85%",
          toggleActions: "play none none reset",
        },
      });

      // Content slides in from right
      gsap.from(contentRef.current, {
        x: 80,
        opacity: 0,
        duration: 1,
        delay: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 85%",
          toggleActions: "play none none reset",
        },
      });

      // Three small images stagger up
      gsap.from([img1Ref.current, img2Ref.current, img3Ref.current], {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: img1Ref.current,
          start: "top 90%",
          toggleActions: "play none none reset",
        },
      });
    }, aboutRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={aboutRef}
      className="about container py-[8%] mx-auto gap-14 min-h-[60vh] flex flex-col lg:flex-row items-center"
    >
      {/* Main image column */}
      <div
        ref={mainImgRef}
        className="rounded-sm w-full lg:w-1/2 max-w-full lg:max-w-125 mx-auto relative overflow-hidden h-[400px] md:h-[500px] lg:h-[600px]"
      >
        <div className="about-bg-video absolute inset-0 -z-10 h-full w-full" />
        <img
          src={aboutMainImg}
          alt="About us – main"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content column */}
      <div ref={contentRef} className="w-full lg:w-1/2 px-4">
        <span className="title-span">About Us</span>

        <h2 className="heading-1 mb-5">
          Creative Solutions
          <br />
          by professional Designers
        </h2>

        {/* Three small images — cascade offset: mt-0 / mt-6 / mt-12 */}
        <div className="grid grid-cols-3 gap-4 xl:gap-6 mb-10 items-start">
          <div ref={img1Ref} className="mt-0 w-full">
            <div className="h-36 overflow-hidden rounded-sm hover:translate-y-[-6px] transition-transform duration-300">
              <img src={aboutImg1} alt="Interior design sample 1" className="section-image" />
            </div>
          </div>

          <div ref={img2Ref} className="mt-6 w-full">
            <div className="h-36 overflow-hidden rounded-sm hover:translate-y-[-6px] transition-transform duration-300">
              <img src={aboutImg2} alt="Interior design sample 2" className="section-image" />
            </div>
          </div>

          <div ref={img3Ref} className="mt-12 w-full">
            <div className="h-36 overflow-hidden rounded-sm hover:translate-y-[-6px] transition-transform duration-300">
              <img src={aboutImg3} alt="Interior design sample 3" className="section-image" />
            </div>
          </div>
        </div>

        <MainBtn
          text={"Read More"}
          path="/about"
          className="bg-black! text-white!"
        />
      </div>
    </section>
  );
};

export default About;