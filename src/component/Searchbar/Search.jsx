import React, { useState } from 'react'
import "./search.css"
import locate from "../image/location.png"
import home from "../image/home.png"
import rupee from "../image/rupee.png"

import { useContext } from 'react'
import { FetchContext } from '../../contex/FetchContext'
export const Search = ({callback}) => {
    
    const propdata=useContext(FetchContext)
    const[filtercontent,setFiltercontent]=useState([])
     
    function filter1(cityy) {
        console.log("in city filter");
        const arr=[]
        propdata.map(i=>(
            ((i.data.City).toUpperCase() === cityy.toUpperCase())?(arr.push(i)):console.log("nodata")
            ))
            setFiltercontent(arr)
    }
    function filter2(pt) {
        console.log("in pt filter");
        const arr=[]
        propdata.map(i=>(
            (i.data.Property_type === pt)?(arr.push(i)):""
            ))
            setFiltercontent(arr)
    }
    function filter3(bud){
        console.log("in bud");
        const arr=[]

        propdata.map(i=>(

            
          
            (bud === "under 5000") ?
                ((Number(i.data.Rent) <=5000) ? (arr.push(i)):"nodata"):
                (bud === "5000-10000") ? 
                    ((Number(i.data.Rent)>= 5000 && Number(i.data.Rent)<= 10000)? arr.push(i):"nodata"):
                    (bud === "10000-15000")?
                        ((i.data.Rent>= 10000 && Number(i.data.Rent)<= 15000)? arr.push(i):"nodata"):
                            (bud === "400000")?
                            ((Number(i.data.Rent)>= 15000 && Number(i.data.Rent)<= 400000)?arr.push(i):"nodata"):""
            


            ))
            setFiltercontent(arr)
        
    }
    function filter(cityy,pt) {
        console.log("in ctpt filter");
        const arr=[]
        propdata.map(i=>(
            (((i.data.City).toUpperCase() === cityy.toUpperCase())&&(i.data.Property_type === pt))?(arr.push(i)):console.log("no data")
            ))
            setFiltercontent(arr)
            
      
    }
    function filter4(cityy,pt,bd) {
        console.log("in ctptbd filter");
        const arr=[]
        propdata.map(i=>(
            (((i.data.City).toUpperCase() === cityy.toUpperCase())&&(i.data.Property_type === pt)&&(
                (bd === "under 5000") ?
                ((Number(i.data.Rent) <=5000) ? true:false):
                (bd === "5000-10000") ? 
                    ((Number(i.data.Rent)>= 5000 && Number(i.data.Rent)<= 10000)? true:false):
                    (bd === "10000-15000")?
                        ((i.data.Rent>= 10000 && Number(i.data.Rent)<= 15000)? true:false):
                            (bd === "400000")?
                            ((Number(i.data.Rent)>= 15000 && Number(i.data.Rent)<= 400000)?true:false):""
            ))?arr.push(i):console.log("no data")
            ))
            setFiltercontent(arr)
            
      
    }
   

    const handelsub = (e) =>{
        e.preventDefault();
        console.log(e)
        let city = e.target[0].value;
        let ptype = e.target[1].value;
        let budget = e.target[2].value;
        console.log(city + " " +  ptype + " " + budget);
        if (ptype === "None" && city !== "" && budget === "None") {
            
            filter1(city)
        }else if(ptype !== "None" && city !== "" && budget === "None"){
           
          filter(city,ptype) 
           
        }else if(ptype !=="None" && city === "" && budget === "None"){
                    filter2(ptype);
        }
        else if(ptype ==="None" && city === "" && budget !== "None"){
            filter3(budget);
        }else if(ptype !== "None" && city !== "" && budget !== "None"){
           
            filter4(city,ptype,budget) 
             
          }

          callback(filtercontent)
      
       
    }
    return (

        <div className="search">
            <div className="note">
                <p>Find a home you'll &nbsp;</p>
                <span>love</span>
            </div>
            <div className="sebar">
                <div className="oval">
                    <form onSubmit={handelsub}>
                        <div className="location">
                            <img src={locate} alt="" />
                            <input type="text" placeholder='city' id="first" />
                        </div>
                        <div className="proptyp">
                            <img src={home} alt="" />
                            <label for="property"></label>

                            <select className='selectform' id="Property" name="Property_type">
                            
                                <option value="None">Property Type</option>
                                <option value="1BHK Flat">1BHK Flat</option>
                                <option value="2BHK Flat">2BHK Flat</option>
                                <option value="3BHK Flat">3BHK Flat</option>
                                <option value="4BHK Flat">4BHK Flat</option>
                                <option value="5+BHK Flat">5+BHK Flat</option>
                                <option value="Single Rooms">Single Rooms</option>
                                <option value="House/villa">House/villa</option>
                            </select>
                        </div>
                        <div className="budget">
                            <img src={rupee} alt="" />
                            <label for="budgett"></label>

                            <select className='selectform' id="budgett" name="budgett">
                                <option  value="None">Budget</option>
                                <option value="under 5000">under 5000</option>
                                <option value="5000-10000">5000-10000</option>
                                <option value="10000-15000">10000-15000</option>
                                <option value="400000">400000</option>
                                <option value="80K">80K</option>
                            </select>
                        </div>
                        <button className='srchbtn' type='submit'>Search</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
