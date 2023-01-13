import React from 'react'
import logo from './image/logo.png';
import "./lgin.css"
import { useState } from 'react';
import { useNavigate,Link} from 'react-router-dom';
import{auth} from"../firebase"
import { signInWithEmailAndPassword } from "firebase/auth";
export const Login = () => {
        
    const [err, setErr] = useState(false);
    const navigate = useNavigate();
    const handelsubmit = async (e) => {
        e.preventDefault();
            // console.log("clicked button");
        const mail = e.target[0].value;
        const pass = e.target[1].value;

        console.log(mail, pass);
        try {
          await  signInWithEmailAndPassword(auth, mail, pass);
          navigate("/");
        } catch (err) {
            setErr(true);
        }

    }
    
    return (
        <div id="main">
            <h1>LOGIN</h1>
            <div id="box">
                <div class="container">
                    <div class="logo">
                        <img src={logo} alt="suituhomu" />
                    </div>
               
                        <form onSubmit={handelsubmit}>
                        <div className="container">
                            <div class="con">

                                <input type="email" id="email" name="email" placeholder="email" />
                            </div>

                            <div class="con">

                                <input type="password" id="pwd" name="pwd" placeholder="password" />
                            </div>

                            <button id="logbut" type="submit">login</button>

                            {err && <span>Something went wrong</span>}
                        </div>


                    </form>


                </div>


                <p className='wannabe'>You don't have an account?<Link to="/signup">Signup</Link></p>
                {/* <a>You don't have an account?Signup</a> */}

            </div>

        </div>
    )
}
