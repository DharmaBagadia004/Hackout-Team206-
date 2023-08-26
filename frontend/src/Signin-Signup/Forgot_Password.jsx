import React, { useRef, useState } from 'react';
import axios from 'axios';

const Forgot_Password = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    
    if (password !== confirmPassword) {
      setError(true);
      return;
    }
    console.log(`Email : ${email}  and Password : ${password}`)
    try {
      const response = await axios.put('http://localhost:5000/api/auth/forgot-password', {
        email,
        password,
      });
      // Assuming the response contains a success message or status
      console.log(response.data);
      window.location.replace("http://localhost:5173/signin");
    } catch (err) {
      setError(true);
      console.error(err);
    }
  };

  return (
    <div className="box_container">
      <div className="box2" id="box3">
        <div className="box">
          <form onSubmit={handleSubmit}>
            <h1>Forgot Password</h1>
            <div className="inputbox">
              <input
                type="text"
                name="email"
                autoComplete="off"
                required
                ref={emailRef}
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
              <label>New Password</label>
            </div>
            <div className="inputbox">
              <input
                type="password"
                name="confirmPassword"
                autoComplete="off"
                required
                ref={confirmPasswordRef}
              />
              <label>Confirm Password</label>
            </div>
            {error && <div>Passwords do not match.</div>}
            <input type="submit" value="Change Password" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Forgot_Password;
