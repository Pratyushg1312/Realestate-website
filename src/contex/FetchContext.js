
import { collection, getDocs } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import{ db}from"../firebase"
export const FetchContext= createContext();

export const FetchcontextProvider = ({children})=>{
        const [propdata,setPropdata]=useState([])
        
        useEffect(() => {
          fet()
        
          return () => {
           fet()
          }
        }, [])
        
    
        const fet=async () => {
      const pref = collection(db, "properties")
      await getDocs(pref).then(
          snap => {
              const prop = snap.docs.map(doc => ({
                  data: doc.data(),
                  id: doc.id,
              }))
              
              setPropdata(prop)
          }
      ).catch(error => { console.log(error); })

        }
        

        
            return(<FetchContext.Provider value={propdata}>
              {children}
            </FetchContext.Provider>);
        
        
}