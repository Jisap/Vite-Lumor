import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import SocialIcons from "../../ui/SocialIcons"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {

  const footerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Footer items staggered animation
      const items = footerRef.current.querySelectorAll(".animate-footer-item");
      gsap.from(items, {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse"
        }
      });

      // Bottom bar animation
      gsap.from(".animate-footer-bottom", {
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".animate-footer-bottom",
          start: "top 95%",
          toggleActions: "play none none reverse"
        }
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={footerRef} className="bg-primary pt-[8%] px-4">
      <footer className="container pb-10 mx-auto text-white grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-10 border-b border-gray-50/10">
        {/* Working hours */}
        <div className="footer-item animate-footer-item">
          <h3 className="text-xl font-semibold mb-6">Working Hours</h3>

          <ul className="space-y-3">
            <li>
              <span className="text-muted font-light">Mon-Fri: 9 AM - 6 PM</span>
            </li>
            <li>
              <span className="text-muted font-light">Sat: 9 AM - 2 PM</span>
            </li>
            <li>
              <span className="text-muted font-light">Sun: Closed</span>
            </li>
          </ul>
        </div>

        <div className="footer-item animate-footer-item">
          <h3 className="text-xl font-semibold mb-6">Office</h3>

          <ul>
            <li>
              <p className="text-muted font-light pb-5">
                123 Rue de la Paix, 75001 Paris, France
              </p>
            </li>

            <li>
              <Link to="#" className="text-muted font-light pb-2 block text-lg hover:underline transition-all duration-300 hover:text-white">
                info@example.com
              </Link>

              <span className="text-xl tracking-tight">
                +33 1 23 45 67 89
              </span>
            </li>
          </ul>
        </div>

        <div className="footer-item links animate-footer-item">
          <h3 className="text-xl font-semibold mb-6">Links</h3>

          <ul className="space-y-3 w-fit">
            <li className="w-fit">
              <Link to="/" className="text-muted font-light pb-2 block text-lg transition-all duration-300 hover:text-white">
                Home
              </Link>
            </li>

            <li className="w-fit">
              <Link to="/blog" className="text-muted font-light pb-2 block text-lg transition-all duration-300 hover:text-white">
                Blog
              </Link>
            </li>

            <li className="w-fit">
              <Link to="/shop" className="text-muted font-light pb-2 block text-lg transition-all duration-300 hover:text-white">
                Shop
              </Link>
            </li>

            <li className="w-fit">
              <Link to="/about" className="text-muted font-light pb-2 block text-lg transition-all duration-300 hover:text-white">
                About
              </Link>
            </li>

            <li className="w-fit">
              <Link to="/contact" className="text-muted font-light pb-2 block text-lg transition-all duration-300 hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div className="footer-item social animate-footer-item">
          <h3 className="text-xl font-semibold mb-6">Get in Touch</h3>

          <SocialIcons />
        </div>
      </footer>

      {/* Footer bottom */}
      <div className="container py-6 text-muted mx-auto text-center animate-footer-bottom">
        <p className="link-bottom">
          <Link to="#" className="text-white font-semibold cursor-pointer">
            Lumor
          </Link>
          {" "}&copy;{" "}
          {new Date().getFullYear()}
          {" "}
          All Rights Reserved
        </p>
      </div>
    </div>
  )
}

export default Footer