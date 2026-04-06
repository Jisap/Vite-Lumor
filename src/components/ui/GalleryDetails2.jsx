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
      const mainTl = gsap.timeline();
      mainTl
        .from(".gd-eyebrow", {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out"
        })
        .from(".gd-title", {
          y: 60,
          opacity: 0,
          duration: 1.2,
          ease: "power4.out"
        }, "-=0.5")
        .from(".gd-divider", {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 0.9,
          ease: "power3.inOut"
        }, "-=0.6")
        .from(".gd-visual-main", {
          y: 50,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out"
        }, "-=0.5")
        .from(".gd-sidebar", {
          x: 30,
          opacity: 0,
          duration: 1,
          ease: "power3.out"
        }, "-=0.9")
        .from(".gd-thumb", {
          y: 20,
          opacity: 0,
          duration: 0.6,
          stagger: 0.07,
          ease: "power2.out"
        }, "-=0.6");

      const revealSections = [
        { container: ".reveal-section", items: ".reveal-item" },
        { container: ".reveal-section-2", items: ".reveal-item-2" }
      ];
      revealSections.forEach((setup) => {
        gsap.from(`${setup.container} ${setup.items}`, {
          y: 60,
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

      gsap.from(".reveal-grid > div", {
        scale: 0.9,
        opacity: 0,
        duration: 1.1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".reveal-grid",
          start: "top 80%",
        }
      });

      setTimeout(() => ScrollTrigger.refresh(), 500);
    }, galleryRef);

    return () => ctx.revert();
  }, [id, gallery]);

  useEffect(() => {
    if (gallery) setMainImage(gallery.image1);
  }, [gallery]);

  if (!gallery) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-gray-400 text-lg tracking-widest uppercase text-sm">Gallery not found</p>
      </div>
    );
  }

  const thumbnails = [
    gallery.image1, gallery.image2, gallery.image3, gallery.image4,
    gallery.swiperimage1, gallery.swiperimage2, gallery.swiperimage3
  ].filter(Boolean);

  return (
    <>
      <PageBanner
        title="Gallery Details"
        currentPage="Gallery Details"
        productName={gallery.title}
      />

      <section ref={galleryRef} className="container mx-auto py-[8%] px-4 lg:px-8">

        {/* ── Header ── */}
        <header className="mb-16 lg:mb-24 max-w-5xl">
          <div className="gd-eyebrow flex items-center gap-4 mb-6">
            <span className="block w-10 h-px bg-gray-400"></span>
            <span className="uppercase text-xs tracking-[0.25em] font-semibold text-gray-400">
              Project Showcase
            </span>
          </div>
          <h1 className="gd-title text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.9] tracking-tight text-gray-950 uppercase">
            {gallery.title}
          </h1>
          <div className="gd-divider mt-8 h-px bg-gray-200 w-full"></div>
        </header>

        {/* ── Main Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          {/* Left: Visuals */}
          <div className="lg:col-span-8 space-y-5">

            {/* Main Image */}
            <div className="gd-visual-main relative overflow-hidden rounded-none group aspect-[16/10] bg-gray-100">
              <img
                src={mainImage}
                alt={gallery.title}
                className="w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
              />
              {/* Corner accent */}
              <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-white/60 pointer-events-none"></div>
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-white/60 pointer-events-none"></div>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-7 gap-2">
              {thumbnails.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setMainImage(img)}
                  className={`gd-thumb aspect-square cursor-pointer overflow-hidden transition-all duration-500 ${
                    mainImage === img
                      ? "ring-2 ring-offset-1 ring-gray-900 opacity-100"
                      : "opacity-40 hover:opacity-80 hover:ring-1 hover:ring-gray-400 hover:ring-offset-1"
                  }`}
                >
                  <img src={img} alt={`thumb-${i}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Sidebar */}
          <aside className="gd-sidebar lg:col-span-4 lg:sticky lg:top-28 space-y-0">

            {/* Metadata card */}
            <div className="border border-gray-200 p-8 space-y-7 bg-white">
              <h4 className="uppercase text-xs tracking-[0.2em] font-bold text-gray-400 border-b border-gray-100 pb-4">
                Project Details
              </h4>

              <ul className="space-y-6">
                {gallery.Client && (
                  <li className="flex flex-col gap-1">
                    <span className="text-[10px] uppercase tracking-[0.18em] font-bold text-gray-400">Client</span>
                    <span className="text-base font-semibold text-gray-900">{gallery.Client}</span>
                  </li>
                )}
                {(gallery.Date || gallery.Year) && (
                  <li className="flex flex-col gap-1">
                    <span className="text-[10px] uppercase tracking-[0.18em] font-bold text-gray-400">Completion</span>
                    <span className="text-base font-semibold text-gray-900">{gallery.Date || gallery.Year}</span>
                  </li>
                )}
                {gallery.Author && (
                  <li className="flex flex-col gap-1">
                    <span className="text-[10px] uppercase tracking-[0.18em] font-bold text-gray-400">Lead Designer</span>
                    <span className="text-base font-semibold text-gray-900">{gallery.Author}</span>
                  </li>
                )}
                <li className="flex flex-col gap-1">
                  <span className="text-[10px] uppercase tracking-[0.18em] font-bold text-gray-400">Industry</span>
                  <span className="text-base font-semibold text-gray-900">Luxury Architecture</span>
                </li>
              </ul>
            </div>

            {/* Quote */}
            <div className="pt-8 border-l-2 border-gray-900 pl-6">
              <p className="text-gray-500 leading-relaxed text-sm italic">
                "Modern architecture is not just about lines and steel; it's about how light enters a room and how a space makes you feel."
              </p>
            </div>

            {/* CTA */}
            <div className="pt-6">
              <MainBtn
                path="/projects"
                text="All Projects →"
                className="w-full bg-gray-950! text-white! py-4! text-sm! tracking-widest! uppercase! font-bold! rounded-none! hover:bg-gray-800! transition-colors!"
              />
            </div>
          </aside>
        </div>

        {/* ── Extended Narrative ── */}
        <div className="mt-28 lg:mt-40">
          <div className="reveal-section">

            {/* Section header */}
            <div className="reveal-item flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14 pb-6 border-b border-gray-200">
              <h2 className="text-3xl lg:text-5xl font-black tracking-tight text-gray-950 uppercase leading-tight max-w-lg">
                {gallery.title}
                <br />
                <span className="text-gray-300">Design Narrative</span>
              </h2>
              <span className="text-[10px] uppercase tracking-[0.25em] text-gray-400 font-semibold shrink-0">
                Project Overview
              </span>
            </div>

            <p className="reveal-item text-gray-600 text-lg leading-relaxed mb-16 max-w-3xl">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque, quasi molestias accusantium
              cupiditate, animi sit delectus cum nostrum reprehenderit in soluta reiciendis, ut minima
              voluptatem ad labore magnam iure quis.
            </p>

            {/* Dual image grid */}
            <div className="reveal-grid grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
              <div className="group overflow-hidden aspect-[4/3] relative bg-gray-100">
                <img
                  src={gallery.image2}
                  alt="Detail view"
                  className="w-full h-full object-cover group-hover:scale-[1.06] transition-all duration-[1200ms] ease-out"
                />
                <div className="absolute bottom-0 left-0 right-0 px-5 py-4 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <p className="text-white text-xs uppercase tracking-widest font-semibold">Detail View</p>
                </div>
              </div>
              <div className="group overflow-hidden aspect-[4/3] relative bg-gray-100">
                <img
                  src={gallery.image3}
                  alt="Atmosphere view"
                  className="w-full h-full object-cover group-hover:scale-[1.06] transition-all duration-[1200ms] ease-out"
                />
                <div className="absolute bottom-0 left-0 right-0 px-5 py-4 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <p className="text-white text-xs uppercase tracking-widest font-semibold">Atmosphere</p>
                </div>
              </div>
            </div>

            <p className="reveal-item text-gray-600 text-lg leading-relaxed mb-24 max-w-3xl">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique, perferendis assumenda
              suscipit porro dicta harum facere, eum aliquam maxime reprehenderit iste omnis libero nemo
              provident neque eaque cumque quia! Obcaecati.
            </p>

            {/* Feature section */}
            <div className="reveal-section-2 grid grid-cols-1 xl:grid-cols-2 gap-16 xl:gap-24 items-center">

              {/* Text column */}
              <div className="space-y-12">
                <p className="reveal-item-2 text-gray-700 text-xl leading-relaxed font-light">
                  Interior design is the art and science of enhancing the interior of a building to achieve
                  a healthier and more aesthetically pleasing environment.
                </p>

                <div className="space-y-8">
                  {[
                    {
                      title: "Elegant & Functional Spaces",
                      body: "A well-designed interior balances beauty with practicality. From modern living rooms to cozy bedrooms, thoughtful layouts and carefully selected materials create spaces that feel welcoming, organized, and timeless."
                    },
                    {
                      title: "Design That Reflects Your Style",
                      body: "Interior design allows you to express your unique taste through furniture, decor, lighting, and color palettes. Whether minimal, contemporary, or classic, the right choices bring harmony to every corner."
                    }
                  ].map((feature, i) => (
                    <div key={i} className="reveal-item-2 group">
                      {/* Number accent */}
                      <div className="flex items-start gap-5">
                        <span className="text-5xl font-black text-gray-100 leading-none select-none mt-1 group-hover:text-gray-200 transition-colors">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <h4 className="text-lg font-bold text-gray-900 mb-2 tracking-tight">
                            {feature.title}
                          </h4>
                          <p className="text-gray-500 text-sm leading-relaxed">
                            {feature.body}
                          </p>
                        </div>
                      </div>
                      {i === 0 && (
                        <div className="mt-6 h-px bg-gray-100"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Image column */}
              <div className="reveal-item-2 relative">
                {/* Decorative frame offset */}
                <div className="absolute -top-4 -right-4 w-full h-full border-2 border-gray-200 pointer-events-none z-0"></div>
                <div className="relative z-10 overflow-hidden aspect-[3/4] group bg-gray-100">
                  <img
                    src={gallery.image4}
                    alt="Interior perspective"
                    className="w-full h-full object-cover group-hover:scale-[1.05] transition-all duration-[1400ms] ease-out"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ── Footer strip ── */}
        <div className="mt-24 pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="uppercase text-xs tracking-[0.25em] text-gray-400 font-semibold">
            {gallery.title} — Luxury Architecture
          </p>
          <MainBtn
            path="/projects"
            text="View All Projects →"
            className="text-sm uppercase tracking-widest font-bold text-gray-900 bg-transparent! border-b! border-gray-900! rounded-none! px-0! hover:text-gray-500! hover:border-gray-500! transition-colors!"
          />
        </div>

      </section>
    </>
  );
};

export default GalleryDetails;
