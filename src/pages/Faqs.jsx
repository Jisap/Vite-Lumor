import React, { useState, useRef, useEffect } from 'react'
import PageBanner from '../components/ui/PageBanner'
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import FAQItem from '../components/ui/FAQItem'
import faqData from '../assets/Data/FaqData.json'
import MainBtn from '../components/ui/Buttons/MainBtn'
import work from "../assets/Data/Work.json"
import WorkCard from '../components/ui/Cards/WorkCard'


gsap.registerPlugin(ScrollTrigger);

const faqImage1 = "/images/Faqs/faq-image-01.jpg"
const faqImage2 = "/images/Faqs/faq-image-02.jpg"

const Faqs = () => {

  const faqRef = useRef();
  const workRef = useRef();
  const headingRef = useRef();
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  }

  // --- Animaciones GSAP ---
  useEffect(() => {
    if (!faqRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Imágenes de la izquierda 
      gsap.from(".faq-image img", {
        x: -50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2, // escalonado
        ease: "power3.out",
        scrollTrigger: {
          trigger: faqRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // 2. Títulos
      gsap.from(".faq-heading > *", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".faq-heading",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // 3. Contenedor de items de las FAQs
      gsap.from(".faq-container > div", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".faq-container",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

    }, faqRef);

    return () => ctx.revert();
  }, []);

  // --- Animación bloque inferior (headingRef) ---
  useEffect(() => {
    if (!headingRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".content-animate > *", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, headingRef);

    return () => ctx.revert();
  }, []);

  // --- Animación bloque inferior (workRef) ---
  useEffect(() => {
    if (!workRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Títulos
      gsap.from(".content > *", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".content",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // 2. Tarjetas de trabajo
      gsap.from(".work-grid > *", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".work-grid",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }, workRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <PageBanner
        title="Faq's"
        currentPage="Faq's"
      />

      <div ref={faqRef} className='container py-[8%] mx-auto px-4 section-container items-center! gap-10 lg:gap-14'>
        <div className='faq-image w-full lg:w-1/2 flex sm:flex-row flex-col gap-4 items-end'>
          <img
            src={faqImage1}
            alt="faq-image-01"
            className='section-image rounded-sm w-full sm:w-1/2 sm:h-80 lg:h-96 object-cover'
          />
          <img
            src={faqImage2}
            alt="faq-image-02"
            className='section-image rounded-sm w-full sm:w-1/2 sm:h-64 lg:h-80 object-cover'
          />
        </div>

        <div className='faq-content w-full lg:w-1/2'>
          <div className="mb-8 faq-heading">
            <span className="title-span">Respuestas Rápidas</span>
            <h2 className="heading-1">
              Preguntas <span className="text-coffee">Frecuentes</span>
            </h2>
          </div>

          <div className="flex flex-col gap-2 faq-container">
            {faqData.map((faq, index) => (
              <FAQItem
                key={faq.id}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onClick={() => toggleFAQ(index)}
              />
            ))}
          </div>
        </div>
      </div>

      <div ref={headingRef} className='bg-light-yellow py-[8%]'>
        <div className='container mx-auto px-4 section-container'>
          <div className='text-center w-full content-animate'>
            <span className='title-span'>Design studio</span>

            <h2 className='heading-1 mb-5'>
              <span className='text-coffee'>Our services make your home </span> <br />
              comfortable And cozy
            </h2>

            <MainBtn
              text="Read More"
              className="bg-black! text-white!"
            />
          </div>
        </div>
      </div>

      <div ref={workRef} className='works container mx-auto px-4 py-[8%]'>
        <div className='w-full mb-10 content'>
          <span className='title-span'>Our Work</span>
          <h2 className='heading-1 mb-5'>
            Every idea is
            <span className='text-coffee'>Possible</span>
          </h2>
        </div>

        <div className='grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 gap-10 work-grid'>
          {work.map((item) => (
            <WorkCard
              key={item.id}
              id={item.id}
              image={item.image}
              title={item.title}
              number={item.number}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default Faqs