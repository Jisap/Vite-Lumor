import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect, useRef, useState } from "react"

import MainBtn from "../components/ui/Buttons/MainBtn"
import PageBanner from "../components/ui/PageBanner"
import { useParams } from "react-router-dom"
import galleryData from "../assets/Data/GalleryData.json"

import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"
import { Navigation } from "swiper/modules"
import { ArrowLeft, ArrowRight } from "lucide-react"


const GalleryDetails = () => {

  const { id } = useParams();
  const gallery = galleryData.find((item) => item.id === Number(id));

  const [mainImage, setMainImage] = useState(gallery?.image1);
  const galleryRef = useRef(null);

  // useEffect(() => {
  //   if (!gallery) return;

  //   const ctx = gsap.context(() => {
  //     gsap.from(".animate-content > *", {
  //       y: 40,
  //       opacity: 0,
  //       duration: 1,
  //       stagger: 0.2,
  //       ease: "power3.out",
  //       scrollTrigger: {
  //         trigger: ".animate-content",
  //         start: "top 85%",
  //         toggleActions: "play none none reverse"
  //       }
  //     });
  //   }, galleryRef);

  //   return () => ctx.revert();
  // }, [id, gallery]);

  useEffect(() => {
    if (gallery) {
      setMainImage(gallery.image1);
    }
  }, [gallery]);

  if (!gallery) {
    return <p className="text-center mt-10">Gallery not found</p>
  }

  // const additionalImages = [
  //   gallery.swiperimage1, 
  //   gallery.swiperimage2, 
  //   gallery.swiperimage3,
  //   gallery.image1,
  //   gallery.image2,
  //   gallery.image3,
  //   gallery.image4
  // ].filter(Boolean);

  return (
    <>
      <PageBanner
        title="Gallery Details"
        currentPage="Gallery Details"
        productName={gallery.title}
      />

      {/* Propuesta 1 */}
      {/* <section ref={galleryRef} className="container mx-auto py-[8%] px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="space-y-6">
          <div className="relative overflow-hidden aspect-4/5">
            <img 
              src={mainImage} 
              alt={gallery.title} 
              className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
            />
          </div>
          
          <div className="grid grid-cols-4 gap-4">
             {[gallery.image1, gallery.image2, gallery.image3, gallery.image4].filter(Boolean).map((img, i) => (
                <div 
                   key={i} 
                   className={`h-24 sm:h-32 cursor-pointer border-2 transition-all duration-300 overflow-hidden ${mainImage === img ? 'border-black opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}`}
                   onClick={() => setMainImage(img)}
                >
                  <img src={img} alt={`view-${i}`} className="w-full h-full object-cover" />
                </div>
             ))}
          </div>
        </div>

        <div className="animate-content sticky top-24">
          <span className="title-span mb-2 block uppercase text-sm tracking-widest font-semibold text-gray-500">Project Details</span>
          <h2 className="heading-1 mb-8">{gallery.title}</h2>
          
          <div className="space-y-6 mb-12">
            {gallery.Client && (
              <div className="flex border-b border-gray-100 pb-4">
                <span className="w-32 font-bold text-gray-900">Client:</span>
                <span className="text-gray-600 font-light">{gallery.Client}</span>
              </div>
            )}
            {(gallery.Date || gallery.Year) && (
              <div className="flex border-b border-gray-100 pb-4">
                <span className="w-32 font-bold text-gray-900">Date:</span>
                <span className="text-gray-600 font-light">{gallery.Date || gallery.Year}</span>
              </div>
            )}
            {gallery.Author && (
              <div className="flex border-b border-gray-100 pb-4">
                <span className="w-32 font-bold text-gray-900">Designer:</span>
                <span className="text-gray-600 font-light">{gallery.Author}</span>
              </div>
            )}
            <div className="flex border-b border-gray-100 pb-4">
              <span className="w-32 font-bold text-gray-900">Category:</span>
              <span className="text-gray-600 font-light">Interior Design</span>
            </div>
          </div>

          <p className="pera-text mb-10">
            This project celebrates the fusion of modern aesthetics with functional elegance. 
            Our team focused on creating a space that feels both personal and high-end, 
            balancing textures and light to bring the client's vision to life.
          </p>

          <MainBtn path="/about" text="Back to Projects" className="bg-black! text-white!" />
        </div>
      </section>

      {additionalImages.length > 0 && (
         <section className="bg-light-yellow py-[8%]">
            <div className="container mx-auto px-4 mb-12 flex justify-between items-end">
               <div>
                 <span className="title-span block mb-2">Portfolio</span>
                 <h2 className="heading-1">Additional Views</h2>
               </div>
               
               <div className="flex gap-4">
                 <button className="swiper-prev-details w-12 h-12 flex items-center justify-center border border-black hover:bg-black hover:text-white transition-all cursor-pointer">
                    <ArrowLeft size={20} />
                 </button>
                 <button className="swiper-next-details w-12 h-12 flex items-center justify-center border border-black hover:bg-black hover:text-white transition-all cursor-pointer">
                    <ArrowRight size={20} />
                 </button>
               </div>
            </div>
            
            <div className="container mx-auto px-4">
               <Swiper
                 modules={[Navigation]}
                 spaceBetween={20}
                 slidesPerView={1}
                 navigation={{
                    prevEl: ".swiper-prev-details",
                    nextEl: ".swiper-next-details",
                 }}
                 breakpoints={{
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                 }}
               >
                 {additionalImages.map((img, i) => (
                    <SwiperSlide key={i}>
                       <div className="h-100 overflow-hidden group">
                          <img src={img} alt={`additional-${i}`} className="section-image w-full h-full object-cover group-hover:scale-110 transition duration-1000" />
                       </div>
                    </SwiperSlide>
                 ))}
               </Swiper>
            </div>
         </section>
      )} */}

      {/* Propuesta 2 */}
      <div className="container mx-auto px-4 py-[8%]">
        <h3 className="heading-1 mb-14">{gallery.title}</h3>

        <div className="section-container p-0! gap-10 lg:gap-14">
          {(gallery.Client || gallery.Date || gallery.Year || gallery.Author) && (
            <div className="w-full lg:w-[30%] lg:sticky top-[8em] left-0 gallery-left">
              <ul className="lg:max-w-60 space-y-4">
                {gallery.Client && (
                  <li className="centered-row justify-between">
                    <span className="text-heading text-lg font-semibold">Client</span>
                    <span className="text-lg text-muted font-light">{gallery.Client}</span>
                  </li>
                )}

                {(gallery.Date || gallery.Year) && (
                  <li className="centered-row justify-between">
                    <span className="text-heading text-lg font-semibold">
                      {gallery.Date && gallery.Year ? "Date & Year" : gallery.Date ? "Date" : "Year"}
                    </span>
                    <span className="text-lg text-muted font-light">
                      {gallery.Date && gallery.Year
                        ? `${gallery.Date} / ${gallery.Year}`
                        : gallery.Date
                          ? gallery.Date
                          : gallery.Year
                      }
                    </span>
                  </li>
                )}

                {gallery.Author && (
                  <li className="centered-row justify-between">
                    <span className="text-heading text-lg font-semibold">Author</span>
                    <h5 className="text-lg text-muted font-light">{gallery.Author}</h5>
                  </li>
                )}
              </ul>
            </div>
          )}

          <div className={`gallery-right ${(gallery.Client || gallery.Date || gallery.Year || gallery.Author)
            ? "w-full lg:w-[70%]"
            : "w-full lg:w-full flex justify-center flex-col"
            }`}
          >
            <div className="main-image w-full relative">
              {[gallery.image1, gallery.image2, gallery.image3, gallery.image4, gallery.swiperimage1, gallery.swiperimage2, gallery.swiperimage3].filter(Boolean).length > 1 && (
                <div className="absolute -top-16 right-4 flex gap-4 z-10">
                  <button className="gallery-prev w-12 h-12 border items-center justify-center hover:bg-black hover:text-white transition-all duration-300 cursor-pointer sm:flex hidden">
                    <ArrowLeft size={20} />
                  </button>

                  <button className="gallery-next w-12 h-12 border items-center justify-center hover:bg-black hover:text-white transition-all duration-300 cursor-pointer sm:flex hidden">
                    <ArrowRight size={20} />
                  </button>
                </div>
              )}

              {(() => {
                const galleryImages = [
                  gallery.image1,
                  gallery.image2,
                  gallery.image3,
                  gallery.image4,
                  gallery.swiperimage1,
                  gallery.swiperimage2,
                  gallery.swiperimage3
                ].filter(Boolean); // Filtro para eliminar valores undefined o null -> se evita renderizaciones de imagenes que no existen

                if (galleryImages.length > 1) {
                  return (
                    <Swiper
                      modules={[Navigation]}
                      spaceBetween={10}
                      slidesPerView={1}
                      className="rounded h-150 lg:h-200"
                      navigation={{
                        prevEl: ".gallery-prev",
                        nextEl: ".gallery-next",
                      }}
                    >
                      {galleryImages.map((img, idx) => (
                        <SwiperSlide key={idx}>
                          <img
                            src={img}
                            alt={`gallery-${idx}`}
                            className="w-full h-full object-cover rounded"
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  );
                } else {
                  return (
                    <img
                      src={mainImage}
                      alt={gallery.title}
                      className="w-full h-full object-cover rounded"
                    />
                  );
                }
              })()}
            </div>

            <h3 className="text-3xl lg:text-4xl font-semibold pt-8 pb-5">
              Wood Sliding Doors
            </h3>

            <p className="text-paragraph pb-8">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque, quasi molestias accusantium cupiditate, animi sit delectus cum nostrum reprehenderit in soluta reiciendis, ut minima voluptatem ad labore magnam iure quis.
            </p>

            <div className="centered-row justify-between flex-col lg:flex-row gap-3 w-full h-auto lg:h-90">
              <div className="image group overflow-hidden rounded-sm w-full h-full">
                <img
                  src={gallery.image2}
                  alt="gallery image"
                  className="section-image group-hover:scale-110 transition-all duration-300"
                />
              </div>

              <div className="image group overflow-hidden rounded-sm w-full h-full">
                <img
                  src={gallery.image3}
                  alt="gallery image"
                  className="section-image group-hover:scale-110 transition-all duration-300"
                />
              </div>
            </div>

            <p className="text-pragraph pb-8 pt-8">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique, perferendis assumenda suscipit porro dicta harum facere, eum aliquam maxime reprehenderit iste omnis libero nemo provident neque eaque cumque quia! Obcaecati.
            </p>

            <div className="centered-row justify-between flex-col xl:flex-row item-start! gap-10">
              <div className="w-full xl:w-1/2">
                <p className="text-paragraph pb-8">
                  Interior design is the art and science of enhancing the interior of a building to achieve a healthier and more aesthetically pleasing environment for the people using the space.
                </p>

                <h4 className="text-2xl font-medium text-heading pb-3">
                  Elegant and Functional Spaces
                </h4>

                <p className="text-paragraph pb-8">
                  A well-designed interior balances beauty with practicality. From modern living rooms to cozy bedrooms, thoughtful layouts and carefully selected materials help create spaces thar feel thar fell welcoming, organized, and timeless.
                </p>

                <h4 className="text-2xl font-medium text-heading pb-3">
                  Design that Reflects Your Style
                </h4>

                <p className="text-paragraph pb-8">
                  Interior design allows you to express your unique taste through furniture, decor, lighting, and color palettes. Whether it's minimal, comtemporary, or classic, the right design choices bring harmony and comfort to every corner of your home.
                </p>
              </div>

              <div className="w-full xl:w-1/2">
                <img
                  src={gallery.image4}
                  alt="interior design"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default GalleryDetails