import React from 'react'

const Input = ({type, onChange, className, label = "Change label" , placeholder ="Change Placeholder", value}) => {

    const basestyle = " px-4 py-2 outline-none border-b border-blue-500 w-full";

  return (
    <div className='mb-4'>
      {label && 
      <label htmlFor="" className='text-gray-700 text-lg'>{label}</label>
      }
        <input
        value={value}
        type={type}
        onChange={onChange}
        label={label}
        placeholder={placeholder}
        className={`${basestyle} ${className}`}  />
    </div>
  )
}

export default Input