import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "./Navbar"
const Header = () => {
  let [nv, setNv] = useState(false);

  const nav=()=>{
    const m=document.getElementById("navcon")
    
    if(!nv)
    {
      setNv(true)
      m.style.display= "inline-block";

    }
    else{
      setNv(false)
      m.style.display="none"
    }
    console.log(nv)
  }
  
  return (
    <>
    <header>
      <NavLink to="/">
        <span className="logo" data-aos="fade-down"><img src="photo/logo.png" alt="" /></span>
      </NavLink>
      <div className="navcon" id="navcon"> 

           <Navbar/>
</div>
      <div className="fas fa-bars" id="menu-icon" onClick={()=>nav()}></div>
    </header>
    </>
  );
};

export default Header;
