import React from 'react'

const Form = ({children, className, onSubmit, formname ="Change formname", parentClassName ="flex justify-center items-center"}) => {

    const basestyle = "w-75 bg-blend-soft-light shadow-2xl p-10 rounded w-100";
  return (
    <div className={`h-screen ${parentClassName}`}>
        
        <form action="" 
        className={`${basestyle} ${className}`} onSubmit={onSubmit}>
             <p className='text-center mb-8 text-xl text-gray-600'>{formname}</p>
            {children}
        </form>
    </div>
  )
}

export default Form