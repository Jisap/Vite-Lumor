import React from 'react'
import MainBtn from '../ui/Buttons/MainBtn'

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
      </div>
    </div>
  )
}

export default Features