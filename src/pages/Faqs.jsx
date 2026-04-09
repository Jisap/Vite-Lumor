import React, { useState, useRef } from 'react'
import PageBanner from '../components/ui/PageBanner'
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import FAQItem from '../components/ui/FAQItem'
import faqData from '../assets/Data/FaqData.json'


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
          <div className="mb-8">
            <span className="title-span">Respuestas Rápidas</span>
            <h2 className="heading-1">
              Preguntas <span className="text-coffee">Frecuentes</span>
            </h2>
          </div>
          
          <div className="flex flex-col gap-2">
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
    </>
  )
}

export default Faqs