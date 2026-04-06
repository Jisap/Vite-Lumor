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

  const [products, setProducts] = useState(ProductData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("latest");
  const [priceRange, setPriceRange] = useState(300);
  const [selectedTag, setSelectedTag] = useState("all");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1)
  const productPerPage = 9;

  const tags = ["All", "Discount", "Item", "Simple", "Smart", "Stock"];

  // Extract unique categories
  const allCategories = ["All", ...new Set(ProductData.flatMap((p) => p.categories.split(",")))];

  //Filtering & Sorting Logic
  useEffect(() => {
    let filtered = ProductData.filter((product) => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || product.categories.includes(selectedCategory);
      const matchesPrice = product.price <= priceRange;

      const matchesTag = selectedTag === "All" || product.categories.includes(selectedTag);

      return matchesSearch && matchesCategory && matchesTag && matchesPrice;
    });

    if (sortOption === "low-to-high") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "hight-to-low") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === "popularity") {
      filtered.sort((a, b) => b.id - a.id)
    }

    setProducts(filtered);
    setCurrentPage(1) // Reset to page 1 when filter.
  }, [searchTerm, selectedCategory, sortOption, priceRange, selectedTag])

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