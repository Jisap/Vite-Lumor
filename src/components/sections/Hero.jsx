import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/effect-fade"

import slide1 from "/images/Index/Hero/main-slider-01.jpg"
import slide2 from "/images/Index/Hero/main-slider-02.jpg"
import slide3 from "/images/Index/Hero/main-slider-03.jpg"



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


            </div>
          </SwiperSlide>

        </Swiper>
      </div>
    </>
  )
}

export default Hero