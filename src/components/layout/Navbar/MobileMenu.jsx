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
          z-50 fixed top-0 left-0 w-full bg-[#050505] text-white overflow-hidden transition-all duration-700
          ${menuOpen ? "h-screen opacity-100" : "h-0 opacity-0"}  
        `}
      >
        <div className="absolute inset-0 bg-radial-at-t from-cyan-brand/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="relative h-full flex flex-col px-[6%] md:px-[8%]">

        <div className="flex justify-between items-center py-6 border-b border-gray-50/10">
          <Logo />
          <button
            onClick={() => setMenuOpen(false)}
            className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white transition-all duration-300 hover:bg-white/10"
          >
            <span className="text-sm font-medium uppercase tracking-widest">Close</span>
            <X size={20} className="transition-transform duration-500 group-hover:rotate-90" />
          </button>
        </div>

        <div className="flex flex-col items-start gap-1 mt-10 w-full px-4">
          {navLinks.map((item, index) => (
            <div key={index} className="w-full">
              {item.submenu
                ? (
                  <div className="relative w-full">
                    <button
                      onClick={() => handleMenuClick(index)}
                      className={`flex items-center justify-between w-full py-4 text-left font-medium transition-colors duration-300
                        ${activeMenu === index ? "text-white" : "text-gray-400 hover:text-white"}`}
                    >
                      <span className="text-2xl tracking-tight">{item.name}</span>
                      <ChevronDown size={20} className={`transition-transform duration-500 ${activeMenu === index ? "rotate-180 text-cyan-brand" : "text-gray-500"}`} />
                    </button>
                  </div>
                ) : (
                  <NavLink
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) => `
                      block py-4 text-2xl font-medium tracking-tight transition-all duration-300
                      ${isActive ? "text-cyan-brand" : "text-gray-400 hover:text-white hover:translate-x-2"}
                    `}
                  >
                    {item.name}
                  </NavLink>
                )}

              {item.submenu && (
                <div className={`overflow-hidden transition-all duration-500 ease-in-out border-l border-gray-800 ml-2 pl-6
                    ${activeMenu === index ? "max-h-[500px] opacity-100 mb-4" : "max-h-0 opacity-0"}`}
                >
                  <div className="flex flex-col gap-2 py-2">
                    {item.submenu.map((sub, i) => (
                      <NavLink
                        key={i}
                        to={sub.path}
                        onClick={() => setMenuOpen(false)}
                        className={({ isActive }) => `
                          relative py-3 group flex items-center gap-3 transition-all duration-300
                          ${isActive ? "text-white" : "text-gray-400 hover:text-white hover:translate-x-1"}
                        `}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full transition-all duration-300 
                          ${activeMenu === index ? "scale-100 opacity-100" : "scale-0 opacity-0"}
                          bg-cyan-brand shadow-[0_0_8px_rgba(0,164,178,0.6)]`} 
                        />
                        <span className="text-lg font-light tracking-wide">{sub.name}</span>
                      </NavLink>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <hr className="mt-8 text-gray-50/20" />

        <ul className="flex items-center gap-4 py-8">
          {[
            { Icon: Facebook, color: "from-blue-600 to-blue-400" },
            { Icon: Instagram, color: "from-cyan-brand via-blue-500 to-cyan-brand" },
            { Icon: Twitter, color: "from-sky-500 to-blue-400" },
            { Icon: Dribbble, color: "from-cyan-brand to-blue-400" }
          ].map((social, i) => (
            <li key={i}>
              <Link 
                to="/" 
                className={`p-3 rounded-full bg-linear-to-tr ${social.color} transition-all duration-500 hover:scale-110 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] inline-block`}
              >
                <social.Icon className="text-white" size={18} />
              </Link>
            </li>
          ))}
        </ul>

        <div className="absolute bottom-5 left-0 w-full text-center space-y-4">
          <p className="text-sm text-gray-400 flex items-center justify-center gap-1">
            <Copyright size={16} />
            <span>
              {year} Lumor. All Rights Reserved
            </span>
          </p>
        </div>
        </div>
      </div>
    </>
  )
}

export default MobileMenu