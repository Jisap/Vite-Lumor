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

const heroSlides = [
  {
    image: slide1,
    titleMain: "Transform Your",
    titleAccent: "Spaces",
    description: "Bring your vision to life with sophisticated interiors that combine style, comfort, and functionality, creating a home that truly reflects your personality and taste.",
    btnText: "Explore Designs",
    btnPath: "/about"
  },
  {
    image: slide2,
    titleMain: "Inspiring Your",
    titleAccent: "Living",
    description: "Elevate your daily life with inspired designs that balance beauty and practicality, transforming ordinary spaces into extraordinary experiences that energize, relax, and captivate.",
    btnText: "View Projects",
    btnPath: "/about",
    btnClass: "w-45!"
  },
  {
    image: slide3,
    titleMain: "Elegance Every",
    titleAccent: "Detail",
    description: "Experience luxury in every corner, where meticulous attention to detail, refined materials, and thoughtful design merge to craft interiors that impress and endure beautifully.",
    btnText: "Get In Touch",
    btnPath: "/contact"
  }
];

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
          pagination={{
            clickable: true,
          }}
          loop={true}
          className="heroSwiper px-4 py-[8%]"
        >
          {heroSlides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div
                className="px-[4%] md:px-[8%] xl:px-[12%] py-[8%] xl:py-[12%] min-h-screen w-full flex flex-col justify-center items-center bg-no-repeat bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="hero-content text-white text-center">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold pb-5">
                    {slide.titleMain} <span className="block text-coffee w-fit mx-auto">{slide.titleAccent}</span>
                  </h1>

                  <p className="max-w-4xl mx-auto pb-14 lg:pb-18 text-gray-50 font-light text-md lg:text-lg">
                    {slide.description}
                  </p>

                  <MainBtn
                    text={slide.btnText}
                    path={slide.btnPath}
                    className={slide.btnClass}
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button className="hero-prev hidden md:flex z-10 absolute left-8 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center bg-transparent text-white/50 border border-white/10 hover:text-white hover:border-white transition-all duration-500 rounded-full group">
          <ChevronLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
        </button>

        <button className="hero-next hidden md:flex z-10 absolute right-8 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center bg-transparent text-white/50 border border-white/10 hover:text-white hover:border-white transition-all duration-500 rounded-full group">
          <ChevronRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
        </button>

        <ul className="social-icons text-white absolute right-14 bottom-8 space-x-5 flex z-1">
          {[
            { icon: Facebook, url: "https://www.facebook.com/" },
            { icon: Instagram, url: "https://www.instagram.com/" },
            { icon: Twitter, url: "https://www.twitter.com/" },
            { icon: Dribbble, url: "https://www.dribbble.com/" }
          ].map((social, idx) => (
            <li key={idx}>
              <a href={social.url}>
                <social.icon className="social-icon" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Hero