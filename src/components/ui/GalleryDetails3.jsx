import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect, useRef, useState } from "react"

import MainBtn from "../components/ui/Buttons/MainBtn"
import PageBanner from "../components/ui/PageBanner"
import { useParams } from "react-router-dom"
import galleryData from "../assets/Data/GalleryData.json"


gsap.registerPlugin(ScrollTrigger);

const GalleryDetails = () => {

  const { id } = useParams();
  const gallery = galleryData.find((item) => item.id === Number(id));

  const [mainImage, setMainImage] = useState(gallery?.image1);
  const galleryRef = useRef(null);

  useEffect(() => {
    if (!gallery) return;

    const ctx = gsap.context(() => {
      // 1. Initial Hero Reveal
      const mainTl = gsap.timeline();
      mainTl.from(".gallery-header > *", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power4.out"
      })
        .from(".gallery-visual-group", {
          x: -50,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out"
        }, "-=0.6")
        .from(".gallery-sidebar", {
          x: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out"
        }, "-=0.8");

      // 2. Scroll Triggered Narratives
      const revealSections = [
        { container: ".reveal-section", items: ".reveal-item" },
        { container: ".reveal-section-2", items: ".reveal-item-2" }
      ];

      revealSections.forEach((setup) => {
        gsap.from(setup.container + " " + setup.items, {
          y: 50,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: setup.container,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        });
      });

      // 3. Image Grid Reveal
      gsap.from(".reveal-grid > div", {
        scale: 0.85,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: ".reveal-grid",
          start: "top 80%",
        }
      });

      // 4. Force refresh after everything is ready
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);
    }, galleryRef);

    return () => ctx.revert();
  }, [id, gallery]);

  useEffect(() => {
    if (gallery) {
      setMainImage(gallery.image1);
    }
  }, [gallery]);

  if (!gallery) {
    return <p className="text-center mt-10">Gallery not found</p>
  }

  return (
    <>
      <PageBanner
        title="Gallery Details"
        currentPage="Gallery Details"
        productName={gallery.title}
      />

      <section ref={galleryRef} className="container mx-auto py-[8%] px-4">
        {/* Header Section */}
        <div className="gallery-header mb-16 max-w-3xl">
          <span className="title-span mb-3 block uppercase text-xs tracking-[0.3em] font-semibold text-gray-400">
            Project Showcase
          </span>

          <h2 className="heading-1 text-4xl lg:text-6xl font-semibold leading-tight">
            {gallery.title}
          </h2>

          <div className="mt-6 h-px w-24 bg-black/20"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Visuals */}
          <div className="gallery-visual-group lg:col-span-8 space-y-8">
            <div className="relative overflow-hidden aspect-video rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] group">
              <img
                src={mainImage}
                alt={gallery.title}
                className="w-full h-full object-cover transition-all duration-[1200ms] ease-out group-hover:scale-105"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-80"></div>
            </div>

            {/* Thumbnail Selection (Selective Visualization) */}
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 sm:gap-4">
              {[gallery.image1, gallery.image2, gallery.image3, gallery.image4, gallery.swiperimage1, gallery.swiperimage2, gallery.swiperimage3]
                .filter(Boolean)
                .map((img, i) => (
                  <div
                    key={i}
                    className={`aspect-square cursor-pointer rounded-lg border-2 transition-all duration-500 overflow-hidden ${mainImage === img ? 'border-black ring-4 ring-black/5 opacity-100' : 'border-transparent opacity-50 hover:opacity-100 scale-95 hover:scale-100'}`}
                    onClick={() => setMainImage(img)}
                  >
                    <img src={img} alt={`view-${i}`} className="w-full h-full object-cover" />
                  </div>
                ))
              }
            </div>
          </div>

          {/* Right Column: Project Details (Integrated Sidebar) */}
          <div className="gallery-sidebar lg:col-span-4 lg:sticky lg:top-32 space-y-10">
            <div className="bg-light-yellow/30 p-8 rounded-2xl border border-gray-100 backdrop-blur-sm">
              <h4 className="text-xl font-bold mb-6 pb-2 border-b border-gray-200/50">Core Information</h4>
              <ul className="space-y-5">
                {gallery.Client && (
                  <li className="flex flex-col gap-1">
                    <span className="text-xs uppercase tracking-tighter font-bold text-gray-400">Client</span>
                    <span className="text-lg text-gray-900">{gallery.Client}</span>
                  </li>
                )}
                {(gallery.Date || gallery.Year) && (
                  <li className="flex flex-col gap-1">
                    <span className="text-xs uppercase tracking-tighter font-bold text-gray-400">Completion</span>
                    <span className="text-lg text-gray-900">{gallery.Date || gallery.Year}</span>
                  </li>
                )}
                {gallery.Author && (
                  <li className="flex flex-col gap-1">
                    <span className="text-xs uppercase tracking-tighter font-bold text-gray-400">Lead Designer</span>
                    <span className="text-lg text-gray-900">{gallery.Author}</span>
                  </li>
                )}
                <li className="flex flex-col gap-1">
                  <span className="text-xs uppercase tracking-tighter font-bold text-gray-400">Industry</span>
                  <span className="text-lg text-gray-900">Luxury Architecture</span>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed italic">
                "Modern architecture is not just about lines and steel; it's about how light enters a room and how a space makes you feel."
              </p>
              <MainBtn path="/projects" text="All Projects" className="w-full bg-black! text-white!" />
            </div>
          </div>
        </div>

        {/* Extended Information: From Propuesta 2 */}
        <div className="mt-20 lg:mt-32 space-y-20">
          <div className="reveal-section max-w-4xl mx-auto">
            <h3 className="reveal-item text-3xl lg:text-4xl font-semibold mb-8 text-center lg:text-left transition-all duration-700 hover:text-black/80">
              {gallery.title}: Design Narrative
            </h3>
            <p className="reveal-item text-paragraph text-lg leading-loose mb-12">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque, quasi molestias accusantium cupiditate, animi sit delectus cum nostrum reprehenderit in soluta reiciendis, ut minima voluptatem ad labore magnam iure quis.
            </p>

            <div className="reveal-grid grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
              <div className="group overflow-hidden rounded-2xl shadow-lg aspect-video h-auto">
                <img
                  src={gallery.image2}
                  alt="Detail view"
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000"
                />
              </div>
              <div className="group overflow-hidden rounded-2xl shadow-lg aspect-video h-auto">
                <img
                  src={gallery.image3}
                  alt="Atmosphere view"
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000"
                />
              </div>
            </div>

            <p className="reveal-item text-paragraph text-lg leading-loose mb-20">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique, perferendis assumenda suscipit porro dicta harum facere, eum aliquam maxime reprehenderit iste omnis libero nemo provident neque eaque cumque quia! Obcaecati.
            </p>

            <div className="reveal-section-2 flex flex-col xl:flex-row gap-12 items-center">
              <div className="w-full xl:w-1/2 space-y-10">
                <p className="reveal-item-2 text-paragraph leading-relaxed font-light text-xl">
                  Interior design is the art and science of enhancing the interior of a building to achieve a healthier and more aesthetically pleasing environment for the people using the space.
                </p>

                <div className="space-y-6">
                  <div className="reveal-item-2">
                    <h4 className="text-2xl font-bold text-heading mb-3 flex items-center gap-3">
                      <span className="w-8 h-px bg-black"></span>
                      Elegant and Functional Spaces
                    </h4>

                    <p className="text-paragraph">
                      A well-designed interior balances beauty with practicality. From modern living rooms to cozy bedrooms, thoughtful layouts and carefully selected materials help create spaces that feel welcoming, organized, and timeless.
                    </p>
                  </div>

                  <div className="reveal-item-2">
                    <h4 className="text-2xl font-bold text-heading mb-3 flex items-center gap-3">
                      <span className="w-8 h-px bg-black"></span>
                      Design that Reflects Your Style
                    </h4>

                    <p className="text-paragraph">
                      Interior design allows you to express your unique taste through furniture, decor, lighting, and color palettes. Whether it's minimal, contemporary, or classic, the right design choices bring harmony and comfort to every corner of your home.
                    </p>
                  </div>
                </div>
              </div>

              <div className="reveal-item-2 w-full xl:w-1/2 rounded-3xl overflow-hidden shadow-2xl xl:rotate-1 group transition-transform hover:rotate-0 duration-700">
                <img
                  src={gallery.image4}
                  alt="Interior perspective"
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000"
                />
              </div>
            </div>
          </div>
        </div>
      </section >
    </>
  )
}

export default GalleryDetails