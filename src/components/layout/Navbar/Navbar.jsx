import React, { useEffect, useState } from 'react'
import Logo from './Logo'
import { Link, NavLink, useLocation } from 'react-router-dom'
import NavDrop from './NavDrop';
import Navmenu from './Navmenu';
import { ShoppingBag, TextAlignJustify, User } from 'lucide-react';
import MobileMenu from './MobileMenu';

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  {
    name: "Shop",
    submenu: [
      { name: "Product List", path: "/shop" },
      { name: "Product Single", path: "/product/1" },
      { name: "Cart", path: "/cart" },
      { name: "Checkout", path: "/checkout" },
      { name: "Wishlist Page", path: "/wishlist" },
    ],
  },
  { name: "Blogs", path: "/blogs" },
  { name: "Contact", path: "/contact" },
  {
    name: "Pages",
    submenu: [
      { name: "Services", path: "/services" },
      { name: "Teams", path: "/team" },
      { name: "FAQs", path: "/faqs" },
      { name: "404 Page", path: "/page404" },
    ],
  },
];

const Navbar = () => {

  const [menuOpen, setMenuOpen] = useState(false);
  const [openAuth, setOpenAuth] = useState(false);
  const [scroll, setScroll] = useState(false);

  const location = useLocation();
  const is404 = location.pathname === '/page404';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScroll(true)
      } else {
        setScroll(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <div
        className={`
          w-full z-10 fixed top-0 left-0 transition-all duration-300 bg-black! 
          ${is404
            ? "bg-black text-white"
            : scroll
              ? 'bg-black shadow-lg'
              : 'bg-transparent'
          }  
        `}
      >
        <div className='container mx-auto flex justify-between items-center h-22 px-4'>
          <NavLink to={'/'}>
            <Logo />
          </NavLink>


          {/* Desktop Navigation */}
          <div className='centered-row justify-center gap-12'>
            <div className='hidden lg:flex items-center gap-8'>
              {navLinks.map((item, index) => (
                item.submenu ? (
                  <NavDrop key={index} item={item} />
                ) : (
                  <Navmenu key={index} name={item.name} path={item.path} />
                )
              ))}
            </div>

            {/* Nav Icons */}
            <div className='nav-icons flex items-center gap-3'>
              <button onClick={() => setOpenAuth(false)} className='user cursor-pointer'>
                <User size={24} className='text-white cursor-pointer' />
              </button>

              <Link to="/cart" className="relative">
                <ShoppingBag size={24} className="text-white cursor-pointer" />
                <span className='card-count'>
                  0
                </span>
              </Link>

              <button
                className='relative ms-2 lg:hidden block'
                onClick={() => setMenuOpen(true)}
              >
                <TextAlignJustify size={24} className='text-white cursor-pointer' />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        navLinks={navLinks}
        className="lg:block hidden"
      />
    </>
  )
}

export default Navbar