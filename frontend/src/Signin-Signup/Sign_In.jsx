import React, { useContext, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContextProvider";
const Sign_In = () => {
  const [user, setUser] = useContext(UserContext);
  const userRef = useRef();
  const passwordRef = useRef();
  // const history = useHistory();
  const [error, setError] = useState(false);

  axios.defaults.withCredentials = true;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signin",
        {
          email: userRef.current.value,
          password: passwordRef.current.value,
        }
      );
      // Assuming the response contains a token or user data to be stored in context
      setUser(response.data);
      window.location.replace("http://localhost:5173/home");
    } catch (err) {
      setError(true);
      console.error(err);
    }
  };

  return (
    <>
      <div className="box_container">
        <div className="box2" id="box2">
          <div className="box">
            <form onSubmit={handleSubmit}>
              <h1>Login form</h1>
              <div className="inputbox">
                <input
                  type="text"
                  name="email"
                  autoComplete="off"
                  required
                  ref={userRef}
                />
                <label>Email</label>
              </div>
              <div className="inputbox">
                <input
                  type="password"
                  name="password"
                  autoComplete="off"
                  required
                  ref={passwordRef}
                />
                <label>Password</label>
              </div>
              <input type="submit" value="Login" />
              <h4 className="noacount">
                Don't have an account? <NavLink to="/signup">Sign up</NavLink>
              </h4>
              <NavLink to="/forgotpassword">Forgot Password ?</NavLink>
              {error && <div>Wrong Details try again !!!</div>}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sign_In;
