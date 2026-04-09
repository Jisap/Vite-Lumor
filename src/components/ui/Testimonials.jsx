import { Star, Quote } from "lucide-react"
import { Autoplay, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import data from "../../assets/data"



const Testimonials = () => {

  const testimonials = data.testimonials;

  return (
    <>
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={30}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true, dynamicBullets: true }}
        loop={true}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1300: { slidesPerView: 3 },
        }}
        className="pb-16"
      >
        {testimonials.map((item, index) => (
          <SwiperSlide key={index} className="h-auto">
            <div className="testimonial-card bg-white p-10 rounded-2xl h-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col justify-between hover:-translate-y-2 transition-all duration-300 relative group">
              <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-coffee/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div>
                <div className="flex justify-between items-start mb-8">
                  <div className="flex gap-1 text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={20} fill="currentColor" strokeWidth={0} />
                    ))}
                  </div>
                  <Quote className="text-gray-100 group-hover:text-coffee/20 transition-colors duration-300" size={48} />
                </div>

                <p className="text-gray-600 mb-8 leading-relaxed font-medium text-lg relative z-10">
                  "{item.text}"
                </p>
              </div>

              <div className="mt-auto relative z-10">
                <div className="w-12 h-1 bg-coffee mb-5 rounded-full" />
                <h4 className="text-gray-900 font-bold text-xl mb-1">{item.name}</h4>
                <span className="text-sm text-coffee font-semibold tracking-wider uppercase">{item.role}</span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

export default Testimonials