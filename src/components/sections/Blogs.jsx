import { useEffect, useRef } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import { Gift, Percent, ShoppingBag, WalletMinimal } from "lucide-react"
import blogData from "../../assets/Data/Blogs.json";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


const Blogs = () => {

  const headingRef = useRef();
  const blogRef = useRef();
  const featureRef = useRef();

  return (
    <>
      <div className="bg-light-yellow">
        <div className="container px-4 py-[8%] mx-auto">
          <div ref={headingRef} className="text-center w-full mb-16">
            <span className="title-span">Our Blog</span>

            <h2 className="heading-1 mb-5">
              Latest <span className="text-coffee">News</span>
            </h2>
          </div>
        </div>
      </div>
    </>
  )
}

export default Blogs