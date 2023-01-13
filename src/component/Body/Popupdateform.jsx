import React, { Children, useState ,useEffect} from 'react'
import pho from "../../pages/image/imageb.png"
import "./pop.css"
import { db, storage } from '../../firebase'
import { collection, getDoc, doc, setDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { useContext } from 'react'
import { AuthContext } from '../../contex/AuthContext'
import x from "../image/x.png"
const Popupdateform = (props) => {
 const [data,setData]=useState([])
 const[err,setErr]=useState(false)
 const currentUser=useContext(AuthContext)

useEffect(() => {
  fetch();
}, [props.popid])



 async function fetch()
 {
    const ref=doc(db,"properties",props.popid)
    const d=await getDoc(ref)
    setData(d.data())
 }

console.log(data);


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
               
             }),


        )

    } catch (err) {
        setErr(true);
    }



};



  return (props.trigger)?(
// {props.children}
    <div  className="poprpdateform">
        <div className="innerr">
            <button style={{display:"none"}} className="closebtn" id='closebtn' onClick={()=>props.setTrigger(false)}>close</button>
                <label style={{position:"absolute",
    top: "16px",
    right: "16px"}} htmlFor="closebtn"><img src={x} height="20px"  alt="" /></label>
            <div id={props.popid} key={props.popid} className="formprop">
                <form onSubmit={handelsubmit}>
                
                    <div className="personald">
                        <h2>Personal Details</h2>
                        <input type="text" placeholder={data.Owner} />
                    <input type="tel" name="" id="" placeholder={data.Phone_num} />
                        <input type="email" name="" id="" placeholder={data.Email} />
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
                            <input type="text" name="city" id="" placeholder={data.City} />
                            <input type="text" name="locality" id="" placeholder={data.Locality} />
                        </div>

                        <div className="features">
                            <h2>Property Features</h2>

                            <input type="number" name="bedroom" id="bedrooms" placeholder={data.Bedroom} />
                            <input type="number" name="Balcony" id="balconies" placeholder={data.Balconies} />
                            <input type="number" name="floor" id="floorno" placeholder={data.Floor_num} />
                            <input type="number" name="totalfloor" id="totalfloor" placeholder={data.Total_Floor} />
                            <input type="number" name="Bath" id="Bathrooms" placeholder={data.Bathroom} />
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
                        <input type="tel" name="rent" id="monthlyrent" placeholder={data.Rent} />
                        <input type="tel" name="security" id="security-deposit" placeholder={data.Security_money} />
                        <input type="text" name="propertyname" id="building-name"placeholder={data.Property_name} />
                    </div>
                    <input style={{ display: "none" }} type="file" name="file" id="filebtn" />
                    <label htmlFor="filebtn">
                        <img src={pho} title="photo icons" alt="" id="flbt" />
                        <span id='btntxt'>add an image</span>
                    </label>
                    <button id="sub" type='submit'>Update</button>
                    <div className="errmsg">
                        {err && <span>Something went wrong</span>}
                    </div>
                    
                </form>
            </div>

            
        </div>
    </div>
  ):"";
}

export default Popupdateform