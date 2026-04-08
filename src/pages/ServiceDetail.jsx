import PageBanner from '../components/ui/PageBanner'
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect, useRef } from "react"
import { useParams } from 'react-router-dom'
import services from "../assets/Data/Services.json"
import { Mail, MapPin, Phone, CheckCircle2 } from 'lucide-react'
import MainBtn from "../components/ui/Buttons/MainBtn"

const galleryImage1 = "/images/Services/service-image-01.jpg"
const galleryImage2 = "/images/Services/service-image-02.jpg"
const galleryImage3 = "/images/Services/service-image-03.jpg"

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

const ServiceDetail = () => {
  const { id } = useParams();
  const serviceDetailRef = useRef();
  const contentRef = useRef();
  const sidebarRef = useRef();

  const service = services.find((service) => service.id === Number(id));

  // --- Animación: imagen principal + título + párrafos del contenido ---
  useEffect(() => {
    if (!service) return;

    const ctx = gsap.context(() => {
      // Banner de presentación
      gsap.from(".animate-banner", {
        opacity: 0,
        scale: 1.05,
        duration: 1.5,
        ease: "power3.out",
      });

      // Imagen principal (slide desde abajo con scale)
      gsap.from(".main-image", {
        y: 60,
        opacity: 0,
        scale: 1.03,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".main-image",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // Título principal
      gsap.from(".main-title", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".main-title",
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      });

      // Párrafos y bloques de texto con stagger
      gsap.from(".pera", {
        y: 30,
        opacity: 0,
        duration: 0.9,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Imágenes de galería (cortina hacia arriba)
      gsap.from(".gallery-img", {
        clipPath: "inset(100% 0% 0% 0%)",
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: ".gallery",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // Imagen inferior (zoom-out al aparecer)
      gsap.from(".bottom-image", {
        scale: 1.06,
        opacity: 0,
        duration: 1.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".bottom-image",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, contentRef);

    return () => ctx.revert();
  }, [service]);

  // --- Animación: sidebar (formulario + contacto + CTA) ---
  useEffect(() => {
    if (!service) return;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(sidebarRef);

      // Sidebar entra desde la derecha
      gsap.from(sidebarRef.current, {
        x: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sidebarRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // Campos del formulario con stagger
      gsap.from(q(".input-wrapper, .submit-btn"), {
        x: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: q(".contact-form")[0],
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // Items de contacto
      gsap.from(q(".contact-item"), {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: q(".contact-item")[0],
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });

      // CTA card (necesita diseño especial)
      gsap.from(q(".cta-card"), {
        y: 40,
        opacity: 0,
        scale: 0.97,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: q(".cta-card"),
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });
    }, sidebarRef);

    return () => ctx.revert();
  }, [service]);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Service not found</h2>
          <MainBtn path="/services" text="Back to Services" />
        </div>
      </div>
    );
  }

  return (
    <>
      <div>
        <PageBanner
          title="Service Details"
          currentPage="Service Detail"
          productName={service.title}
        />

        <div ref={serviceDetailRef} className='container mx-auto px-4 py-[8%]'>
          <div className='section-container gap-10 lg:gap-14 items-start!'>
            {/* Contenido principal */}
            <div ref={contentRef} className='w-full lg:w-[70%] content'>
              <img
                src={service.image}
                alt={service.title}
                className='main-image w-full h-full object-cover rounded'
              />

              <h3 className='main-title text-3xl lg:text-4xl font-semibold pt-8 pb-5'>
                {service.title}
              </h3>

              <p className='text-paragraph pb-8 pera'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro, nobis ex odio iste maiores corporis quam autem sint commodi. Sunt unde temporibus similique rerum eos magni dolorum doloribus eaque omnis.
              </p>

              <div className='gallery centered-row justify-between flex-col lg:flex-row gap-3 w-full h-auto lg:h-90'>
                <div className='image group overflow-hidden rounded-sm h-full w-full gallery-img'>
                  <img src={galleryImage1} alt="galleryImage" className='section-image group-hover:scale-110 transition-all duration-300' />
                </div>

                <div className='image group overflow-hidden rounded-sm h-full w-full gallery-img'>
                  <img src={galleryImage2} alt="galleryImage" className='section-image group-hover:scale-110 transition-all duration-300' />
                </div>
              </div>

              <div className='text-paragraph pera py-8'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum iusto exercitationem accusamus nesciunt, sapiente reiciendis praesentium corporis totam in temporibus? Culpa, rerum. Neque beatae eveniet pariatur quam laudantium voluptas doloremque!
              </div>

              <div className='text-paragraph pera pb-8'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum iusto exercitationem accusamus nesciunt, sapiente reiciendis praesentium corporis totam in temporibus? Culpa, rerum. Neque beatae eveniet pariatur quam laudantium voluptas doloremque!
              </div>

              <div className='h-auto lg:h-150'>
                <img src={galleryImage3} alt="galleryImage" className='section-image bottom-image' />
              </div>

              <p className='text-paragraph pera py-8'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum iusto exercitationem accusamus nesciunt, sapiente reiciendis praesentium corporis totam in temporibus? Culpa, rerum. Neque beatae eveniet pariatur quam laudantium voluptas doloremque!
              </p>
            </div>

            {/* Sidebar */}
            <div ref={sidebarRef} className='w-full lg:w-[30%] bg-white shadow p-5 lg:p-8 rounded-sm lg:sticky h-full top-0 right-0'>
              <h4 className='form-title'>Get In Touch</h4>

              <form className='space-y-8 mt-10 contact-form'>
                <div className='input-wrapper pb-2 relative'>
                  <input type="text" placeholder='Your Name' className='input-box w-full outline-none' />
                </div>

                <div className='input-wrapper pb-2 relative'>
                  <input type="email" placeholder='Email Address' className='input-box w-full outline-none' />
                </div>

                <div className='input-wrapper pb-2 relative'>
                  <input type="text" placeholder='Message' className='input-box w-full outline-none' />
                </div>

                <MainBtn
                  type="submit"
                  text="Get In Touch"
                  className='submit-btn bg-black! text-white! shadow-none! rounded-sm! mt-6'
                />
              </form>

              <div className='contact-form'>
                <h3 className='text-2xl font-medium pt-8 pb-8 form-title'>Contact Info</h3>

                <ul className='space-y-6 max-w-md'>
                  <li className='flex items-center gap-4 group contact-item'>
                    <div className='p-3 rounded-full bg-linear-to-r from-purple-500 to-pink-500 text-white transition-transform duration-300 group-hover:scale-110'>
                      <MapPin size={20} />
                    </div>

                    <p className='text-gray-700 leading-relaxed'>
                      <span className='font-semibold block'>
                        123 Design St, New York, USA
                      </span>
                    </p>
                  </li>

                  <li className='flex items-center gap-4 group contact-item'>
                    <div className='p-3 rounded-full bg-linear-to-r from-blue-500 to-blue-500 text-white transition-transform duration-300 group-hover:scale-110'>
                      <Mail size={20} />
                    </div>

                    <p className='text-gray-700 leading-relaxed'>
                      <span className='font-semibold block'>
                        info@example.com
                      </span>
                    </p>
                  </li>

                  <li className='flex items-center gap-4 group contact-item'>
                    <div className='p-3 rounded-full bg-linear-to-r from-orange-500 to-orange-500 text-white transition-transform duration-300 group-hover:scale-110'>
                      <Phone size={20} />
                    </div>

                    <p className='text-gray-700 leading-relaxed'>
                      <span className='font-semibold block'>
                        +91 234 567 890
                      </span>
                    </p>
                  </li>
                </ul>
              </div>

              <div className="cta-card bg-primary text-white p-8 rounded-sm text-center mt-20">
                <h4 className="text-2xl font-semibold mb-4">Need Custom Design?</h4>
                <p className="text-gray-400 mb-8">
                  Let's discuss your next project and bring your vision to life with our expert team.
                </p>
                <MainBtn
                  path="/contact"
                  text="Get a Quote"
                  className="bg-white! text-primary! hover:bg-coffee! hover:text-white! w-full shadow-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ServiceDetail