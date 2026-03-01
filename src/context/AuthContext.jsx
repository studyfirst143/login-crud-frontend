import React, {  createContext, useState } from 'react'

export const AuthContext = createContext();


export const AuthProvider = ({children}) =>{

    const  [userfullname, setUserfullname] = useState("");
const [useremail, setUseremail] = useState("");
const [token,setToken] = useState("");

return(
   <>
    <AuthContext.Provider value= {{userfullname, useremail, setUseremail,setUserfullname, token,setToken}} >{children}</AuthContext.Provider>
   </>

)
}

