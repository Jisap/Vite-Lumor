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
const faqImage1 = "/images/Faqs/faq-image-01.jpg"
const faqImage2 = "/images/Faqs/faq-image-02.jpg"
const feature1 = "/images/Services/feature-01.png"
const feature2 = "/images/Services/feature-02.png"
const feature3 = "/images/Services/feature-03.png"


gsap.registerPlugin(ScrollTrigger);

const Services = () => {

  const aboutRef = useRef();
  const serviceRef = useRef();
  const ctaRef = useRef();
  const storeRef = useRef();
  const featureRef = useRef();

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

      <div ref={ctaRef} className='bg-primary text-white overflow-hidden'>
        <div className='container py-[5%] mx-auto px-4'>
          {/* Línea decorativa superior */}
          <div className='cta-line h-px bg-white/20 mb-10 w-full' />

          <div className='flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-16'>
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

      <div ref={storeRef} className='container py-[8%] mx-auto px-4 section-container items-center! gap-10 lg:gap-14'>
        <div className='faq-image w-full lg:w-1/2 centered-row sm:flex-row flex-col gap-5 h-auto sm:h-90 xl:h-120'>
          <img src={faqImage1} alt="faq-image-01" className='section-image rounded-sm' />
          <img src={faqImage2} alt="faq-image-02" className='section-image rounded-sm' />
        </div>

        <div className='content w-full lg:w-1/2'>
          <span className="title-span">Modern Solutions</span>

          <h2 className="heading-1 mb-5">
            Timeless, quality interior
            <br />
            designs
          </h2>

          <p className="pera-text">
            We create spaces that are not only beautiful but also functional and comfortable. Our team of experienced designers works closely with clients to understand their needs and preferences, and we create spaces that are tailored to their specific requirements.
          </p>

          <MainBtn
            path="/shop"
            text="Visit Our Online Store"
            className="bg-black! text-white! w-60!"
          />
        </div>
      </div>

      <div ref={featureRef} className='container py-[8%] mx-auto px-4'>
        <div className='feature-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 text-center'>
          <div className='group'>
            <img
              src={feature1}
              alt="feature-icon"
              className='mx-auto mb-8'
            />

            <h3 className='text-xl lg:text-2xl font-semibold mb-3'>Worldwide shipping</h3>

            <p className='text-gray-600 mb-6 max-w-xs mx-auto text-sm'>
              We offer free shipping on all orders over $100.
            </p>
          </div>

          <div className='group'>
            <img
              src={feature2}
              alt="feature-icon"
              className='mx-auto mb-8'
            />

            <h3 className='text-xl lg:text-2xl font-semibold mb-3'>Buyer protection</h3>

            <p className='text-gray-600 mb-6 max-w-xs mx-auto text-sm'>
              Transactions verified by Stripe
            </p>
          </div>

          <div className='group'>
            <img
              src={feature2}
              alt="feature-icon"
              className='mx-auto mb-8'
            />

            <h3 className='text-xl lg:text-2xl font-semibold mb-3'>Customer support</h3>

            <p className='text-gray-600 mb-6 max-w-xs mx-auto text-sm'>
              24/7 Customer Support
            </p>
          </div>


        </div>
      </div>
    </>
  )
}

export default Services