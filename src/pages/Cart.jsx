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

  const subtotal = cart.reduce((acc, item) => {
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

      <div ref={cartRef} className='container mx-auto py-[8%] px-4 wishlist-section'>
        {cart.length === 0 ? (
          <p className='text-center text-lg bg-gray-50 shadow-md py-5 wishlist-empty'>
            Cart is empty
          </p>
        ) : (
          <>
            <div className='hidden lg:block overscroll-x-auto'>
              <table className='w-full border-collapse'>
                <thead className='bg-black'>
                  <tr className='text-center text-white'>
                    <th className='p-4 cart-th'></th>
                    <th className='p-4 text-left font-medium cart-th'>Product</th>
                    <th className='p-4 font-medium cart-th'>Price</th>
                    <th className='p-4 font-medium cart-th'>Quantity</th>
                    <th className='p-4 font-medium cart-th'>Status</th>
                    <th className='p-4 font-medium cart-th'>Total</th>
                  </tr>
                </thead>

                <tbody>
                  {cart.map((item) => {
                    const quantity = qty[item.id] || 1;

                    return (
                      <tr key={item.id} className='border-b cart-item'>
                        <td className='text-center'>
                          <button
                            className='cursor-pointer'
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Icon icon="mdi:close" width="18" />
                          </button>
                        </td>

                        <td className='flex items-center gap-4 py-6'>
                          <img
                            src={item.image1}
                            alt={item.name}
                            className='w-20 h-20 object-cover'
                          />

                          <p className='font-semibold text-lg'>
                            {item.title}
                          </p>
                        </td>

                        <td className='text-center'>
                          ${item.price}
                        </td>

                        <td className='text-center'>
                          <div className='flex justify-center items-center gap-3'>
                            <button
                              className='border border-gray-200 p-2 cursor-pointer'
                              onClick={() => decrease(item.id)}
                            >
                              <Minus size={14} />
                            </button>

                            <span className='w-10 text-center'>
                              {quantity}
                            </span>

                            <button
                              className='border border-gray-200 p-2 cursor-pointer'
                              onClick={() => increase(item.id)}
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </td>

                        <td className='text-green-600 text-center'>
                          In Stock
                        </td>

                        <td className='text-center font-semibold'>
                          ${item.price * quantity}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default Cart