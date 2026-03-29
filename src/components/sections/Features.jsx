import React from 'react'
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




const Features = () => {
  return (
    <div className='bg-light-yellow'>
      <div className='container py-[8%] mx-auto px-4 space-y-10'>
        <div className='feature-content section-container lg:items-center!'>
          <div className=''>
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

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
          <FeatureCard
            image={featureImage1}
            icon={BedDouble}
            title="BedRooms"
            description="Comfortable and elegant bedroom designs that create a peaceful and relaxing environment for rest and rejuvenation.."
          />
          <FeatureCard
            image={featureImage2}
            icon={ChefHat}
            title="Kitchens"
            description="Modern kitchens designed for functionality and style, combining smart layouts with beautiful finishes."
          />
          <FeatureCard
            image={featureImage3}
            icon={Lightbulb}
            title="Lighting"
            description="Creative lighting solutions that enhance mood, highlight interiors, and bring warmth to every space."
          />
          <FeatureCard
            image={featureImage4}
            icon={Square}
            title="Windows"
            description="Stylish window designs that maximize natural light while improving ventilation and aesthetic appeal."
          />
          <FeatureCard
            image={featureImage5}
            icon={Bath}
            title="Bathrooms"
            description="Luxury bathroom interiors that blend comfort, elegance, and modern functionality for a refreshing experience."
          />
          <FeatureCard
            image={featureImage6}
            icon={Palette}
            title="Decoration"
            description="Beautiful decorative elements that add personality, charm, and artistic expression to your living spaces."
          />
          <FeatureCard
            image={featureImage7}
            icon={Flame}
            title="Fireplaces"
            description="Elegant fireplaces designed to create a warm and inviting atmosphere in modern homes."
          />
          <FeatureCard
            image={featureImage1}
            icon={Sofa}
            title="Living Rooms"
            description="Sophisticated living room interiors crafted for comfort, style, and memorable moments with family and guests."
          />
        </div>
      </div>
    </div>
  )
}

export default Features