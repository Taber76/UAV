import React from 'react'
import './NavBar.css'



import { NavLink, Link } from 'react-router-dom'


import logo from './logo.png'


const NavBar = () => {
  return (
      <div className="container">
        <div className="row">
          <div className="col-2">hamburger opciones</div>
          <div className="col-8">Usuario / status </div>
          <div className="col-2">hamburger capas</div>
        </div>
      </div>
  )
}

export default NavBar


