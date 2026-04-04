import { useEffect, useRef } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import { Gift, Percent, ShoppingBag, WalletMinimal } from "lucide-react"
import blogData from "../../assets/Data/Blogs.json";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BlogCard from "../ui/Cards/BlogCard";

gsap.registerPlugin(ScrollTrigger);


const Blogs = () => {

  const headingRef = useRef();
  const blogRef = useRef();
  const featureRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.from(headingRef.current, {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse"
        }
      });

      // Swiper slides staggered animation
      const swiperSlides = blogRef.current.querySelectorAll(".swiper-slide");
      gsap.from(swiperSlides, {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: blogRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        },
      });

      // Features row staggered animation
      const featureItems = featureRef.current.querySelectorAll(".item");
      gsap.from(featureItems, {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: featureRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse"
        }
      });
    });

    return () => ctx.revert();

  }, [])

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

          <div ref={blogRef}>
            <Swiper
              spaceBetween={30}
              slidesPerView={1}
              navigation={{
                nextEl: ".blog-next",
                prevEl: ".blog-prev",
              }}
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              className="mb-40"
            >
              {blogData.map((blog) => (
                <SwiperSlide key={blog.id}>
                  <BlogCard
                    id={blog.id}
                    image={blog.image}
                    title={blog.title}
                    date={blog.date}
                    category={blog.category}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Features Row */}
          <div className="border-t border-[#dddca9]">
            <div
              ref={featureRef}
              className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-14 py-16"
            >
              <div className="item centered-row gap-3 lg:px-8">
                <Gift size={50} />

                <div className="content">
                  <h4 className="text-lg font-semibold text-heading">
                    Reward program
                  </h4>

                  <span className="text-gray-500">
                    Earn points for every purchase
                  </span>
                </div>
              </div>

              <div className="item centered-row gap-3 lg:px-8">
                <Percent size={50} />

                <div className="content">
                  <h4 className="text-lg font-semibold text-heading">
                    Fast shipping
                  </h4>

                  <span className="text-gray-500">
                    Get your order delivered quickly
                  </span>
                </div>
              </div>

              <div className="item centered-row gap-3 lg:px-8">
                <ShoppingBag size={50} />

                <div className="content">
                  <h4 className="text-lg font-semibold text-heading">
                    Special discount
                  </h4>

                  <span className="text-gray-500">
                    Enjoy exclusive savings on every order
                  </span>
                </div>
              </div>

              <div className="item centered-row gap-3 lg:px-8">
                <WalletMinimal size={50} />

                <div className="content">
                  <h4 className="text-lg font-semibold text-heading">
                    Great Prices
                  </h4>

                  <span className="text-gray-500">
                    Get the best value for your money
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Blogs