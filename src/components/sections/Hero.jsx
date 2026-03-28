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
import { ChevronLeft, ChevronRight, Dribbble, Facebook, Instagram, Twitter } from "lucide-react"




const Hero = () => {
  return (
    <>
      <div className='relative'>
        <Swiper
          modules={[Autoplay, EffectFade, Navigation, Pagination]}
          effect="fade"
          autoplay={{ delay: 3500 }}
          navigation={{
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
                  Transform Your <span className="block text-coffee w-fit mx-auto">Spaces</span>
                </h1>

                <p className="max-w-4xl mx-auto pb-14 lg:pb-18 text-gray-50 font-light text-md lg:text-lg">
                  Bring your vision to life with sophisticated interiors that combine style, comfort, and functionality, creating a home that truly reflects your personality and taste.

                </p>

                <MainBtn
                  text={"Explore Designs"}
                  path="/about"
                />
              </div>

            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div
              className="px-[4%] md:px-[8%] xl:px-[12%] py-[8%] xl:py-[12%] min-h-screen w-full flex flex-col justify-center items-center bg-no-repeat bg-cover bg-center"
              style={{ backgroundImage: `url(${slide2})` }}
            >
              <div className="hero-content text-white text-center">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold pb-5">
                  Inspiring Your <span className="block text-coffee w-fit mx-auto">Living</span>
                </h1>

                <p className="max-w-4xl mx-auto pb-14 lg:pb-18 text-gray-50 font-light text-md lg:text-lg">
                  Elevate your daily life with inspired designs that balance beauty and practicality, transforming ordinary spaces into extraordinary experiences that energize, relax, and captivate.

                </p>

                <MainBtn
                  text={"View Projects"}
                  path="/about"
                  className="w-45!"
                />
              </div>

            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div
              className="px-[4%] md:px-[8%] xl:px-[12%] py-[8%] xl:py-[12%] min-h-screen w-full flex flex-col justify-center items-center bg-no-repeat bg-cover bg-center"
              style={{ backgroundImage: `url(${slide3})` }}
            >
              <div className="hero-content text-white text-center">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold pb-5">
                  Elegance Every <span className="block text-coffee w-fit mx-auto">Detail</span>
                </h1>

                <p className="max-w-4xl mx-auto pb-14 lg:pb-18 text-gray-50 font-light text-md lg:text-lg">
                  Experience luxury in every corner, where meticulous attention to detail, refined materials, and thoughtful design merge to craft interiors that impress and endure beautifully.
                </p>

                <MainBtn
                  text={"Get In Touch"}
                  path="/contact"
                />
              </div>

            </div>
          </SwiperSlide>
        </Swiper>

        <button className="hero-prev z-10 absolute left-6 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-xl p-4 rounded-full text-white border border-white/20 hover:bg-coffee hover:border-coffee transition-all duration-300 group">
          <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
        </button>

        <button className="hero-next z-10 absolute right-6 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-xl p-4 rounded-full text-white border border-white/20 hover:bg-coffee hover:border-coffee transition-all duration-300 group">
          <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
        </button>

        <ul className="social-icons text-white absolute right-14 bottom-8 space-x-5 flex z-1">
          <li>
            <a href="https://www.facebook.com/">
              <Facebook className="social-icon" />
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/">
              <Instagram className="social-icon" />
            </a>
          </li>
          <li>
            <a href="https://www.twitter.com/">
              <Twitter className="social-icon" />
            </a>
          </li>
          <li>
            <a href="https://www.dribbble.com/">
              <Dribbble className="social-icon" />
            </a>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Hero