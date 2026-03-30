import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import client1 from "/images/Index/Brand/client-1-copyright.webp";
import client2 from "/images/Index/Brand/client-2-copyright.webp";
import client3 from "/images/Index/Brand/client-3-copyright.webp";
import client4 from "/images/Index/Brand/client-4-copyright.webp";
import client5 from "/images/Index/Brand/client-5-copyright.webp";
import client6 from "/images/Index/Brand/client-6-copyright.webp";

gsap.registerPlugin(ScrollTrigger);

const Brands = () => {
  const brandsRef = useRef();

  const clients = [
    { id: 1, image: client1 },
    { id: 2, image: client2 },
    { id: 3, image: client3 },
    { id: 4, image: client4 },
    { id: 5, image: client5 },
    { id: 6, image: client6 },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const brandDivs = Array.from(brandsRef.current.querySelectorAll("div.bg-white"));

      gsap.set(brandDivs, { opacity: 0, scale: 0.85, filter: "blur(4px)" });

      brandDivs.forEach((div, i) => {
        const fromX = i % 2 === 0 ? -20 : 20;    // Pares vienen de la izquierda, impares de la derecha, coordina el conjunto sin que parezca un efecto de lista

        gsap.set(div, { opacity: 0, scale: 0.85, filter: "blur(4px)", x: fromX }); // Primero defines el estado inicial completo, incluyendo x

        gsap.to(div, {                           // Luego animas hacia el estado final
          opacity: 0.2,
          scale: 1,                              // Aparecen creciendo sutilmente
          x: 0,
          filter: "blur(0px)",                   // Se "enfocan" al entrar
          duration: 0.6,
          delay: i * 0.08,                       // stagger rápido
          ease: "power2.out",
          scrollTrigger: {
            trigger: brandsRef.current,
            start: "top 90%",
            toggleActions: "play none none reset",
          },
        });

      });

      // Hover
      brandDivs.forEach((div) => {
        div.addEventListener("mouseenter", () => {
          gsap.to(div, { opacity: 1, scale: 1.05, duration: 0.25, ease: "power1.out" });
        });
        div.addEventListener("mouseleave", () => {
          gsap.to(div, { opacity: 0.2, scale: 1, duration: 0.25, ease: "power1.out" });
        });
      });
    }, brandsRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={brandsRef}
      className="container mx-auto grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-6 gap-10 pb-[8%]"
    >
      {clients.map((client) => (
        <div
          key={client.id}
          // 👇 Quitamos opacity-20 de Tailwind, GSAP lo maneja
          className="bg-white h-20 shadow hover:shadow-lg transition-all duration-300 rounded-sm w-full"
        >
          <img
            src={client.image}
            alt={client.name}
            className="section-image object-contain lg:object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default Brands;