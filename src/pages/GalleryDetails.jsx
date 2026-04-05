import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect, useRef, useState } from "react"

import MainBtn from "../components/ui/Buttons/MainBtn"
import PageBanner from "../components/ui/PageBanner"

const GalleryDetails = () => {
  return (
    <>
      <PageBanner
        title="Gallery Details"
        currentPage="Gallery Details"
      />
    </>
  )
}

export default GalleryDetails