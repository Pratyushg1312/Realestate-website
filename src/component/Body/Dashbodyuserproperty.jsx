import { collection, where, query, getDocs, doc, deleteDoc, getDoc } from 'firebase/firestore';
import React, { useState, useContext, useEffect } from 'react'
import { useAsyncValue } from 'react-router-dom';
import { AuthContext } from '../../contex/AuthContext';
import { db } from '../../firebase';
import Popupdateform from './Popupdateform';
import { Popreqchk } from './Popreqchk';



export const Dashbodyuserproperty = () => {
    const currentUser = useContext(AuthContext)
    const [userprop, setUserprop] = useState([]);
    const [err, setErr] = useState(false)
    const [pop, setPop] = useState(false)
    const [pop2, setPop2] = useState(false)
    const [popid, setPopid] = useState("")
    useEffect(() => {

        fetchuserprop();




    }, [])


    async function fetchuserprop() {
        await currentUser


        const ref = query(collection(db, "properties"), where("uid", "==", currentUser.uid));
        await getDocs(ref).then(snap => {

            const prop = snap.docs.map(doc => (



                {
                    data: doc.data(),
                    id: doc.id,
                }
            ))


            setUserprop(prop)
        }
        ).catch(error => {
            setErr(true)
            console.log(error);
        })


    }

    const handeledel = async (rid, path) => {
        const ref = doc(db, path, rid)
        await deleteDoc(ref)

        if (path === "properties") {
            fetchuserprop();
        }


    }


    return (
        <>
            <div className='proper'>
                {
                    (userprop.length !== 0) ? (
                        userprop.map(p =>
                        (
                            (<>
                                <div id={p.id} key={p.id} className="boxcon">
                                    <p>{p.data.Property_name}</p>
                                    <span onClick={() => { setPop2(true); setPopid(p.id) }}>Requests</span>
                                    <button id='udateform' onClick={() => { setPop(true); setPopid(p.id) }}>UPDATE</button>
                                    <button id='deleteform' onClick={() => { handeledel(p.id, "properties") }}>DELETE</button>

                                </div>
                                <Popupdateform trigger={pop} setTrigger={setPop} popid={popid}>
                                    <h3>hi</h3>
                                </Popupdateform>
                                <Popreqchk trigger={pop2} setTrigger={setPop2} popid={popid}>
                                    <h3>popid</h3>
                                </Popreqchk>
                            </>

                            )
                        ))
                    ) : (<div className='errmsg'>:( you haven't posted any property yet</div>)


                }
            </div>

        </>
    )
}
