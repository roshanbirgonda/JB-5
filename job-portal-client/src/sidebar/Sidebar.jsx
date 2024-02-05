import React from 'react'
import Location from './Location'
import Salary from './Salary'
import Salary2 from './Salary2'

const Sidebar = ({handleChange, handleClick}) => {
  return (
    <div className='space-y-5'>
        <h4 className='text-lg font-bold mb-2'>Filters</h4>

        <Location handleChange={handleChange}/>
        <Salary handleChange={handleChange} handleClick={handleClick}/>
        <Salary2 handleChange={handleChange} handleClick={handleClick}/>
    </div>
  )
}

export default Sidebar
