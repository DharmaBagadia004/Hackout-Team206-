import React from "react";
import { NavLink } from "react-router-dom";

const thanks1 = () => {
  return (
    <>
      <div className="maintnx">
      <div className="content1">
        <div className="wrapper-1">
          <div className="wrapper-2">
            <h1>Blog Created !</h1>
            <p>Thanks for visiting our website 🙏</p>
            <p>you should receive a confirmation email soon </p>
            <NavLink to="/blogadd">
              <button className="go-home">back</button>
            </NavLink>
          </div>
          <div className="footer-like">
            <p>
              <NavLink to="/blogs">Click here </NavLink>to read letest Bloogs
            </p>
          </div>
        </div>
      </div>
      </div>
      
    </>
  );
};

export default thanks1;
