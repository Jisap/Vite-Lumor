import PageBanner from '../components/ui/PageBanner'
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect, useRef } from "react"
import { PhoneCall, ArrowRight } from 'lucide-react';
import MainBtn from '../components/ui/Buttons/MainBtn';
import services from '../assets/Data/Services.json'
import ServiceCard from '../components/ui/Cards/ServiceCard';


const aboutImg1 = "/images/AboutPage/about-image-01.jpg"
const aboutImg2 = "/images/AboutPage/about-image-02.jpg"

gsap.registerPlugin(ScrollTrigger);

const Services = () => {

  const aboutRef = useRef();
  const serviceRef = useRef();
  const ctaRef = useRef();

  // --- Sección About / Intro ---
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

  // --- Sección Service Grid ---
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".content-animate > *", {
        y: 30,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".content-animate",
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });

      gsap.from(".service-grid > *", {
        y: 50,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".service-grid",
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });
    }, serviceRef);

    return () => ctx.revert();
  }, []);

  // --- Sección CTA ---
  useEffect(() => {
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(ctaRef);

      // Texto del CTA desde la izquierda
      gsap.from(q(".cta-heading"), {
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // Botón desde la derecha
      gsap.from(q(".cta-btn"), {
        x: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // Línea decorativa que se expande
      gsap.from(q(".cta-line"), {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.2,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, ctaRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <PageBanner title="Our Services" currentPage="Our Services" />

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

          <div className='centered-row gap-8'>
            <MainBtn
              path="/contact"
              text="Contact Us"
              className="bg-black! text-white!"
            />

            <div className='centered-row gap-2 text-lg font-medium phone-call'>
              <span className='bg-white p-3 rounded-sm shadow-2xl'>
                <PhoneCall size={20} />
              </span>

              +91 123 456 789
            </div>
          </div>
        </div>
      </div>

      <div ref={serviceRef} className='container py-[8%] mx-auto px-4 gap-10 lg:gap-14'>
        <div className='text-center w-full mb-10 content-animate'>
          <span className='title-span'>Premium services</span>

          <h2 className='heading-1 mb-5'>
            <span className='text-coffee'>Our services make your </span> <br />
            life comfortable
          </h2>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10 service-grid'>
          {services.map((service, index) => (
            <ServiceCard key={service.id || index} {...service} />
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div ref={ctaRef} className='bg-primary text-white overflow-hidden'>
        <div className='container py-[5%] mx-auto px-4'>
          {/* Línea decorativa superior */}
          <div className='cta-line h-px bg-white/20 mb-10 w-full' />

          <div className='flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16'>
            <h2 className='cta-heading text-2xl sm:text-3xl lg:text-4xl max-w-2xl font-medium leading-snug'>
              Schedule an appointment to meet or{' '}
              <span className='text-coffee'>email us</span> your questions
            </h2>

            <div className='cta-btn flex-shrink-0'>
              <MainBtn
                path="/contact"
                text="Contact Us"
                className="bg-white! text-primary! hover:bg-coffee! hover:text-white! min-w-[160px]"
              />
            </div>
          </div>

          {/* Línea decorativa inferior */}
          <div className='cta-line h-px bg-white/20 mt-10 w-full' />
        </div>
      </div>
    </>
  )
}

export default Services