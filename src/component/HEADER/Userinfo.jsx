import React from 'react'
import"./userinfo.css"
import bp from "../image/blank profile.png"
import logoff from "../image/off.png" 
import{signOut} from "firebase/auth"
import { useContext } from 'react'
import { AuthContext } from '../../contex/AuthContext'
import { auth } from '../../firebase'
 const Userinfo = () => {

  const currentUser =useContext(AuthContext);
  

  return (
    <div className="userinfo">
      
      <div className="profile">
          <img src={currentUser.photoURL} alt="" />
        <p>{currentUser.displayName}</p>
      </div>
       
        <button onClick={()=>signOut(auth)}  style={{display:"none"}} id='logout'>Logout</button>
        <label htmlFor="logout">
          <img  id='logof' src={logoff} alt="" />
        </label>
    </div>
   
  )
}
export default Userinfo;