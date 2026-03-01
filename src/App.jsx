import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Crud from './pages/Crud'


function App() {
 

  return (
    <>  
    <BrowserRouter>
    <Routes>
      <Route path='/' element = {<Login/>} />
      <Route path='/register' element = {<Register/>}/>
       <Route path='/crud' element = { <Crud/>}/>
    </Routes>
    </BrowserRouter>

   
    </>
  )
}

export default App
