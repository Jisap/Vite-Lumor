import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MainBtn from '../ui/Buttons/MainBtn'
import FeatureCard from '../ui/Cards/FeatureCard'
import featureImage1 from "/images/Index/Features/feature-image-01.jpg"
import featureImage2 from "/images/Index/Features/feature-image-02.jpg"
import featureImage3 from "/images/Index/Features/feature-image-03.jpg"
import featureImage4 from "/images/Index/Features/feature-image-04.jpg"
import featureImage5 from "/images/Index/Features/feature-image-05.jpg"
import featureImage6 from "/images/Index/Features/feature-image-06.jpg"
import featureImage7 from "/images/Index/Features/feature-image-07.jpg"

import { Bath, BedDouble, ChefHat, Flame, Lightbulb, Palette, Sofa, Square } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const featureData = [
  {
    image: featureImage1,
    icon: BedDouble,
    title: "BedRooms",
    description: "Comfortable and elegant bedroom designs that create a peaceful and relaxing environment for rest and rejuvenation."
  },
  {
    image: featureImage2,
    icon: ChefHat,
    title: "Kitchens",
    description: "Modern kitchens designed for functionality and style, combining smart layouts with beautiful finishes."
  },
  {
    image: featureImage3,
    icon: Lightbulb,
    title: "Lighting",
    description: "Creative lighting solutions that enhance mood, highlight interiors, and bring warmth to every space."
  },
  {
    image: featureImage4,
    icon: Square,
    title: "Windows",
    description: "Stylish window designs that maximize natural light while improving ventilation and aesthetic appeal."
  },
  {
    image: featureImage5,
    icon: Bath,
    title: "Bathrooms",
    description: "Luxury bathroom interiors that blend comfort, elegance, and modern functionality for a refreshing experience."
  },
  {
    image: featureImage6,
    icon: Palette,
    title: "Decoration",
    description: "Beautiful decorative elements that add personality, charm, and artistic expression to your living spaces."
  },
  {
    image: featureImage7,
    icon: Flame,
    title: "Fireplaces",
    description: "Elegant fireplaces designed to create a warm and inviting atmosphere in modern homes."
  },
  {
    image: featureImage1,
    icon: Sofa,
    title: "Living Rooms",
    description: "Sophisticated living room interiors crafted for comfort, style, and memorable moments with family and guests."
  }
];

const Features = () => {
  const featuresRef = useRef(null);

  useEffect(() => {
    const commonScrollTriggerProps = {
      toggleActions: "play none none reset",
    };

    const ctx = gsap.context(() => {
      // Animación para el encabezado (Título, subtítulo y párrafo)
      gsap.from(".feature-header-content > *", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".feature-header-content",
          start: "top 85%",
          ...commonScrollTriggerProps,
        },
      });

      // Animación para las tarjetas con stagger
      gsap.from(".feature-card-item", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1, // Entrada rápida y fluida
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".features-grid",
          start: "top 90%",
          ...commonScrollTriggerProps,
        },
      });
    }, featuresRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className='bg-light-yellow' ref={featuresRef}>
      <div className='container py-[8%] mx-auto px-4 space-y-10'>
        <div className='feature-content section-container lg:items-center!'>
          <div className='feature-header-content'>
            <span className='title-span'>
              Our Features
            </span>

            <h2 className='heading-1 mb-5'>
              <span className='text-coffee'>Modern ideas</span>
              <br />
              for home
            </h2>

            <p className='pera-text'>
              We are a team of passionate designers and developers who love to create beautiful and functional spaces.
            </p>
          </div>

          <MainBtn
            text="Read More"
            path="/work"
            className='bg-black! text-white!'
          />
        </div>

        <div className='features-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
          {featureData.map((feature, index) => (
            <div className="feature-card-item" key={index}>
              <FeatureCard
                image={feature.image}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Features