
import PageBanner from '../components/ui/PageBanner'
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Info, Mail, MapPin, Pencil, Phone, User } from 'lucide-react';
import { useEffect, useRef, useState } from "react"
import MainBtn from '../components/ui/Buttons/MainBtn';
import toast from 'react-hot-toast';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const contactRef = useRef();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });

  useEffect(() => {
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(contactRef);

      // Animación para el bloque izquierdo (Texto e Info)
      gsap.from(q(".contact-item"), {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contactRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      // Animación para el formulario (Entrada desde la derecha)
      gsap.from(q(".contact-form-group"), {
        x: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-right",
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });
    }, contactRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Thank you! We'll get back to you soon.");
    e.target.reset();
  };

  return (
    <>
      <PageBanner title="Contact Us" currentPage="Contact Us" />

      <div className='container mx-auto px-4 py-[8%] section-container gap-10 lg:gap-14' ref={contactRef}>
        <div className='lg:w-1/2 contact-left'>
          <span className='title-span contact-item'>
            Contact Us
          </span>

          <h2 className='heading-1 mb-5 contact-item'>
            <span className='text-coffee'>Have question?</span> <br />
            Get in touch!
          </h2>

          <p className='pera-text contact-item'>
            We’re always happy to help with any questions you may have. Whether you’re looking for product information, design advice, or assistance with an order, our team is here to support you.
          </p>

          <ul className='space-y-5'>
            <li className='flex items-center gap-4 group contact-item'>
              <div className='w-10 h-10 flex items-center justify-center rounded-full bg-linear-to-r from-yellow-400 to-yellow-200 transition duration-300 group-hover:scale-110 group-hover:rotate-6'>
                <MapPin className='text-white w-5 h-5' />
              </div>
              <p className='text-gray-700'>
                123 New Market Street, <br />
                New York, NY 10001
              </p>
            </li>

            <li className='flex items-center gap-4 group contact-item'>
              <div className='w-10 h-10 flex items-center justify-center rounded-full bg-linear-to-r from-green-400 to-green-200 transition duration-300 group-hover:scale-110 group-hover:rotate-6'>
                <Phone className='text-white w-5 h-5' />
              </div>
              <p className='text-gray-700'>
                +123 456 7890
              </p>
            </li>

            <li className='flex items-center gap-4 group contact-item'>
              <div className='w-10 h-10 flex items-center justify-center rounded-full bg-linear-to-r from-blue-400 to-blue-200 transition duration-300 group-hover:scale-110 group-hover:rotate-6'>
                <Mail className='text-white w-5 h-5' />
              </div>
              <p className='text-gray-700'>
                example@emai.com
              </p>
            </li>
          </ul>
        </div>

        <div className='w-full lg:w-1/2 contact-right'>
          <form onSubmit={handleSubmit} className='w-full space-y-10 contact-form'>
            <div className='grid md:grid-cols-2 gap-10'>
              <div className='flex items-center border-b border-gray-400 focus-within:border-coffee transition-colors duration-300 pb-3 gap-3 contact-form-group'>
                <User className='w-5 h-5 text-gray-700' />
                <input
                  type="text"
                  placeholder="Name"
                  className='bg-transparent w-full outline-none placeholder:text-gray-400'
                  required
                />
              </div>

              <div className='flex items-center border-b border-gray-400 focus-within:border-coffee transition-colors duration-300 pb-3 gap-3 contact-form-group'>
                <Mail className='w-5 h-5 text-gray-700' />
                <input
                  type="email"
                  placeholder="Email Address"
                  className='bg-transparent w-full outline-none placeholder:text-gray-400'
                  required
                />
              </div>
            </div>

            <div className='grid md:grid-cols-2 gap-10'>
              <div className='flex items-center border-b border-gray-400 focus-within:border-coffee transition-colors duration-300 pb-3 gap-3 contact-form-group'>
                <Phone className='w-5 h-5 text-gray-700' />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className='bg-transparent w-full outline-none placeholder:text-gray-400'
                  required
                />
              </div>

              <div className='flex items-center border-b border-gray-400 focus-within:border-coffee transition-colors duration-300 pb-3 gap-3 contact-form-group'>
                <Info className='w-5 h-5 text-gray-700' />
                <input
                  type="text"
                  placeholder="Subject"
                  className='bg-transparent w-full outline-none placeholder:text-gray-400'
                  required
                />
              </div>
            </div>

            <div className='flex items-start border-b border-gray-400 focus-within:border-coffee transition-colors duration-300 pb-3 gap-3 contact-form-group'>
              <Pencil className='w-5 h-5 text-gray-700' />
              <textarea
                rows="3"
                placeholder="How can we help you? Feel to get in touch!"
                className='bg-transparent w-full outline-none resize-none placeholder:text-gray-400'
                required
              />
            </div>

            <div className='flex flex-col sm:flex-row items-center gap-6 contact-form-group'>
              <MainBtn
                type="submit"
                text="Get in Touch"
                className="bg-black! text-white!"
              />
              <label className='flex items-center gap-2 text-sm text-gray-700'>
                <input type="checkbox" className='w-4 h-4' />
                I agree to the <span className='underline cursor-pointer hover:text-coffee transition-colors duration-300'>Privacy Policy</span>
              </label>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Contact