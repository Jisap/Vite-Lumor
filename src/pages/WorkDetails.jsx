import React, { useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import PageBanner from '../components/ui/PageBanner'
import workData from "../assets/Data/Work.json"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { MoveRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger);

const WorkDetails = () => {
  const { id } = useParams();
  const workItem = workData.find((w) => w.id === Number(id));
  const containerRef = useRef(null);

  useEffect(() => {
    // Scroll to top on component load or id change
    window.scrollTo(0, 0);

    if (!workItem || !containerRef.current) return;

    let ctx = gsap.context(() => {
      // Watermark Parallax Effect
      gsap.to(".watermark", {
        y: -150,
        ease: "none",
        scrollTrigger: {
          trigger: ".work-hero",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        }
      });

      // Image Reveal + Scale Down (Curtain Effect)
      const revealImages = gsap.utils.toArray('.reveal-image');
      revealImages.forEach(img => {
        gsap.fromTo(img, 
          { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)", filter: "blur(10px)" },
          { 
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            filter: "blur(0px)",
            duration: 1.5,
            ease: "power4.inOut",
            scrollTrigger: {
              trigger: img,
              start: "top 85%",
            }
          }
        );

        // Zoom-out the actual inner image seamlessly with the reveal
        const innerImg = img.querySelector('img');
        if(innerImg) {
          gsap.fromTo(innerImg,
            { scale: 1.3 },
            {
              scale: 1,
              duration: 1.5,
              ease: "power4.inOut",
              scrollTrigger: {
                trigger: img,
                start: "top 85%",
              }
            }
          );
        }
      });

      // Hero Text Fade Up Sequence
      gsap.from(".fade-up", {
        y: 50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".text-container",
          start: "top 80%",
        }
      });

      // Second Block Text Fade Up
      gsap.from(".fade-up-2", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".info-container",
          start: "top 85%",
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, [workItem, id]);

  if (!workItem) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-light-yellow">
        <h2 className="text-3xl font-semibold mb-6">Project not found</h2>
        <Link to="/works" className="text-coffee font-medium flex items-center gap-2 hover:underline">
          Return to Works
        </Link>
      </div>
    );
  }

  // Helper to safely split the title so we can style the first and remaining words differently
  const titleWords = workItem.title.split(' ');
  const firstWord = titleWords[0];
  const restOfTitle = titleWords.slice(1).join(' ');

  return (
    <div ref={containerRef} className="overflow-hidden">
      <PageBanner
        title="Project Details"
        currentPage="Project Details"
        productName={workItem.title}
      />

      {/* Immersive Hero Section */}
      <section className="work-hero relative pt-20 pb-32 bg-light-yellow z-10 w-full">
        <div className="container mx-auto px-4 relative">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            
            {/* Left Content */}
            <div className="w-full lg:w-[45%] text-container relative z-20 mt-10 lg:mt-0">
              {/* Giant Watermark Number */}
              <span className="watermark absolute -top-16 -left-10 text-[10rem] md:text-[14rem] lg:text-[16rem] font-bold text-coffee opacity-5 select-none leading-none z-[-1]">
                {workItem.number ? workItem.number.replace('.', '') : '00'}
              </span>
              
              <span className="fade-up title-span block mb-4 uppercase tracking-[0.2em]">
                Project {workItem.number}
              </span>
              
              <h2 className="fade-up heading-1 mb-8 text-5xl lg:text-7xl">
                {firstWord} <br />
                {restOfTitle && <span className="text-coffee">{restOfTitle}</span>}
              </h2>
              
              <p className="fade-up text-paragraph text-lg max-w-lg mb-12 border-l-4 border-coffee pl-6 py-2">
                {workItem.description}
              </p>
              
              <div className="fade-up flex items-center gap-8 md:gap-12">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500 uppercase tracking-widest mb-1">Client</span>
                  <span className="font-semibold text-xl text-primary">Lumor Studio</span>
                </div>
                <div className="w-px h-12 bg-gray-300"></div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500 uppercase tracking-widest mb-1">Category</span>
                  <span className="font-semibold text-xl text-primary">{workItem.title}</span>
                </div>
              </div>
            </div>

            {/* Right Main Image */}
            <div className="w-full lg:w-[55%] relative">
               <div className="reveal-image relative z-10 rounded-sm overflow-hidden shadow-2xl">
                 {/* El padding-bottom forzado para asegurar una relación de aspecto consistente, o altura fija */}
                 <div className="h-[500px] lg:h-[700px] w-full">
                    <img 
                      src={workItem.mainimage} 
                      alt={workItem.title} 
                      className="w-full h-full object-cover transform hover:scale-[1.03] transition-transform duration-[1.5s]" 
                    />
                 </div>
               </div>
               {/* Decorative Element */}
               <div className="absolute -bottom-16 -right-16 w-[400px] h-[400px] bg-coffee/10 rounded-full blur-[80px] z-0"></div>
            </div>
            
          </div>
        </div>
      </section>

      {/* High-end Asymmetric Story Section */}
      <section className="py-32 container mx-auto px-4 bg-white">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 info-container">
          
          {/* Secondary Image Offset */}
          <div className="w-full lg:w-[45%] order-2 lg:order-1 relative">
             <div className="reveal-image overflow-hidden rounded-sm shadow-xl">
               <div className="h-[450px] lg:h-[650px] w-full">
                 <img 
                   src={workItem.image} 
                   alt={`${workItem.title} Detail`} 
                   className="w-full h-full object-cover" 
                 />
               </div>
             </div>
             {/* Abstract shape */}
             <div className="absolute top-10 -left-10 w-40 h-40 border border-coffee/20 rounded-full z-[-1] animate-spin-slow"></div>
          </div>
          
          {/* Narrative Text */}
          <div className="w-full lg:w-[45%] lg:pl-10 order-1 lg:order-2">
             <span className="fade-up-2 text-coffee font-medium tracking-widest uppercase text-sm mb-4 block">The Approach</span>
             <h3 className="fade-up-2 text-4xl lg:text-5xl font-semibold mb-8 leading-[1.2] text-primary">
               Crafting environments that inspire and elevate.
             </h3>
             <p className="fade-up-2 text-paragraph text-lg mb-8 leading-relaxed">
               Every project begins with a careful understanding of the space and the client's vision. We approach {workItem.title.toLowerCase()} with a mix of creativity and technical precision, ensuring that the final result is both breathtaking and highly functional.
             </p>
             <p className="fade-up-2 text-paragraph text-lg leading-relaxed">
               We believe in natural light, premium materials, and seamless transitions between indoor and outdoor areas. This philosophy is deeply embedded in every corner of this project, blending modern aesthetics with timeless elegance.
             </p>
          </div>

        </div>
      </section>

      {/* Next Project / Call to Action */}
      <section className="py-32 bg-primary text-white text-center relative overflow-hidden group border-t-4 border-coffee">
        <div className="container mx-auto px-4 relative z-20">
          <span className="text-coffee uppercase tracking-[0.3em] text-sm font-semibold mb-6 block">Ready for more?</span>
          
          {/* Usamos "/faqs" temporalmente ya que ahí está el grid de trabajos (o "/services" si tienes página de portfolio) */}
          <Link to="/faqs" className="inline-block relative z-10">
            <h2 className="text-5xl lg:text-7xl font-bold text-white transition-colors duration-500 flex items-center justify-center gap-6 group-hover:text-coffee">
              Discover All Works
              <MoveRight className="w-12 h-12 lg:w-16 lg:h-16 text-coffee group-hover:translate-x-6 transition-transform duration-500 ease-out" />
            </h2>
          </Link>
        </div>
        
        {/* Background Overlay that subtly brightens */}
        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none"></div>
      </section>
    </div>
  )
}

export default WorkDetails