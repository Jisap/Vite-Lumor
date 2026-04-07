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
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("latest");
  const [priceRange, setPriceRange] = useState(1000); // Sube el rango inicial si tus productos son caros
  const [selectedTag, setSelectedTag] = useState("All");

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

      const matchesTag = selectedTag === "All" || (product.tags && product.tags.includes(selectedTag));

      return matchesSearch && matchesCategory && matchesTag && matchesPrice;
    });

    if (sortOption === "low-to-high") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "high-to-low") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === "popularity") {
      filtered.sort((a, b) => b.id - a.id)
    }

    setProducts(filtered);
    setCurrentPage(1) // Reset to page 1 when filter.
  }, [searchTerm, selectedCategory, sortOption, priceRange, selectedTag]);

  const indexOfLastProduct = currentPage * productPerPage;                               // Indica dónde termina el "corte" del array (sin incluirlo). Ej: 2 * 9 = 18 
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;                       // Este número indica dónde empieza el "corte". Ej pag-2: 18 - 9 = 9
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);       // Extrae una parte del array sin modificarlo. Ej pag-2: products.slice(9, 18) — Obtienes los productos del índice 9 al 17.
  const totalPages = Math.ceil(products.length / productPerPage);                        // Total pages: Si tienes 20 productos y divides por 9, te da 2.22.Math.ceil(2.22) devuelve 3. Esto es correcto porque necesitas una tercera página para mostrar esos últimos 2 productos sobrantes.

  const handlePageChange = (page) => {                                                   // Handle page change
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const sidebarRef = useRef(null);
  const mainRef = useRef(null);
  const shopRef = useRef(null);

  // --- Sidebar animations (slide in from left) ---
  useEffect(() => {
    if (!sidebarRef.current) return;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(sidebarRef);

      gsap.from(q(".sidebar-box"), {
        x: -60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.18,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sidebarRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(q(".sidebar-title"), {
        x: -30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sidebarRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(q(".sidebar-content"), {
        x: -20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        delay: 0.35,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sidebarRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, sidebarRef);

    return () => ctx.revert();
  }, []);

  // --- Main content animations ---
  useEffect(() => {
    if (!mainRef.current) return;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(mainRef);

      // Top bar (results count + sort dropdown) — slides down
      gsap.from(q(".top-bar"), {
        y: -30,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // Product cards — stagger up
      gsap.from(q(".product-grid > *"), {
        y: 60,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: q(".product-grid"),
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // Pagination — fade + slide up
      gsap.from(q(".pagination"), {
        y: 40,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: q(".pagination"),
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });

      // Empty state — scale bounce
      gsap.from(q(".empty-state"), {
        scale: 0.9,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: q(".empty-state"),
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, mainRef);

    return () => ctx.revert();
  }, [currentProducts]);

  return (
    <>
      <PageBanner
        title="Shop"
        currentPage="Shop"
      />

      <div className='bg-light-yellow'>
        <div className='container mx-auto px-4 py-[8%]'>
          <div className='flex flex-col lg:flex-row gap-8'>

            {/* Main content */}
            <main ref={mainRef} className='w-full lg:w-3/4 order-1 lg:order-2'>
              <div className='flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 top-bar'>
                <p className='text-gray-500 italic'>
                  Showing {products.length > 0 ? indexOfFirstProduct + 1 : 0} - {Math.min(indexOfLastProduct, products.length)} of {products.length} results
                </p>

                <div className='relative group'>
                  <select
                    className='appearance-none bg-white border px-6 py-2 pr-10 rounded-shdow-sm outline-none cursor-pointer focus:ring-2 ring-teal-500/20'
                    onChange={(e) => setSortOption(e.target.value)}
                  >
                    <option value="latest">Sort by latest</option>
                    <option value="popularity">Sort by popularity</option>
                    <option value="low-to-high">Sort by price: low to high</option>
                    <option value="high-to-low">Sort by price: high to low</option>
                  </select>

                  <ChevronDown className='absolute right-3 top-3 text-gray-400 pointer-events-none' />
                </div>
              </div>

              {/* Product Grid */}
              {currentProducts.length > 0 ? (
                <>
                  <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-10 product-grid'>
                    {currentProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>

                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <div className='flex justify-center items-center mt-12 gap-2 pagination'>
                      <button
                        onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                        disabled={currentPage === 1}
                        className='p-2 border rounded-sm hover:bg-primary hover:text-white disabled:oapcity-30 transition-all cursor-pointer'
                      >
                        <Icon
                          icon="mdi:chevron-left"
                          width={24}
                        />
                      </button>

                      {[...Array(totalPages)].map((_, index) => (
                        <button
                          key={index + 1}
                          onClick={() => handlePageChange(index + 1)}
                          className={`
                            w-10 h-10 border rounded-sm transition-all cursor-pointer 
                            ${currentPage === index + 1
                              ? "bg-primary text-white border-primary"
                              : "bg-white text-gray-600 hover:border-primary hover:text-primary"
                            }
                          `}
                        >
                          {index + 1}
                        </button>
                      ))}

                      <button
                        onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className='p-2 border rounded-sm hover:bg-primary hover:text-white disabled:opacity-30 transition-all cursor-pointer'
                      >
                        <Icon
                          icon="mdi:chevron-right"
                          width={24}
                        />
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className='text-center py-20 bg-white rounded-xl shadow-inner empty-state'>
                  <Filter className='mx-auto text-gray-300 mb-4' size={48} />

                  <h3 className='text-xl font-medium text-gray-500'>
                    No products match your filters.
                  </h3>

                  <p className='text-gray-400 mt-2'>
                    Try adjusting your search or filters
                  </p>
                </div>
              )}
            </main>

            {/* sidebar */}
            <aside ref={sidebarRef} className='w-full lg:w-1/4 space-y-8 order-2 lg:order-1'>
              {/* Search */}
              <div className='bg-white p-6 rounded-sm shadow-sm sidebar-box'>
                <h3 className='text-xl font-medium mb-4 sidebar-title'>Search</h3>
                <div className='relative sidebar-content'>
                  <input
                    type="text"
                    placeholder='Search Products...'
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className='w-full border p-2 pl-10 rounded-md outline-none focus:border-primary'
                  />

                  <Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
                </div>
              </div>

              {/* Categories */}
              <div className='bg-white p-6 rounded-sm shadow-sm sidebar-box'>
                <h3 className='text-xl font-medium mb-4 sidebar-title'>
                  Categories
                </h3>

                <ul className='space-y-2 sidebar-content'>
                  {allCategories.map(cat => (
                    <li key={cat}>
                      <button
                        onClick={() => setSelectedCategory(cat)}
                        className={`cursor-pointer transition-colors
                           ${selectedCategory === cat
                            ? "text-primary font-bold"
                            : "text-gray-600 hover:text-black"
                          }`}
                      >
                        {cat}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price filter */}
              <div className='bg-white p-6 rounded-sm shadow-sm sidebar-box'>
                <h3 className='text-xl font-medium mb-4 sidebar-title'>
                  Price
                </h3>

                <div className='sidebar-content'>
                  <input
                    type="range"
                    min="0"
                    max="300"
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className='w-full accent-primary'
                  />

                  <div className='flex justify-between text-sm mt-2 font-medium'>
                    <span>$0</span>
                    <span>Max: ${priceRange}</span>
                  </div>
                </div>
              </div>

              {/* Tag Filter */}
              <div className='bg-white p-6 rounded-sm shadow-sm sidebar-box'>
                <h3 className='text-xl font-medium mb-4 sidebar-title'>
                  Tags
                </h3>

                <div className='flex flex-wrap gap-2 sidebar-content'>
                  {tags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(tag)}
                      className={`
                        text-sm border px-3 py-1 transition-all duration-300 cursor-pointer
                        ${selectedTag === tag
                          ? "bg-primary text-white border-primary"
                          : "border-gray-200 text-gray-500 hover:border-primary hover:text-primary"
                        }
                      `}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  )
}

export default Shop