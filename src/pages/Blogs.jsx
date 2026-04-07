
import PageBanner from '../components/ui/PageBanner'
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect, useRef } from "react"
import blogData from "../assets/Data/Blogs.json"
import BlogListCard from '../components/ui/Cards/BlogListCard'

gsap.registerPlugin(ScrollTrigger);

const Blogs = () => {

  const blogListRef = useRef(null);
  const sidebarRef = useRef(null);

  // --- Blog list animations (cards stagger up) ---
  useEffect(() => {
    if (!blogListRef.current) return;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(blogListRef);

      gsap.from(q(".blog-card"), {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: blogListRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, blogListRef);

    return () => ctx.revert();
  }, []);

  // --- Sidebar animations (slide in from right) ---
  useEffect(() => {
    if (!sidebarRef.current) return;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(sidebarRef);

      // Sidebar container itself
      gsap.from(sidebarRef.current, {
        x: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sidebarRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // Section titles inside sidebar
      gsap.from(q(".title"), {
        y: -20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sidebarRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Recent post items
      gsap.from(q(".recent-item"), {
        x: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sidebarRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Tag pills — scale + fade bounce
      gsap.from(q(".tag-item"), {
        scale: 0.8,
        opacity: 0,
        duration: 0.4,
        stagger: 0.1,
        delay: 0.4,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: q(".tag-item"),
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });
    }, sidebarRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <PageBanner title="Our Blog" currentPage="Our Blog" />

      <div className='container mx-auto px-4 py-[8%]'>
        <div className='section-container p-0! gap-10 lg:gap-14'>
          <div ref={blogListRef} className='w-full lg:w-[70%] space-y-5 lg:space-y-8 blog-list'>
            {blogData.map((blog) => (
              <BlogListCard key={blog.id} blog={blog} />
            ))}
          </div>

          <div ref={sidebarRef} className='w-full lg:w-[30%] bg-white py-12 px-8 shadow-lg lg:sticky top-10 self-start sidebar'>
            <div className='mb-10'>
              <h3 className='text-xl font-semibold mb-6 title'>Recent Post</h3>

              <div className='space-y-6'>
                {blogData.slice(0, 2).map((post) => (
                  <div key={post.id} className='flex gap-4 recent-item'>
                    <img
                      src={post.image}
                      alt={post.title}
                      className='w-20 h-20 object-cover rounded-sm'
                    />

                    <div>
                      <p className='text-xs text-gray-500 uppercase mb-2'>
                        {post.category} • {post.date}
                      </p>

                      <h4 className='font-semibold leading-snug line-clamp-2'>
                        {post.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className='text-xl font-semibold mb-6 title'>
                Tags
              </h3>

              <ul className='flex flex-wrap gap-3'>
                <li className='border px-4 py-1 text-sm hover:bg-black hover:text-white cursor-pointer transition-all duration-300 tag-item'>
                  Interior
                </li>
                <li className='border px-4 py-1 text-sm hover:bg-black hover:text-white cursor-pointer transition-all duration-300 tag-item'>
                  Furniture
                </li>
                <li className='border px-4 py-1 text-sm hover:bg-black hover:text-white cursor-pointer transition-all duration-300 tag-item'>
                  Design
                </li>
                <li className='border px-4 py-1 text-sm hover:bg-black hover:text-white cursor-pointer transition-all duration-300 tag-item'>
                  Architecture
                </li>
                <li className='border px-4 py-1 text-sm hover:bg-black hover:text-white cursor-pointer transition-all duration-300 tag-item'>
                  Modern
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Blogs