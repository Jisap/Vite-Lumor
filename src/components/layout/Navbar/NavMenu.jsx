import React from 'react'
import { NavLink } from 'react-router-dom'

const Navmenu = ({ name, path }) => {
  return (
    <>
      <NavLink to={path} className='text-sm md:text-[16px] font-medium text-white nav-link'>
        {name}
      </NavLink>
    </>
  )
}

export default Navmenu