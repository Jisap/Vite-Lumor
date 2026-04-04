import { useEffect, useRef } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import { Gift, Percent, ShoppingBag, WalletMinimal } from "lucide-react"

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useParams } from "react-router-dom";

import gallery1 from "../../public/images/Index/Blogs/gallery-image-01.jpg"
import gallery2 from "../../public/images/Index/Blogs/gallery-image-02.jpg"
import post from "../../public/images/Index/Blogs/gallery-main.jpg"
import { Quote } from "lucide-react"

import blogData from "../assets/Data/Blogs.json"

gsap.registerPlugin(ScrollTrigger);




const BlogDetails = () => {

  const blogdetailsRef = useRef(null);

  const { id } = useParams();
  const blog = blogData.find((blog) => blog.id === parseInt(id));
  if (!blog) return <p className="">Blog not found</p>

  return (
    <>
      <div ref={blogdetailsRef} className="w-full h-full">
        <div
          className='section-banner animate-banner bg-center bg-cover bg-no-repeat min-h-120 md:min-h-150 flex flex-col justify-center relative z-1 pt-22 overflow-hidden'
          style={{
            backgroundImage: `url(${blog.image})`
          }}
        >
          <div className='overlay bg-primary absolute top-0 left-0 w-full h-full opacity-30'></div>
        </div>
      </div>

      <div className="bg-light-yellow">
        <div className="container mx-auto px-4 -translate-y-50 z-2 relative">
          <div className="blog-info animate-header bg-white shadow-sm rounded-sm text-center mb-10 py-20 px-8">
            <span className="bg-primary text-white px-3 py-1 rounded-sm">{blog.category}</span>

            <h2 className="text-2xl sm:text-3xl lg:text-5xl mt-12 font-bold leading-tight mb-5 max-w-2xl mx-auto">
              {blog.title}
            </h2>


          </div>
        </div>
      </div>
    </>
  )
}

export default BlogDetails