import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import React,{useEffect,useState} from 'react';
import { db } from '../../firebase';
import "./reqchk.css";
export const Popreqchk = (props) => {

    const[req,setReq]=useState([])

    useEffect(() => {
     fetchrequesteduser();
      
    },[props.popid])

    
    const handelaccept=async (idd)=>{
        const ref = doc(db, "requests",idd );
        await updateDoc(ref, {
            status: "Accepted"
          });
          
       
            

    }
    const handelreject=async (idd)=>{
        const ref = doc(db, "requests",idd );
        await updateDoc(ref, {
            status: "Rejected"
          });
          
       
            

    }

              async function fetchrequesteduser(){
            console.log(props.popid);
            const ref = query(collection(db, "requests"), where("property_id", "==", props.popid));
            getDocs(ref).then(snap=>{
                const prop=snap.docs.map(doc=>(
                    {
                        data: doc.data(),
                        id: doc.id,
                    }
                ))

                setReq(prop)
                console.log(prop);

            }).catch(error=>(console.log(error)));
        }


    return( (props.trigger)?(
            
    <div className='popreqchk'>
        <div className="innerrr">
        <button className="closebtn" onClick={()=>props.setTrigger(false)}>close</button>

                {
                   
                (req.length !==0)?(
                    req.map(i=>(
                        console.log(i),

                        <div className="boxcon">
                <p>{i.data.name}</p>
                   {/* duration for month */}
                <button className="accept"onClick={()=>{
                    handelaccept(i.id);
                   
                }}>ACCEPT</button>
                <button className="reject" onClick={()=>{handelreject(i.id)}}>REJECT</button>
             </div>
                    ))
                
                
                ):"There are no requests"}

             
             
        
        </div>
        
       
    </div> ):"")
}