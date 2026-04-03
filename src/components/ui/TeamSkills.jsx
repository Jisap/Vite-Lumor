import React from 'react'

function TeamSkills({ skills }) {

  const skillEntries = Object.entries(skills[0]); // [["Management", "85%"], ["Analytics", "72%"], ...]

  return (
    <>
      <h3 className='text-2xl sm:text-3xl lg:text-4xl font-medium pb-6'>
        Skills
      </h3>

      <div className='space-y-6'>
        {skillEntries.map(([name, value], index) => (
          <div key={index}>
            <div className='flex justify-between mb-2'>
              <span className='font-semibold'>{name}</span>
              <span>{value}</span>
            </div>

            <div className='w-full h-2 bg-gray-200'>
              <div
                className='h-1 bg-[#9c7a5b]'
                style={{ width: value }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default TeamSkills