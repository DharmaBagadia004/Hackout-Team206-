import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

const Profile = (props) => {
  let check = false;
  const [userData, setUserData] = useState(null);
  const [events, setEvents] = useState([]);
  const [conducted, setconducted] = useState([]);
  axios.defaults.withCredentials = true;
  useEffect(() => {
    // Fetch user data from the backend
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/profile`
        );
        setUserData(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    // Fetch the data from the backend
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/events/event/${0}`
        );
        console.log(userData.username);
        const filteredEvents = response.data.filter((event) =>
          event.registeredUsers.includes(userData.username)
        );
        console.log(filteredEvents);
        setEvents(filteredEvents);
        const conductedbyme = response.data.filter(
          (event) => event.conductedby === userData.username
        );
        setconducted(conductedbyme);
      } catch (err) {
        console.error("Error:", err);
      }
    };
    fetchEvents();
  }, [userData]);
  const handleLogout = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/auth/logout");
      if (response) {
        window.location.replace("http://localhost:5173/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (!userData) {
    return <div>Loading...</div>;
  }
  return (
    <div className="containerc1">
      <header className="head1"></header>
      <main className="main1">
        <div className="row">
          <div className="left col-lg-4">
            <div className="photo-left">
              <img
                className="photo"
                src="https://th.bing.com/th/id/OIP.Gfp0lwE6h7139625a-r3aAHaHa?w=214&h=215&c=7&r=0&o=5&dpr=1.3&pid=1.7"
              />
            </div>
            <h4 className="name1">{userData.username}</h4>
            <p className="info">{userData.email}</p>
            <div className="logoutbtn">
              <NavLink className="sign-in-text">
                <button onClick={handleLogout}>Log Out</button>
              </NavLink>
            </div>
            <div className="stats row"></div>
            <p className="desc1">{userData.bio}</p>
            <div className="social">
              <i className="fa fa-facebook-square" aria-hidden="true"></i>
              <i className="fa fa-twitter-square" aria-hidden="true"></i>
              <i className="fa fa-pinterest-square" aria-hidden="true"></i>
              <i className="fa fa-tumblr-square" aria-hidden="true"></i>
            </div>
          </div>
          <div className="right col-lg-8">
            <ul className="nav1">
              <li>Registered Events</li>
            </ul>
            <div className="home_card">
              {/* Render registered events */}

              {events.length === 0 ? (
                <p>No registered events found.</p>
              ) : (
                events?.map((curEle) => (
                  <div
                    className="card mb-3"
                    style={{ maxWidth: "540px" }}
                    key={curEle._id}
                  >
                    {(check = curEle.mode === "online")}
                    <div className="row g-0">
                      <div className="col-md-4">
                        <img
                          src={curEle.photo}
                          className="img-fluid rounded-start"
                          alt="..."
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title">{curEle.eventName}</h5>
                          <p className="card-text d15">{curEle.description}</p>
                          <p className="card-text">
                            <small className="text-muted">
                              {formatDate(curEle.date)}
                            </small>
                          </p>
                        </div>
                        {check && (
                          <NavLink to="/">
                            <button className="event-btn">JOIN</button>
                          </NavLink>
                        )}
                        {!check && (
                          <div className="card-text">
                            Location : {curEle.location}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            <ul className="nav1">
              <li>Events conducted by you</li>
            </ul>
            <div className="home_card">
              {/* Render registered events */}
              {conducted.length === 0 ? (
                <p>No events conducted by you.</p>
              ) : (
                conducted?.map((curEle) => (
                  <div
                    className="card mb-3"
                    style={{ maxWidth: "540px" }}
                    key={curEle._id}
                  >
                    <div className="row g-0">
                      <div className="col-md-4">
                        <img
                          src={curEle.photo}
                          className="img-fluid rounded-start"
                          alt="..."
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title">{curEle.eventName}</h5>
                          <p className="card-text d15">{curEle.description}</p>
                          <p className="card-text">
                            <small className="text-muted">
                              {formatDate(curEle.date)}
                            </small>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
