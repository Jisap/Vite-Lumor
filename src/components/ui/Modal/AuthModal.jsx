import { ArrowRight, Lock, Mail, User, X } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';

const AuthModal = ({ isOpen, onClose }) => {

  const [isLogin, setIsLogin] = useState(true);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  return (
    <>
      <div className={`
        fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ease-in-out
        ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}    
      `}
      >
        {/* Backdrop with blur */}
        <div className='absolute inset-0 bg-black/80 backdrop-blur-md' onClick={onClose}></div>

        {/* Modal Card */}
        <div
          className={`relative w-full max-w-md bg-[#171717] rounded-[30px] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-500 ease-out transform
            ${isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-10"}    
          `}
        >
          <div className='absolute -top-24 -left-24 w-48 h-48 bg-cyan-brand/10 rounded-full blur-[80px] pointer-events-none'></div>
          <div className='absolute -bottom-24 -right-24 w-48 h-48 bg-cyan-brand/10 rounded-full blur-[80px] pointer-events-none'></div>

          <button
            onClick={onClose}
            className='absolute top-6 right-6 text-gray-500 hover:text-white transition-colors z-20'
          >
            <X size={20} />
          </button>

          <div className='relative z-10 p-8'>
            <header className='text-center mb-8'>
              <h2 className='text-3xl font-bold text-white tracking-tight'>
                {isLogin ? "Welcome Back" : "Join Us"}
              </h2>

              <p className='text-gray-400 text-sm mt-2'>
                {isLogin ? "Login to access your dashboard" : "Create an account to get started"}
              </p>
            </header>

            <form className='space-y-4' onSubmit={(e) => e.preventDefault()}>
              <InputGroup
                icon={<User size={18} />}
                placeholder="Username"
                type="text"
              />

              <div className={`
                transition-all duration-300 ease-in-out overflow-hidden
                ${isLogin ? "max-h-0 opacity-0" : "max-h-20 opacity-100 mt-4"}
                `}
              >
                <InputGroup
                  icon={<Mail size={18} />}
                  placeholder="Email Address"
                  type="email"
                />
              </div>

              <InputGroup
                icon={<Lock size={18} />}
                placeholder="Password"
                type="password"
              />

              <button className='group relative w-full mt-6 py-4 bg-white text-black font-bold rounded-2xl overflow-hidden transition-all active:scale-[0.98]'>
                <div className='absolute inset-0 bg-linear-to-r from-cyan-brand to-cyan-brand/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>

                <span className='relative z-10 flex items-center justify-center gap-2'>
                  {isLogin ? "Sign In" : "Create Account"}
                  <ArrowRight size={18} className='transition-transform group-hover:translate-x-1' />
                </span>
              </button>
            </form>

            <footer className='mt-8 text-center'>
              <p className='text-gray-400 text-sm'>
                {isLogin ? "Don't have an account?" : "Already have an account?"}

                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className='ml-2 text-cyan-brand font-semibold hover:underline transition-all'
                >
                  {isLogin ? "Sign Up" : "Log In"}
                </button>
              </p>
            </footer>
          </div>
        </div>
      </div>
    </>
  )
}

const InputGroup = ({ icon, ...props }) => (
  <div className='flex items-center gap-3 px-4 py-4 bg-[#0a0a0a] rounded-2xl border border-white/5 focus-within:border-white/20 focus-within-ring-1 ring-white/10 transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] group'>
    <div className='text-gray-500 group-focus:text-white transition-colors'>
      {icon}
    </div>

    <input
      {...props}
      className='bg-transparent border-none outline-none w-full text-white placeholder-gray-600 text-sm'
    />
  </div>
)

export default AuthModal