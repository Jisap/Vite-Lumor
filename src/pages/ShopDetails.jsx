import PageBanner from '../components/ui/PageBanner';
import { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProductData from '../assets/Data/ProductData.json';
import MainBtn from '../components/ui/Buttons/MainBtn';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css';
import ProductCard from '../components/ui/Cards/ProductCard';
import { useCart } from '../hooks/useCart';




gsap.registerPlugin(ScrollTrigger);

const ShopDetails = () => {
  const { id } = useParams();
  const product = ProductData.find((p) => p.id === parseInt(id));

  const shopRef = useRef();
  const headingRef = useRef();
  const productRef = useRef();
  const peraRef = useRef();
  const { addToCart } = useCart();

  if (!product) return <p className='p-6 text-xl'>Product not found</p>;

  const [qty, setQty] = useState(1);

  const increase = () => {
    setQty(qty + 1)
  }

  const decrease = () => {
    if (qty > 1) {
      setQty(qty - 1)
    }
  }

  useEffect(() => {
    // Si la referencia no existe, no hacemos nada (evita errores si el contenido aún no se ha renderizado)
    if (!shopRef.current) return;

    const ctx = gsap.context(() => {
      // Usamos el selector directo gracias al scope del contexto (shopRef)
      gsap.from(".product-card", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: shopRef.current,
          start: 'top 85%',
          toggleActions: "play none none reverse"
        },
      });
    }, shopRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    // Si la referencia no existe, no hacemos nada
    if (!headingRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 90%',
          toggleActions: "play none none reverse"
        },
      });
    }, headingRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    // Si la referencia no existe, no hacemos nada
    if (!productRef.current) return;

    // Pasamos productRef como el scope del contexto
    const ctx = gsap.context(() => {
      // Ahora podemos usar selectores directamente gracias al scope
      const imageSection = ".product-image";
      const contentSection = ".product-content";
      const thumbWrapper = ".thumbnail-list";
      const thumbs = ".thumb-item";

      gsap.from(imageSection, {
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: imageSection,
          start: 'top 85%',
          toggleActions: "play none none reverse"
        },
      });

      // Seleccionamos items dentro del scope automáticamente
      const contentItems = "h2, p, .quantity, button, ul li";

      gsap.from(contentItems, {
        x: 50,
        opacity: 0,
        stagger: 0.15,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentSection, // Usamos la sección como trigger
          start: 'top 85%',
          toggleActions: "play none none reverse"
        },
      });

      // Corregido: Eliminamos el cuarto argumento 'productRef'
      gsap.fromTo(thumbs,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: thumbWrapper,
            start: 'top 90%',
            toggleActions: "play none none reverse"
          },
        }
      );
    }, productRef); // <--- El scope se define aquí

    return () => ctx.revert(); // Limpieza perfecta
  }, []);



  return (
    <>
      <PageBanner
        title="Shop Details"
        currentPage="Shop Details"
      />
    </>
  )
}

export default ShopDetails