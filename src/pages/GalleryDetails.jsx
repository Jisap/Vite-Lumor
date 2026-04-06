

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"

import MainBtn from "../components/ui/Buttons/MainBtn"
import PageBanner from "../components/ui/PageBanner"
import galleryData from "../assets/Data/GalleryData.json"

gsap.registerPlugin(ScrollTrigger)

const GalleryDetails = () => {
  const { id } = useParams()
  const gallery = galleryData.find((item) => item.id === Number(id))

  const [mainImage, setMainImage] = useState(gallery?.image1)
  const [activeThumb, setActiveThumb] = useState(0)
  const galleryRef = useRef(null)
  const mainImageRef = useRef(null)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Preload images for smoother experience
  useEffect(() => {
    if (gallery) {
      const images = [
        gallery.image1, gallery.image2, gallery.image3, gallery.image4,
        gallery.swiperimage1, gallery.swiperimage2, gallery.swiperimage3
      ].filter(Boolean)
      images.forEach(src => {
        const img = new Image()
        img.src = src
      })
    }
  }, [gallery])

  // ✨ Smooth image transition effect with GSAP
  // This effect handles the FADE IN of the new image after state update
  useEffect(() => {
    if (!mainImageRef.current || !isTransitioning) return

    // Prevenimos parpadeos asegurando que empiece desde el estado del fade out
    gsap.fromTo(mainImageRef.current,
      { opacity: 0, scale: 1.02 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "power3.out",
        onComplete: () => {
          setIsTransitioning(false)
        }
      }
    )
  }, [mainImage])

  // GSAP animations for page elements
  useEffect(() => {
    if (!gallery) return

    const ctx = gsap.context(() => {
      // ✨ Hero Reveal
      const mainTl = gsap.timeline({ defaults: { ease: "power3.out" } })
      mainTl
        .from(".gallery-header", { y: 60, opacity: 0, duration: 1.2 })
        .from(".gallery-header .title-span", { y: 20, opacity: 0, duration: 0.8 }, "-=0.9")
        .from(".gallery-header h2", { y: 30, opacity: 0, duration: 1 }, "-=0.6")
        .from(".gallery-header .divider", { scaleX: 0, transformOrigin: "left", duration: 0.8, ease: "power2.out" }, "-=0.4")
        .from(".gallery-visual-group", { x: -40, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.5")
        .from(".gallery-sidebar", { x: 40, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.8")

      // ✨ Scroll-triggered reveals
      const revealSections = [
        { container: ".reveal-section", items: ".reveal-item" },
        { container: ".reveal-section-2", items: ".reveal-item-2" }
      ]

      revealSections.forEach((setup) => {
        gsap.from(setup.container + " " + setup.items, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: setup.container,
            start: "top 90%",
            end: "top 60%",
            toggleActions: "play none none reverse",
            scrub: 0.3
          }
        })
      })

      // ✨ Grid reveal
      gsap.from(".reveal-grid > div", {
        scale: 0.92,
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.12,
        ease: "back.out(1.2)",
        scrollTrigger: { trigger: ".reveal-grid", start: "top 85%" }
      })

      ScrollTrigger.refresh()
    }, galleryRef)

    return () => ctx.revert()
  }, [id, gallery])

  // Reset when gallery changes
  useEffect(() => {
    if (gallery) {
      setMainImage(gallery.image1)
      setActiveThumb(0)
      if (mainImageRef.current) {
        mainImageRef.current.dataset.initialized = "false"
      }
    }
  }, [gallery])

  // Handler para cambiar imagen con transición suave
  const handleImageChange = (img, index) => {
    if (isTransitioning || activeThumb === index) return

    setIsTransitioning(true)
    setActiveThumb(index)

    // FADE OUT de la imagen actual (la vieja)
    gsap.to(mainImageRef.current, {
      opacity: 0,
      scale: 1.02,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => {
        // Actualizamos el estado después de que la imagen vieja se haya desvanecido
        setMainImage(img)
      }
    })
  }

  if (!gallery) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto border-2 border-gray-200 rounded-full animate-pulse" />
          <p className="text-gray-500 text-lg">Cargando galería...</p>
        </div>
      </div>
    )
  }

  const thumbnails = [
    gallery.image1, gallery.image2, gallery.image3, gallery.image4,
    gallery.swiperimage1, gallery.swiperimage2, gallery.swiperimage3
  ].filter(Boolean)

  return (
    <>
      <PageBanner
        title="Gallery Details"
        currentPage="Gallery Details"
        productName={gallery.title}
      />

      <section ref={galleryRef} className="container mx-auto py-16 lg:py-24 px-4 sm:px-6 lg:px-8">

        {/* 🏷️ Header Section - Limpio y jerárquico */}
        <header className="gallery-header mb-16 lg:mb-24 max-w-4xl">
          <span className="title-span inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold tracking-wider text-gray-500 uppercase mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-black/40" />
            Project Showcase
          </span>

          <h1 className="heading-1 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.1] text-gray-900">
            {gallery.title}
          </h1>

          <div className="divider mt-6 h-px w-20 bg-gradient-to-r from-black/20 to-transparent" />

          {gallery.description && (
            <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-2xl">
              {gallery.description}
            </p>
          )}
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">

          {/* 🖼️ Left Column: Visuals - Presentación editorial */}
          <div className="gallery-visual-group lg:col-span-8 space-y-8">

            {/* Main Image - Sin bordes, sin sombras, con transición suave */}
            <div className="relative group">
              <div className="relative overflow-hidden aspect-[4/3] sm:aspect-video bg-black/5">
                <img
                  ref={mainImageRef}
                  src={mainImage}
                  alt={gallery.title}
                  className="w-full h-full object-cover will-change-transform"
                  style={{ opacity: 1 }}
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent pointer-events-none" />

                {gallery.imageCaptions?.[activeThumb] && (
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-black/70 text-sm font-medium backdrop-blur-sm transition-opacity duration-300">
                      {gallery.imageCaptions[activeThumb]}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Thumbnail Navigation - Minimalista */}
            {thumbnails.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {thumbnails.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => handleImageChange(img, i)}
                    disabled={isTransitioning || activeThumb === i}
                    className={`relative flex-shrink-0 aspect-square w-14 sm:w-16 transition-all duration-300 focus:outline-none cursor-pointer ${activeThumb === i
                      ? 'opacity-100 ring-2 ring-black ring-offset-2'
                      : 'opacity-50 hover:opacity-80'
                      } ${isTransitioning ? 'cursor-wait opacity-30' : ''}`}
                    aria-label={`Ver imagen ${i + 1}`}
                    aria-pressed={activeThumb === i}
                  >
                    <img
                      src={img}
                      alt={`Vista ${i + 1}`}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 📋 Right Column: Project Details - Sidebar integrada */}
          <aside className="gallery-sidebar lg:col-span-4 lg:sticky lg:top-24 space-y-10">

            {/* Info Section - Sin contenedor, solo tipografía */}
            <div>
              <h3 className="text-sm font-bold tracking-wider text-gray-400 uppercase mb-6 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Project Information
              </h3>

              <dl className="space-y-5">
                {gallery.Client && (
                  <div className="flex justify-between items-start">
                    <dt className="text-xs font-medium text-gray-400 uppercase tracking-wide">Client</dt>
                    <dd className="text-base font-semibold text-gray-900 text-right">{gallery.Client}</dd>
                  </div>
                )}
                {(gallery.Date || gallery.Year) && (
                  <div className="flex justify-between items-start">
                    <dt className="text-xs font-medium text-gray-400 uppercase tracking-wide">Completed</dt>
                    <dd className="text-base font-semibold text-gray-900 text-right">{gallery.Date || gallery.Year}</dd>
                  </div>
                )}
                {gallery.Author && (
                  <div className="flex justify-between items-start">
                    <dt className="text-xs font-medium text-gray-400 uppercase tracking-wide">Lead Designer</dt>
                    <dd className="text-base font-semibold text-gray-900 text-right">{gallery.Author}</dd>
                  </div>
                )}
                <div className="flex justify-between items-start">
                  <dt className="text-xs font-medium text-gray-400 uppercase tracking-wide">Industry</dt>
                  <dd className="text-base font-semibold text-gray-900 text-right">Luxury Architecture</dd>
                </div>
              </dl>
            </div>

            {/* Quote Block - Estilo editorial puro */}
            <blockquote className="relative">
              <svg className="absolute -top-2 -left-1 w-10 h-10 text-black/5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="relative text-gray-700 leading-relaxed italic pl-8 text-lg border-l-2 border-black/10">
                Modern architecture is not just about lines and steel; it's about how light enters a room and how a space makes you feel.
              </p>
            </blockquote>

            {/* CTA Button - Integrado */}
            <MainBtn
              path="/projects"
              text="Explore All Projects"
              className="w-full bg-transparent text-black border border-black/20 hover:border-black hover:bg-black hover:text-white transition-all duration-300 py-3.5 px-6 font-medium"
            />
          </aside>
        </div>

        {/* 📖 Extended Content Section - Narrativa visual fluida */}
        <div className="mt-24 lg:mt-32 space-y-24">

          <article className="reveal-section max-w-4xl mx-auto">
            <h2 className="reveal-item text-2xl lg:text-3xl xl:text-4xl font-bold mb-8 lg:mb-10 text-gray-900">
              {gallery.title}: <span className="text-gray-500 font-normal">Design Narrative</span>
            </h2>

            <div className="prose prose-lg prose-gray max-w-none">
              <p className="reveal-item text-lg text-gray-600 leading-relaxed mb-10">
                {gallery.longDescription || "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque, quasi molestias accusantium cupiditate, animi sit delectus cum nostrum reprehenderit in soluta reiciendis, ut minima voluptatem ad labore magnam iure quis."}
              </p>
            </div>

            {/* Image Grid - Layout asimétrico sin contenedores */}
            <div className="reveal-grid grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-16">
              {[gallery.image2, gallery.image3].filter(Boolean).map((img, idx) => (
                <figure key={idx} className="group relative overflow-hidden aspect-[4/3]">
                  <img
                    src={img}
                    alt={`Detail view ${idx + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                </figure>
              ))}
            </div>

            <p className="reveal-item text-lg text-gray-600 leading-relaxed mb-16 max-w-3xl">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique, perferendis assumenda suscipit porro dicta harum facere, eum aliquam maxime reprehenderit iste omnis libero nemo provident neque eaque cumque quia! Obcaecati.
            </p>

            {/* Two-column feature section */}
            <div className="reveal-section-2 flex flex-col xl:flex-row gap-12 lg:gap-16 items-center">
              <div className="w-full xl:w-1/2 space-y-8">
                <p className="reveal-item-2 text-lg text-gray-600 leading-relaxed">
                  Interior design is the art and science of enhancing the interior of a building to achieve a healthier and more aesthetically pleasing environment for the people using the space.
                </p>

                <div className="space-y-6">
                  {[
                    {
                      title: "Elegant and Functional Spaces",
                      desc: "A well-designed interior balances beauty with practicality. From modern living rooms to cozy bedrooms, thoughtful layouts and carefully selected materials help create spaces that feel welcoming, organized, and timeless."
                    },
                    {
                      title: "Design that Reflects Your Style",
                      desc: "Interior design allows you to express your unique taste through furniture, decor, lighting, and color palettes. Whether it's minimal, contemporary, or classic, the right design choices bring harmony and comfort to every corner of your home."
                    }
                  ].map((item, idx) => (
                    <div key={idx} className="reveal-item-2 group">
                      <h4 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-3">
                        <span className="w-8 h-px bg-black/20 group-hover:bg-black transition-colors" />
                        {item.title}
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Featured Image */}
              <div className="reveal-item-2 w-full xl:w-1/2">
                <div className="relative overflow-hidden group">
                  <img
                    src={gallery.image4}
                    alt="Interior perspective"
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
    </>
  )
}

export default GalleryDetails