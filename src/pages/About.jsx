import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect, useRef, useState } from "react"
import PageBanner from "../components/ui/PageBanner"
import MainBtn from "../components/ui/Buttons/MainBtn"


import gallery from "../assets/Data/GalleryData.json"
import CountUp from "react-countup"
import Team from "../components/sections/Teams"
import GallerySlide from "../components/ui/GallerySlide"

const aboutImg1 = "/images/AboutPage/about-image-01.jpg";
const aboutImg2 = "/images/AboutPage/about-image-02.jpg";

gsap.registerPlugin(ScrollTrigger)


const About = () => {

  const aboutRef = useRef();
  const galleryRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".animate-banner", {
        opacity: 0,
        scale: 1.05,
        duration: 1.5,
        ease: "power3.out"
      });

      gsap.from(".animate-images", {
        x: -50,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".animate-images",
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });

      gsap.from(".animate-content > *", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".animate-content",
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });
    }, aboutRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(galleryRef);

      // Animación del encabezado (Título y Subtítulo)
      gsap.from(q(".title-span, .heading-1"), {
        opacity: 0,
        y: 50,
        duration: 1.2,
        stagger: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: galleryRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      // Animación de los slides individuales
      gsap.from(q(".swiper-slide"), {
        opacity: 0,
        y: 60,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: q(".gallery-slider"),
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      });
    }, galleryRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <PageBanner
        title="About Us"
        currentPage="About Us"
      />

      <div ref={aboutRef} className="container mx-auto py-[8%] px-4 gap-14 section-container items-center!">
        <div className="animate-images rounded-sm w-full lg:w-1/2 relative">
          <img src={aboutImg1} alt="about-image-01" className="rounded-sm w-full lg:w-auto" />
          <img src={aboutImg2} alt="about-image-02" className="absolute hidden md:block right-4 -bottom-10 md:-bottom-12 lg:-bottom-16 xl:-bottom-20 w-40 md:w-52 lg:w-64 xl:w-90 rounded-sm shadow-lg" />
        </div>

        <div className="animate-content about-content w-full lg:w-1/2">
          <span className="title-span">Premium quality</span>

          <h2 className="heading-1 mb-5">
            You Confort is our
            <br />
            only priority
          </h2>

          <p className="pera-text">
            We are a team of passionate designers who love what we do. We believe that everyone deserves to have a beautiful home, and we work hard to make that a reality for our clients.
          </p>

          <ul className="space-y-2 mb-10 text-muted">
            <li>
              <span>
                Mon-Fri: 9 AM - 10 PM
              </span>
            </li>

            <li>
              <span>
                Sat-Sun: 10 AM - 6 PM
              </span>
            </li>
          </ul>

          <MainBtn
            path="/shop"
            text="Shop Now"
            className="bg-black! text-white!"
          />
        </div>
      </div>

      <div ref={galleryRef} className="image-gallery gallery-section py-[4%] bg-light-yellow">
        <div className="container mx-auto py-[4%] px-4">
          <span className="title-span">Our Gallery</span>

          <h2 className="heading-1">
            Work Examples
          </h2>
        </div>

        <div className="container mx-auto px-4 pb-[4%] relative gallery-slider">
          <GallerySlide galleryData={gallery} />
        </div>
      </div>
    </>
  )
}

export default About