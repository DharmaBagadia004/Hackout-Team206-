import React from "react";
import { NavLink } from "react-router-dom";

const thanks = () => {
  return (
    <>
      <div className="maintnx">
      <div className="content1">
        <div className="wrapper-1">
          <div className="wrapper-2">
            <h1>Event Created !</h1>
            <p>Thanks for visiting our website 🙏</p>
            <p>you should receive a confirmation email soon </p>
            <NavLink to="/eventConduct">
              <button className="go-home">back</button>
            </NavLink>
          </div>
          <div className="footer-like">
            <p>
              <NavLink to="/events">Click here </NavLink>to register in various
              events
            </p>
          </div>
        </div>
      </div>
      </div>
      
    </>
  );
};

export default thanks;
