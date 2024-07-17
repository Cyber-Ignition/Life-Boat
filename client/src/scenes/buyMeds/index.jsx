// import { Typography } from '@mui/material'
import React from 'react'
import Navbar from "scenes/navbar";
import './buyMed.css';
const BuyMeds = () => {
  return (
    <>
      <Navbar/>
      <div className='head-div'>
        <div className='head-div-cover'></div>
        <h1 className='head-msg'>Get Medicines<br/> At Your Doorstep</h1>
        <ul className='del-text'>
          <li>Greatest collection of all medicines.</li>
          <li>Delivery within one hour.</li>
        </ul>
        <input type='text' placeholder='Search Medicines and Essentials' className='search-med-box'></input>
        <button className='searchBtn'>Search</button>
      </div>
      <h2 className='midpage-head'>Frequently Searched Medicines</h2>
    </>
  )
}

export default BuyMeds
