import axios from "axios";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    const payload = { username, email, password };
    e.preventDefault();
    setError(false);

    axios
      .post("http://localhost:5000/api/auth/signup", payload) 
      .then((response) => {
        window.location.replace("http://localhost:5173/signin");
      })
      .catch((error) => {
        console.log("Error: " + error);
        setError(true);
      });
  };
  return (
    <div className="box_container">
    


      <div className="box1" id="box1">
      <div className="box">
        <form onSubmit={handleSubmit}>
          <h1>Registration form</h1>
          <div className="inputbox">
            <input type="text" name="username"  onChange={(e) => setUsername(e.target.value)} autoComplete="off" required />
            <label>username</label>
          </div>
          <div className="inputbox">
            <input type="text" name=""  onChange={(e) => setEmail(e.target.value)} autoComplete="off" required />
            <label>Email ID</label>
          </div>
          <div className="inputbox">
            <input type="text" name="" onChange={(e) => setPassword(e.target.value)} autoComplete="off" required />
            <label>Password</label>
          </div>
          

          <input type="submit" name="" value="SignUp"/>
          <h4 className="noacount">Already have an account?<NavLink to="/signin">Login</NavLink> </h4>
          {error && (
          <div     style={{ color: "red", marginTop: "10px" }}>
            Username or Email already exists
          </div>
        )}
        </form>
      </div>
      </div>




      {/* <div className="register">
      <div className="reg1">
        <span className="registerTitle">
          <center>Register</center>
        </span>
        <form className="registerForm" onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            type="text"
            className="registerInput"
            placeholder="Enter your username..."
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            type="text"
            className="registerInput"
            placeholder="Enter your email..."
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            className="registerInput"
            placeholder="Enter your password..."
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="registerButton" type="submit">
            Register
          </button>
        </form>
        <div className="ll">If you have already account ? </div>
        <button className="registerLoginButton">
          <Link className="link" to="/login">
            Login
          </Link>
        </button>
        {error && (
          <span style={{ color: "red", marginTop: "10px" }}>
            Something went wrong!
          </span>
        )}
      </div>
    </div> */}
    </div>
  );
}
