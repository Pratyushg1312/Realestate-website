import { collection, getDocs } from 'firebase/firestore'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { Post } from '../component/Body/Post'
import { Maincorbod } from '../component/Corousel/Maincorbod'

import { Header } from '../component/HEADER/Header'
import { Search } from '../component/Searchbar/Search'
import { FetchContext } from '../contex/FetchContext'

export const Home = () => {
  const propdata= useContext(FetchContext)
  const [fdata,setFdata]= useState(propdata)
  

  
  
  const print=async (value)=>{
   await value
   if(({value}.value).length === 0)
   {
    setFdata(propdata)
   }else setFdata({value}.value)
    
  };
  

console.log(fdata);
  return (
    <>
    
    <Search callback={print}/>
    <Maincorbod/>
    <Post  fprop={fdata}/>
    </>
    
  )
}
