import React from 'react'
import "./nav.css"
import { Link} from 'react-router-dom'
 const Navbar = () => {
  return (
    <div className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li> <Link>Pay Rent</Link></li>
        <li><Link to="/post">Post Property</Link></li>
        <li><Link to="/dashboard/property">Dashboard</Link></li>
      </ul>
    </div>
  )
}
export default Navbar;

// 1.home
// 2.pay rent
// 3.Post Property
// 4.Dashboard