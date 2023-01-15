import React from 'react'
import logo from './image/logo.png';
import btnimg from './image/imageb.png';
import "./sinup.css"
import {createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth,storage,db } from "../firebase.js";
import { useState } from 'react';
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate,Link } from 'react-router-dom';
export const Signup = () => {
  const[err, setErr]=useState(false);
  const navigate=useNavigate();
  const handelsubmit =async (e)=>{
    e.preventDefault()
    const dname=e.target[0].value;
    const demail=e.target[1].value;
    const dpass=e.target[2].value;
    const dfile=e.target[3].files[0];
    console.log(dname,demail,dpass,dfile);
    try{
      const res= await createUserWithEmailAndPassword(auth, demail, dpass); 
      


const storageRef = ref(storage,'images/'+dfile.name);

const uploadTask = uploadBytesResumable(storageRef,dfile);


uploadTask.on(
  
  (error) => {
    setErr(true);
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(storageRef).then(async(downloadURL) => {
      await updateProfile(res.user,{
        displayName:dname,
        photoURL:downloadURL,
        
      });
      await setDoc(doc(db, "users", res.user.uid),{
        uid:res.user.uid,
        name:dname,
        email:demail,
        photoURL: downloadURL,
      });
      // await setDoc(doc(db, "usersChats", res.user.uid),{});
      navigate("/Realestate-website");
    });
  }
  
);


    }catch(err){
          setErr(true);
     }
 
  }
  return (
    <div id="main">
      <h1>SIGNUP</h1>
      <div id="box">
        <div class="container">
          <div class="logo">
           <img src={logo} alt="suituhomu" />
          </div>

          <form onSubmit={handelsubmit}>
            <div class="con">

              <input type="text" placeholder="Name" id="name" />
              
            </div>

            <div class="con">

              <input type="email" placeholder="email" id="email" name="email" />

            </div>

            <div class="con">

              <input type="password" placeholder="password" id="pwd" name="pwd" />

            </div>

            <div class="con">

              <input style={{display:"none"} }type="file" id='filebtn' />
              <label htmlFor="filebtn">
                <img src={btnimg} title="photo icons" alt=""  id="flbt"/>
                <span id='btntxt'>add an image</span>
              </label>

            </div>

            <button id="signbut" type="submit">REGISTER</button>
                {err && <span>Something went wrong</span>}

          </form>
          <p className='wannabe'>You do have an account?<Link to="/login">Login</Link></p>
          {/* <p>You do have an account? Login</p> */}
        </div>


      </div>

    </div>
  )
}
