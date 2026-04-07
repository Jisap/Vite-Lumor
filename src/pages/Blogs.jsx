
import PageBanner from '../components/ui/PageBanner'
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect, useRef, useState } from "react"
import blogData from "../assets/Data/Blogs.json"

gsap.registerPlugin(ScrollTrigger);

const Blogs = () => {
  return (
    <>
      <PageBanner title="Blogs" currentPage="Blogs" />
    </>
  )
}

export default Blogs