
import PageBanner from '../components/ui/PageBanner';
import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCart } from '../hooks/useCart';
import MainBtn from '../components/ui/Buttons/MainBtn';
import { Link } from 'react-router-dom';

import data from "../assets/Data";


gsap.registerPlugin(ScrollTrigger);

const Checkout = () => {

  const { cart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("bank_transfer");

  const subtotal = cart.reduce((acc, item) => acc + item.price, 0);
  const checkoutRef = useRef();

  useEffect(() => {
    if (!checkoutRef.current) return;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(checkoutRef);

      gsap.from(q(".returning-customer"), {
        y: -30,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: q(".returning-customer"),
          start: "top 90%",
          toggleActions: "play none none reverse"
        }
      });

      gsap.from(q(".billing-form h2, .billing-form label, .billing-form input, .billing-form select, .billing-form textarea"), {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: q(".billing-form"),
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });

      gsap.from(q(".checkout-right > *"), {
        x: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: q(".checkout-right"),
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });

      gsap.from(q(".checkout-right > *"), {
        x: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: q(".checkout-right"),
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      })

      gsap.from(q(".checkout-table tbody tr"), {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: q(".checkout-table"),
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      })

      gsap.from(q(".payment-options input, .payment-options label, payment-options button"), {
        scale: 0.95,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: q(".payment-options"),
          start: "top 90%",
          toggleActions: "play none none reverse"
        }
      })
    }, checkoutRef);

    return () => ctx.revert();
  }, [cart])


  return (
    <>
      <PageBanner
        title="Checkout"
        currentPage="Checkout"
      />
    </>
  )
}

export default Checkout