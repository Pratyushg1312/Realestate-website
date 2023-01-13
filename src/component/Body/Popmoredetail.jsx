import { collection, doc, getDoc, setDoc } from 'firebase/firestore'
import React ,{useContext,useEffect}from 'react'
import { AuthContext } from '../../contex/AuthContext'
import { db } from '../../firebase'
import img from "../../pages/image/Wallpaper.jpg"
import "./popmore.css"
import { useNavigate } from 'react-router-dom'

import x from "../image/x.png"
import { useState } from 'react'
const Popmoredetail = (props) => {
    const curentUser= useContext(AuthContext);
    const navigate= useNavigate()
    const [data,setData]=useState([])
    async function generaterequest(pid){
        await curentUser
        const data={
                name:curentUser.displayName,
                uid:curentUser.uid,
                property_id:pid,
                status:null

        }
        
        const refer=  doc(collection(db, "requests"));
        await setDoc(refer,data);
     
        navigate("/dashboard/rental-property")
        



    }
    
    // async function fetchprop(){
    //     const ref=doc(db,"properties",props.popid)
    //    const snap=getDoc(ref);
    //    setData(snap)

    // }
    // useEffect(() => {
    //   fetchprop()
    // }, [data])
    // console.log(data);
    
  return (props.trigger)?
   (
  
    <div key={props.popid}className="popmoredetail">
        <div className="innnerrr">
            <button style={{display:"none"}} className="closebtn" id='closebtn' onClick={()=>props.setTrigger(false)} >
                    close
            </button>
            <label style={{position:"absolute",
    top: "16px",
    right: "16px"}} htmlFor="closebtn"><img src={x} height="20px"  alt="" /></label>
            {/* {props.children} */}
            <div className="detail">
                <div className="propprofile">
                    <img src={props.detail.Prop_img_url} alt="" />
                 <div className="location1">
                   {props.detail.Locality } in { props.detail.City}
                 </div>
                </div>
                <div className="pname">
                    {props.detail.Property_name}
                </div>
                    <div className="qcon1">
                        {props.detail.Property_type}
                    </div>
                <div className="quickview">
                    <div className="qcon">
                           vacant
                    </div>
                    <div className="line"></div>
                    <div className="qcon">
                       {props.detail.Furnished_status}
                    </div>

                </div>

                <div className="reqnowner">
                    <div className="ownname">
                        {props.detail.Owner}
                        <br/>
                        <div className="tagg">owner</div>
                        
                    </div>
                     <button className="request" onClick={()=>{generaterequest(props.popid)}}>request</button>

                </div>

            </div>
        </div>
    </div>

   
    
  ):"";
}

export default Popmoredetail