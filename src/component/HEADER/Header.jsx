import React from 'react'
 import "./head.css"
 import Logodis from"./Logodis"
 import Navbar from "./Navbar"
import Userinfo from './Userinfo'
export const Header = () => {
  return (
    <div className="header">
        <Logodis/>
        <Navbar/>
        <Userinfo/>
    </div>
  )
}
