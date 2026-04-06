import React from 'react'
import PageBanner from '../components/ui/PageBanner'
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect, useRef, useState } from "react"
import ProductCard from '../components/ui/Cards/ProductCard'
import ProductData from '../assets/Data/ProductData.json'
import { ChevronDown, Filter, Search } from 'lucide-react'
import { Icon } from '@iconify/react'



gsap.registerPlugin(ScrollTrigger);



const Shop = () => {
  return (
    <>
      <PageBanner
        title="Shop"
        currentPage="Shop"
      />
    </>
  )
}

export default Shop