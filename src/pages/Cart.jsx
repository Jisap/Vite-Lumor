import { useEffect, useRef, useState } from 'react'
import PageBanner from '../components/ui/PageBanner'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Icon } from '@iconify/react';
import { useCart } from '../hooks/useCart';
import { Minus, Plus } from 'lucide-react';
import MainBtn from '../components/ui/Buttons/MainBtn';

gsap.registerPlugin(ScrollTrigger);



const Cart = () => {

  const { cart, removeFromCart } = useCart();
  const [qty, setQty] = useState({});

  const increase = (id) => {
    setQty((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) < 5
        ? (prev[id] || 1) + 1
        : 5
    }))
  }

  const decrease = (id) => {
    setQty((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) > 1
        ? prev[id] - 1
        : 1
    }));
  };

  const subtotal = Cart.reduce((acc, item) => {
    return acc + (item.price * (qty[item.id] || 1));
  }, 0);

  const cartRef = useRef();

  useEffect(() => {
    if (!cartRef.current) return;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(cartRef);

      gsap.from(q('.cart-item'), {
        y: 60,
        opacity: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: q(".cart-section"),
          start: 'top 85%',
          toggleActions: "play none none reverse"
        },
      });

      gsap.from(q('.cart-empty'), {
        scale: 0.9,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: q(".cart-empty"),
          start: 'top 85%',
          toggleActions: "play none none reverse"
        },
      });

      gsap.from(q('.cart-actions'), {
        y: 50,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: q(".cart-actions"),
          start: 'top 90%',
          toggleActions: "play none none reverse"
        },
      });

      gsap.from(q('.cart-btn'), {
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.2,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: q(".cart-btn"),
          start: 'top 90%',
          toggleActions: "play none none reverse"
        },
      });

      gsap.from(q('.cart-head'), {
        y: -40,
        opacity: 0,
        duration: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: q(".cart-head"),
          start: 'top 90%',
          toggleActions: "play none none reverse"
        },
      });

      gsap.from(q('.cart-th'), {
        x: -30,
        opacity: 0,
        duration: 0.4,
        stagger: 0.15,

        ease: "power3.out",
        scrollTrigger: {
          trigger: q(".cart-th"),
          start: 'top 90%',
          toggleActions: "play none none reverse"
        },
      });
    }, cartRef);

    return () => ctx.revert();
  }, [cart]);

  return (
    <>
      <PageBanner
        title="Cart"
        currentPage="Cart"
      />
    </>
  )
}

export default Cart