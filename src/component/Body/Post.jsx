import React,{useState,useEffect} from 'react'
import "./post.css"

import Popmoredetail from './Popmoredetail';
import { useContext } from 'react';
import { FetchContext } from '../../contex/FetchContext';


export const Post = (props) => {
const propdata=useContext(FetchContext)
const [invalue,setInvalue]=useState("pro")
    
    const[pop,setPop]=useState(false)
    const[popid,setPopid]=useState("")
    const[detail,setDetail]=useState({})

    const print1=async(value)=>{
        setInvalue({value}.value)
        console.log({value}.value);
        
    }
   
    return (
       

        <div className="post">
            { ((props.fprop).length === 0)?
            
            
            
            propdata.map(proper=>(
            
            <><div key={proper.id} className="postbox">
                <div className="propimg">
                    <img src={proper.data.Prop_img_url} alt="" />
                </div>
                <div className="propinfo">
                    <div className="block1">
                        <div className="propname">
                            <span id="name">{proper.data.Property_name}</span>
                            <span id="location">in {proper.data.City},{proper.data.Locality}</span>
                        </div>
                        <div className="proprent">
                            <span id="rent">Rs{proper.data.Rent}</span>
                        </div>
                    </div>
                    <div className="block2">
                        <div className="status">
                            <span id="satuts">Status=veccant/ocuupied</span>
                        </div>
                        <div className="morenfo">
                            <span id="minfo">
                                {proper.data.Property_type}
                            </span>
                        </div>
                        <button onClick={()=>{setPop(true); setPopid(proper.id); setDetail(proper.data)}} >More Details</button>
                    </div>



                </div>
            </div>
            
            <Popmoredetail  trigger={pop} setTrigger={setPop}  popid={popid} detail={detail} callback={print1}>
                <div>{popid}</div>
            </Popmoredetail> 
            </>
            
            
                   
            
            )):
            props.fprop.map(proper=>(
            
                <><div key={proper.id} className="postbox">
                    <div className="propimg">
                        <img src={proper.data.Prop_img_url} alt="" />
                    </div>
                    <div className="propinfo">
                        <div className="block1">
                            <div className="propname">
                                <span id="name">{proper.data.Property_name}</span>
                                <span id="location">in {proper.data.City},{proper.data.Locality}</span>
                            </div>
                            <div className="proprent">
                                <span id="rent">Rs{proper.data.Rent}</span>
                            </div>
                        </div>
                        <div className="block2">
                            <div className="status">
                                <span id="satuts">Status=veccant/ocuupied</span>
                            </div>
                            <div className="morenfo">
                                <span id="minfo">
                                    {proper.data.Property_type}
                                </span>
                            </div>
                            <button className="viewdetail" onClick={()=>{setPop(true); setPopid(proper.id); setDetail(proper.data)}} >More Details</button>
                        </div>
    
    
    
                    </div>
                </div>
                
                <Popmoredetail  trigger={pop} setTrigger={setPop}  popid={popid} detail={detail}>
                    <div>{popid}</div>
                </Popmoredetail> 
                </>))
            
            }
            

        </div>
    )

}
