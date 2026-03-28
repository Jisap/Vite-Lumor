import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/effect-fade"

import slide1 from "/images/Index/Hero/main-slider-01.jpg"
import slide2 from "/images/Index/Hero/main-slider-02.jpg"
import slide3 from "/images/Index/Hero/main-slider-03.jpg"
import MainBtn from "../ui/Buttons/MainBtn"



const Hero = () => {
  return (
    <>
      <div className='relative'>
        <Swiper
          modules={[Autoplay, EffectFade, Navigation, Pagination]}
          effect="fade"
          autoplay={{ delay: 400 }}
          pagination={{
            nextEl: ".hero-next",
            prevEl: ".hero-prev",
          }}
          loop={true}
          className="heroSwiper px-4 py-[8%]"
        >
          <SwiperSlide>
            <div
              className="px-[4%] md:px-[8%] xl:px-[12%] py-[8%] xl:py-[12%] min-h-screen w-full flex flex-col justify-center items-center bg-no-repeat bg-cover bg-center"
              style={{ backgroundImage: `url(${slide1})` }}
            >
              <div className="hero-content text-white text-center">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold pb-5">
                  Transform Your <span className="block text-coffee w-fit mx-auto">Espace</span>
                </h1>

                <p className="max-w-4xl mx-auto pb-14 lg:pb-18 text-gray-50 font-light text-md lg:text-lg">
                  Bring your vision to life with sophisticated interiors that combine style, comfort, and functionality, creating a home that truly reflects your personality and taste.

                </p>

                <MainBtn
                  text={"Explore Designs"}
                  path="/about"
                  className="w-45!"
                />
              </div>

            </div>
          </SwiperSlide>

        </Swiper>
      </div>
    </>
  )
}

export default Hero