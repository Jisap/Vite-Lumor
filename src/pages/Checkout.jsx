
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

      <div ref={checkoutRef} className='container mx-auto py-[8%] px-4'>
        <div className='bg-gray-50 border-t-4 border-black p-4 text-sm mb-10 returning-customer'>
          Returning customer? <Link to="/" className='cursor-pointer underline'>Click here to login</Link>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
          <div className='lg:col-span-7 billing-form'>
            <h2 className='text-2xl font-bold mb-6'>Billing Details</h2>

            <form className='space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm mb-2'>First name
                    <span className='text-red-500'>*</span>
                  </label>

                  <input
                    type="text"
                    className='w-full border border-gray-300 p-3 rounded-sm outline-none focus:border-black'
                    required
                  />
                </div>

                <div>
                  <label className='block text-sm mb-2'>Last name
                    <span className='text-red-500'>*</span>
                  </label>

                  <input
                    type="text"
                    className='w-full border border-gray-300 p-3 rounded-sm outline-none focus:border-black'
                    required
                  />
                </div>
              </div>

              <div>
                <label className='block text-sm mb-2'>Company name (optional)
                </label>

                <input
                  type="text"
                  className='w-full border border-gray-300 p-3 rounded-sm outline-none focus:border-black'
                />
              </div>

              <div>
                <label className='block text-sm mb-2'>
                  Country / Region
                  <span className='text-red-500'>*</span>
                </label>

                <select
                  className='w-full border border-gray-300 p-3 rounded-sm outline-none bg-white'
                  required
                >
                  <option value="">Select a country</option>
                  {data.countries.map((country, index) => (
                    <option key={index} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className='block text-sm mb-2'>
                  Street address
                  <span className='text-red-500'>*</span>
                </label>

                <input
                  type='text'
                  placeholder='House number and street name'
                  className='w-full border border-gray-300 p-3 rounded-sm outline-none focus:border-black mb-4'
                  required
                />

                <input
                  type="text"
                  placeholder='Apartment, suite, unit, etc. (optional)'
                  className='w-full border border-gray-300 p-3 rounded-sm outline-none focus:border-black'
                />
              </div>

              <div>
                <label className='block text-sm mb-2'>
                  Town / City
                  <span className='text-red-500'>*</span>
                </label>

                <input
                  type='text'
                  placeholder='Town / City'
                  className='w-full border border-gray-300 p-3 rounded-sm outline-none focus:border-black'
                  required
                />
              </div>
            </form>
          </div>

          <div className='lg:col-span-5 checkout-right'>
            <div className='flex items-center gap-2 mb-4'>
              <input type="checkbox" id="ship-different" />
              <label
                htmlFor="ship-different"
                className='font-bold cursor-pointer'
              >
                Ship to a different address?
              </label>
            </div>

            <div className='mb-8'>
              <label className='block text-sm mb-2'>Order notes (optional)</label>
              <textarea
                placeholder='Notes about your order, e.g. special instructions for delivery'
                className='w-full border border-gray-300 p-3 rounded-sm h-32 outline-none focus:border-black'
                rows="4"
              />
            </div>

            <div className='border border-gray-200 p-6 rounded-sm'>
              <h3 className='text-xl font-bold mb-4 border-b border-gray-200 pb-4'>
                Your Order
              </h3>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Checkout