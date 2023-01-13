import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import "./dash.css"
export const Dashbodysidebar = () => {
    return (

        <>
        <div className="sidebar" >


            <Link to="/dashboard/property">
                <button type='submit' style={{ display: "none" }} id='pro'  ></button>
            </Link>

            <label htmlFor="pro">
                <span id="property" >Property</span>
            </label>
            <Link to="/dashboard/rental-property">
                <button type='submit' style={{ display: "none" }} id='ren' ></button>
            </Link>

            <label htmlFor="ren">
                <span id="rent"  >Subsidized Home</span>
            </label>

           
        </div>
        <div className="dashpage">
             <Outlet/>

            
        </div>
       </> 

    )
}
