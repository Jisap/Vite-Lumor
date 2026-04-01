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

  const { Cart, removeFromCart } = useCart();
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