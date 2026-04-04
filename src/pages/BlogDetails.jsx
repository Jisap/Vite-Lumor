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
import author from "../../public/images/Index/Blogs/author.png"
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

            <ul className="centered-row mx-auto justify-center text-muted">
              <li className="centered-row gap-2 me-5">
                <img
                  src={author}
                  alt="author-image"
                  className="w-10 h-10 mx-auto rounded-full"
                />

                <span className="text-black">{blog.author}</span> •
              </li>

              <li className="text-muted me-5">
                <span className="text-black">{blog.date}</span> •
              </li>

              <li className="text-muted me-5">
                <span className="text-black">{blog.comments}</span> •
              </li>
            </ul>
          </div>

          <div className="w-full lg:max-w-4xl mx-auto animate-text">
            <p className="text-paragraph mt-4 leading-6">
              <span className="float-left text-6xl font-bold text-heading mr-4 leading-none">
                {blog.title.charAt(0)}
              </span>

              Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, distinctio alias! Quo, nemo alias architecto praesentium quas facilis debitis. Repellat veritatis soluta est quas, porro illum numquam doloribus dolorem pariatur!
            </p>

            <p className="text-paragraph mt-4 leading-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, distinctio alias! Quo, nemo alias architecto praesentium quas facilis debitis. Repellat veritatis soluta est quas, porro illum numquam doloribus dolorem pariatur!
            </p>

            <p className="text-paragraph mt-4 leading-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, distinctio alias! Quo, nemo alias architecto praesentium quas facilis debitis. Repellat veritatis soluta est quas, porro illum numquam doloribus dolorem pariatur!
            </p>

            <h3 className="mt-10 text-2xl font-semibold text-heading">
              But, in truth , and I will accusse them
            </h3>

            <p className="text-paragraph mt-4 leading-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, distinctio alias! Quo, nemo alias architecto praesentium quas facilis debitis. Repellat veritatis soluta est quas, porro illum numquam doloribus dolorem pariatur!
            </p>

            <p className="text-paragraph mt-4 leading-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, distinctio alias! Quo, nemo alias architecto praesentium quas facilis debitis. Repellat veritatis soluta est quas, porro illum numquam doloribus dolorem pariatur!
            </p>

            <div className="animate-gallery lg:max-w-6xl centered-row flex-wrap lg:flex-nowrap justify-center mx-auto gap-3 my-10">
              <img
                src={gallery1}
                alt="post-image"
                className="h-80 xl:h-100 object-cover"
              />
              <img
                src={gallery2}
                alt="post-image"
                className="h-80 xl:h-100 object-cover"
              />
            </div>

            <div className="w-full lg:max-w-4xl mx-auto animate-text">
              <p className="text-paragraph mt-4 leading-6">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, distinctio alias! Quo, nemo alias architecto praesentium quas facilis debitis. Repellat veritatis soluta est quas, porro illum numquam doloribus dolorem pariatur!
              </p>

              <p className="text-paragraph mt-4 leading-6">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, distinctio alias! Quo, nemo alias architecto praesentium quas facilis debitis. Repellat veritatis soluta est quas, porro illum numquam doloribus dolorem pariatur!
              </p>

              <p className="text-paragraph mt-4 leading-6">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, distinctio alias! Quo, nemo alias architecto praesentium quas facilis debitis. Repellat veritatis soluta est quas, porro illum numquam doloribus dolorem pariatur!
              </p>

              <div className="bg-white p-10 mt-10 rounded-sm relative overflow-hidden animate-quote">
                <Quote size={40} className="text-yellow-500 mb-5" />

                <p className="max-w-3xl text-lg leading-tight">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor pariatur explicabo, obcaecati accusantium doloribus consequatur est assumenda, dolores culpa voluptas blanditiis expedita ipsam nulla fuga optio porro quas harum impedit?
                </p>

                <div className="absolute left-0 top-0 w-1 h-full bg-yellow-500"></div>
              </div>

              <p className="text-paragraph mt-4 leading-6">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, distinctio alias! Quo, nemo alias architecto praesentium quas facilis debitis. Repellat veritatis soluta est quas, porro illum numquam doloribus dolorem pariatur!
              </p>

              <h3 className="mt-10 text-2xl font-semibold text-heading">
                Creative approach to every project
              </h3>

              <p className="text-paragraph mt-4 leading-6">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, distinctio alias! Quo, nemo alias architecto praesentium quas facilis debitis. Repellat veritatis soluta est quas, porro illum numquam doloribus dolorem pariatur!
              </p>
            </div>

            <div className="animate-image lg:max-w-6xl centered-row justify-center mx-auto gap-3 my-10">
              <img
                src={post}
                alt="post-image"
              />
            </div>

            <div className="w-full lg:max-w-4xl mx-auto animate-text">
              <p className="text-paragraph mt-4 leading-6">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias consequuntur aliquid suscipit expedita ab illo quibusdam adipisci reiciendis. Obcaecati incidunt quaerat eligendi, molestias cum consectetur! Dolorum nobis libero eveniet veniam?
              </p>

              <p className="text-paragraph mt-4 leading-6">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias consequuntur aliquid suscipit expedita ab illo quibusdam adipisci reiciendis. Obcaecati incidunt quaerat eligendi, molestias cum consectetur! Dolorum nobis libero eveniet veniam?
              </p>
            </div>

            <div className="w-full lg:max-w-4xl mx-auto my-10 animate-form">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-12 text-heading">
                Leave a comment
              </h2>

              <form className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full bg-transparent border-b border-gray-400 focus:border-teal-600 focus:outline-none py-3 transition-colors"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full bg-transparent border-b border-gray-400 focus:border-teal-600 focus:outline-none py-3 transition-colors"
                    required
                  />
                </div>

                <div className="space-y-8">
                  <textarea
                    rows={4}
                    placeholder="Your comment"
                    className="w-full bg-transparent border-b border-gray-400 focus:border-teal-600 focus:outline-none py-3 transition-colors resize-none"
                    required
                  />

                  <div className="flex items-center gap-3 text-gray-600 text-sm">
                    <input
                      type="checkbox"
                      id="save-info"
                      className="w-4 h-4 accent-teal-600 cursor-pointer"
                    />
                    <label htmlFor="save-info" className="cursor-pointer hover:text-teal-600 transition-colors">
                      I agree that my submitted data is being collected and stored.
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="bg-teal-600 text-white px-10 py-4 font-semibold hover:bg-black transition-all duration-300 rounded-sm">
                    Leave a Comment
                  </button>
                </div>
              </form>
            </div>

            <div className="w-full lg:max-w-4xl mx-auto animate-related">
              <h3 className="mt-10 text-2xl font-semibold text-heading mb-5">
                You May Also Like
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BlogDetails