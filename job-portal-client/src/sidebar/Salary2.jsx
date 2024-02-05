import React from 'react'
import InputField from '../components/InputField'

const Salary2 = ({handleChange}) => {
  return (
    <div>
      <h3 className='text-lg font-medium mb-2'>Salary Range</h3>

        <label className='sidebar-label-container'>
            <input type="radio" name='test' id='test' value="" onChange={handleChange} />
            <span className='checkmark'></span>All
        </label>

        {<InputField handleChange={handleChange} value="50" title="30k-50k" name="test" />}
        {<InputField handleChange={handleChange} value="70" title="50k-70k" name="test" />}
        {<InputField handleChange={handleChange} value="90" title="70k-90k" name="test" />}
        {<InputField handleChange={handleChange} value="150" title="90k-150k" name="test" />}

      
    </div>
  )
}

export default Salary2
