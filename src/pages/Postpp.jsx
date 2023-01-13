import React, { useContext, useState } from 'react'
import { Header } from '../component/HEADER/Header'
import pho from "./image/imageb.png"
import "./postp.css"
import {  storage, db } from "../firebase.js";
import { AuthContext } from '../contex/AuthContext';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, doc, setDoc } from "firebase/firestore"; 
import { useNavigate} from 'react-router-dom';

export const Postpp = () => {
    const [err,setErr]=useState(false);
    const currentUser=useContext(AuthContext);
    const navigate=useNavigate();


const handelsubmit= async (e)=>{
    
    e.preventDefault();
    const oname=e.target[0].value;
    const phone=e.target[1].value;
    const cmail=e.target[2].value;
    const proptyp=e.target[3].value;
    const city=e.target[4].value;
    const locality=e.target[5].value;
    const noofbedrooms=e.target[6].value;
    const noofbalconies=e.target[7].value;
    const nooffloor=e.target[8].value;
    const totalfloors=e.target[9].value;
    const noofbathrooms=e.target[10].value;
    const furnishdstat=e.target[11].value;
    const monthlyrent=e.target[12].value;
    const securitydepo=e.target[13].value;
    const bname=e.target[14].value;
    const pictures=e.target[15].files[0];
    
    console.log(oname,phone,cmail,proptyp,city,locality,noofbedrooms,noofbalconies,nooffloor,totalfloors,noofbathrooms,furnishdstat,monthlyrent,securitydepo,bname,pictures);
  

    try {

        const storageRef = ref(storage, 'property_images/' + pictures.name);

      const uploadTask = uploadBytesResumable(storageRef, pictures);

        uploadTask.on
        (
            (error) =>{
                 setErr(true);
             },
            
           await getDownloadURL(storageRef).then(async (downloadURL) =>{
                console.log(downloadURL);
                const data={
                    Owner:oname,
                    Phone_num:phone,
                    Email:cmail,
                    Property_type:proptyp,
                    City:city,
                    Locality:locality,
                    Bedroom:noofbedrooms,
                    Balconies:noofbalconies,
                    Bathroom:noofbathrooms,
                    Floor_num:nooffloor,
                    Total_Floor:totalfloors,
                    Furnished_status:furnishdstat,
                    Rent:monthlyrent,
                    Security_money:securitydepo,
                    Property_name:bname,
                    Prop_img_url:downloadURL,
                    uid:currentUser.uid,
                
                  };

                const refer=  doc(collection(db, "properties"));
               
                await setDoc(refer,data);
               navigate("/Dashboard");
             }),


        )

    } catch (err) {
        setErr(true);
    }



};


    return (
        <>
           
            <div className="formprop">
                <form onSubmit={handelsubmit}>
                    <div className="personald">
                        <h2>Personal Details</h2>
                        <input type="text" placeholder='Enter Your Name' />
                        <input type="tel" name="" id="" placeholder='Enter Your Phone No.' />
                        <input type="email" name="" id="" placeholder='Enter Your Email' />
                    </div>
                    <div className="propertyd">
                        <h2>Property Details</h2>
                        <div className="type">
                            <label for="property">Property Type</label>

                            <select id="Property" name="Property_type">
                                <option value="1BHK Flat">1BHK Flat</option>
                                <option value="2BHK Flat">2BHK Flat</option>
                                <option value="3BHK Flat">3BHK Flat</option>
                                <option value="4BHK Flat">4BHK Flat</option>
                                <option value="5+BHK Flat">5+BHK Flat</option>
                                <option value="Single Rooms">Single Rooms</option>
                                <option value="House/villa">House/villa</option>
                            </select>

                        </div>
                        <div className="locationn">
                            <h2>Property Location</h2>
                            <input type="text" name="city" id="" placeholder='Enter City' />
                            <input type="text" name="locality" id="" placeholder='Name of Locality/Society' />
                        </div>

                        <div className="features">
                            <h2>Property Features</h2>

                            <input type="number" name="bedroom" id="bedrooms" placeholder='Bedrooms NO.' />
                            <input type="number" name="Balcony" id="balconies" placeholder='Balconies no.' />
                            <input type="number" name="floor" id="floorno" placeholder='Floor No.' />
                            <input type="number" name="totalfloor" id="totalfloor" placeholder='Total floor' />
                            <input type="number" name="Bath" id="Bathrooms" placeholder='Bathroom' />
                            <label htmlFor="fp">Furnishd Status</label>
                            <div className="fs">
                                <select name="fp" id="fp">
                                    <option value="Furnished">Furnished</option>
                                    <option value="Unfurnished">Unfurnished</option>
                                    <option value="Semi-Furnished">Semi-Furnished</option>
                                </select>
                            </div>

                        </div>

                    </div>
                    <div className="rentd">
                        <input type="tel" name="rent" id="monthlyrent" placeholder='Enter Monthly Rent' />
                        <input type="tel" name="security" id="security-deposit" placeholder='Security Deposit' />
                        <input type="text" name="propertyname" id="building-name"placeholder='Building Name' />
                    </div>
                    <input style={{ display: "none" }} type="file" name="file" id="filebtn" />
                    <label htmlFor="filebtn">
                        <img src={pho} title="photo icons" alt="" id="flbt" />
                        <span id='btntxt'>add an image</span>
                    </label>
                    <button id="sub" type='submit'>Submit</button>
                    <div className="errmsg1">
                        {err && <span>Something went wrong</span>}
                    </div>
                    
                </form>
            </div>



        </>


    )
}
