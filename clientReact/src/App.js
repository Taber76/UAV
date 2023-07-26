import React from 'react'
import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './components/routes/Home'
import NavBar from './components/header/NavBar'
import Footer from './components/footer/Footer'

function App() {
  return (
    <BrowserRouter>
      <NavBar/>
        <Routes>
          <Route exact path='/' element={<Home />} /> 
        </Routes>
      <Footer/>
    </BrowserRouter>   
  );
}

export default App
