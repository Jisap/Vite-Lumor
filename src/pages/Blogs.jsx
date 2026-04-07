
import PageBanner from '../components/ui/PageBanner'
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect, useRef, useState } from "react"
import blogData from "../assets/Data/Blogs.json"
import BlogListCard from '../components/ui/Cards/BlogListCard'

gsap.registerPlugin(ScrollTrigger);

const Blogs = () => {
  return (
    <>
      <PageBanner title="Our Blog" currentPage="Our Blog" />

      <div className='container mx-auto px-4 py-[8%]'>
        <div className='section-container p-0! gap-10 lg:gap-14'>
          <div className='w-full lg:w-[70%] space-y-5 lg:space-y-8 blog-list'>
            {blogData.map((blog) => (
              <BlogListCard key={blog.id} blog={blog} />
            ))}
          </div>

          <div className='w-full lg:w-[30%] bg-white py-12 px-8 shadow-lg lg:sticky top-10 self-start sidebar'>
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
          </div>
        </div>
      </div>
    </>
  )
}

export default Blogs