import { ChevronDown, Copyright, Dribbble, Facebook, Instagram, Twitter, X } from "lucide-react"
import { Link, NavLink } from "react-router-dom"
import Logo from "./Logo"
import { useState } from "react";



const MobileMenu = ({ menuOpen, setMenuOpen, navLinks }) => {

  const [activeMenu, setActiveMenu] = useState(null);
  const year = new Date().getFullYear();

  const handleMenuClick = (index) => {
    setActiveMenu(activeMenu === index ? null : index);
  };


  return (
    <>
      <div
        className={`
          z-50 fixed top-0 left-0 w-full bg-black text-white overflow-hidden transition-all duration-500 px-[2%] md:px-[8%] xl:px-[12%]
          ${menuOpen ? "h-screen opacity-100" : "h-0 opacity-0"}  
        `}
      >
        <div className="flex justify-between items-center py-5 border-b border-gray-50/20">
          <Logo />
          <div>
            <button
              onClick={() => setMenuOpen(false)}
              className="text-white flex gap-2"
            >
              <span>Close</span>
              <X size={25} />
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center gap-6 text-xl mt-10">
          {navLinks.map((item, index) => (
            <div key={index} className="w-full text-center">
              {item.submenu
                ? (
                  <div className="relative">
                    <button
                      onClick={() => handleMenuClick(index)}
                      className="flex items-center justify-center gap-2 w-full text-white relative ms-3"
                    >
                      {item.name}
                      <ChevronDown className={`transition-transform duration-300 ${activeMenu === index ? "rotate-180" : ""}`} />
                    </button>
                  </div>
                ) : (
                  <NavLink
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                    className="block"
                  >
                    {item.name}
                  </NavLink>
                )}

              {item.submenu && (
                <div className={`overflow-hidden transition-all duration-500
                    ${activeMenu === index ? "max-h-60-mt-4" : "max-h-0"}`}
                >
                  <div className="flex flex-col gap-3">
                    <NavLink
                      key={i}
                      to={sub.path}
                      onClick={() => setMenuOpen(false)}
                      className="text-gray-300 hover:text-white"
                    >
                      {sub.name}
                    </NavLink>
                  </div>
                </div>
              )}
            </div>

          ))}
        </div>
      </div>
    </>
  )
}

export default MobileMenu