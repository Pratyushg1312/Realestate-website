
import { collection, where, query, getDocs, doc, deleteDoc, getDoc } from 'firebase/firestore';
import React, { useState, useContext, useEffect } from 'react'
import { useAsyncValue } from 'react-router-dom';
import { AuthContext } from '../../contex/AuthContext';
import { db } from '../../firebase';
import Popupdateform from './Popupdateform';
import { Popreqchk } from './Popreqchk';

export const Dashbodysubsidizedhome = () => {
  const [userreq, setUserreq] = useState([]);
  const currentUser = useContext(AuthContext);
  const [dat, setDat] = useState([])
  const [err, setErr] = useState(false)

  useEffect(() => {

    
    fetchuserreq();



}, [])
  async function fetchuserreq() {
    await currentUser
    const refe = query(collection(db, "requests"), where("uid", "==", currentUser.uid));

    getDocs(refe).then(snaap => {
        const rq = snaap.docs.map(doc => (
            {
                data: doc.data(),
                id: doc.id,
            }
        ))
        setUserreq(rq)
    }).catch(error => {
        setErr(true)
        console.log(error);
    })
}

  const handeledel = async (rid, path) => {
    const ref = doc(db, path, rid)
    await deleteDoc(ref)
    if (path === "requests") {
        fetchuserreq();

    }
   


}
async function fetchproperty(pid) {
    const ref = collection(db, "properties");
    getDocs(ref).then(snaap => {
        const rq = snaap.docs.map(doc => (
            {
                data: doc.data(),
                id: doc.id,
            }
        ))
        setDat(rq)
    }).catch(error => {
        setErr(true)
        console.log(error);
    })
}


  return (
    
      <div className='proren'>
                        <div className="reqprocon">
                            {(userreq.length !== 0) ? (
                                userreq.map(r => (
                                    fetchproperty(r.data.property_id),

                                    <div key={r.id} className="boxcon">
                                        <p>{dat.map(i => (i.id === r.data.property_id) ? i.data.Property_name : "")}</p>
                                        <span>Request Status:{(r.data.status === null) ? "Waiting" : r.data.status}</span>
                                        <span>Request_id: {r.id}</span>
                                        <button id='deleteform' onClick={() => { handeledel(r.id, "requests") }}>DELETE</button>
                                    </div>
                                ))

                            ) : (<div className='errmsg'>:( you haven't posted any property yet</div>)
                            }

                        </div>
                    </div>
    
  )
}
