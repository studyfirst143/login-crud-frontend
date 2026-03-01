import React from 'react'

const Button = ({children, variant = "primary", onClick, type, className}) => {

const basestyle = "px-10 py-2 mb-2 rounded text-white  mt-5";
const ButtonVariants = {
    primary : "bg-blue-700 hover:bg-blue-900  ",
    warning : "bg-yellow-500 hover:bg-yellow-600 hover:bg-yellow-600  ",
    danger: "bg-red-700 hover:bg-red-900",

}

  return (


<>
<button 
onClick={onClick}
type={type}

 className={` ${basestyle} ${ButtonVariants[variant]} ${className}`}>{children}</button>
</>
  )
}

export default Button