import React from 'react'
import { NavLink } from 'react-router-dom'

const Navmenu = ({ name, path }) => {
  return (
    <>
      <NavLink to={path} className='text-sm md:text-[16px] font-medium text-white group'>
        <span className='nav-link'>{name}</span>
      </NavLink>
    </>
  )
}

export default Navmenu