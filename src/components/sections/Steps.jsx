
import React from 'react'
import StepCard from '../ui/Cards/StepCard'


const Steps = () => {
  return (
    <>
      <div className="container py-[8%] mx-auto px-4">
        <div className="text-center w-full mb-16">
          <span className="title-span">Steps</span>

          <h2 className="heading-1 mb-5">
            <span className="text-coffee"> 4 Easy Steps</span> <br />
            to Get Interior Design
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-10">
          <StepCard
            number="01"
            title="Request Sending"
            description="Send us your project request and requirements so we can understand your needs clearly."
          />

          <StepCard
            number="02"
            title="Project Planning"
            description="Our team carefully analyzes your idea and creates a structured plan to achieve the best results."
          />

          <StepCard
            number="03"
            title="Design Creating"
            description="We design a beautiful and functional solution tailored specifically for your business goals."
          />

          <StepCard
            number="04"
            title="Enjoying Work"
            description="Sit back and enjoy the final result as we deliver a polished and high-quality project."
          />
        </div>
      </div>
    </>
  )
}

export default Steps