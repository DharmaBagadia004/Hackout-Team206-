import axios from "axios";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const list = [
  "Home",
  "Events",
  "About",
  "Contact",
];


const Navbar = () => {

  axios.defaults.withCredentials=true;
const handlecookie=async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/auth/logout');
    if(response){
      window.location.replace("http://localhost:5173/signin");
    }
  } catch (err){
    console.log(err);
  }
};

  let arr=document.cookie.split(';');
  console.log(arr.length);
  let check=arr.length ===2;
  return (
    <>
    
      <ul className="navbar" id="navbar">
        {list.map((curEle) => {
          const item = "/" + `${curEle}`;
          if (curEle == "Home") {
            return (
                
              <button className="button2" key={curEle} >
                <NavLink to="/" className="actv">
                  {curEle}
                </NavLink>
              </button>
              
            );
          }
          return (
            
            <button className="button2" key={curEle} >
              <NavLink to={item} className="actv">
                {curEle}
              </NavLink>
            </button>
              
          );
        })}
        
        <NavLink to="/signin" id="signbtn" className="sign-in-text" >
         {!check && <button>Sign In</button>} 
        </NavLink>
        <button id="profilebtn" className="button2 profilebtn">
        <NavLink to='/profile' className="actv" >
         {check && <><i className='fas fa-user-circle' style={{fontSize:"24px",color:"#1a73e8"}}></i> Profile </>} 
        </NavLink>
        </button>
        
      </ul>
    </>
  );
};

export default Navbar;
