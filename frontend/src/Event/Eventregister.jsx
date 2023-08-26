import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
const Events = (props) => {
  let arr = document.cookie.split(";");
  let check, data;
  if (arr.length > 1) {
    data = arr[1].substring(6);
  }
  axios.defaults.withCredentials = true;
  const [events, setEvents] = useState([]);
  useEffect(() => {
    // Fetch the data from the backend

    axios
      .get(`http://localhost:5000/api/event/${0}`)
      .then((response) => {
        const filteredEvents = response.data.filter(
          (event) => event.conductedby !== data
        );
        setEvents(filteredEvents);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const registeruser = (eventId) => {
    console.log(`hello ${eventId}`);
    axios
      .post(`http://localhost:5000/api/registration/register/${eventId}`)
      .then((response) => {
        // alert(response.data)
        window.location.reload();
      })
      .catch((error) => {
        window.location.replace("http://localhost:5173/signin");
      });
  };
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  return (
    <>
      <div className="events-div">
        <div className="feature-events">
          <div style={{ height: "40px" }}></div>
          <div className="future-events-title">
            <div className="headevent">
              <h1>OUR FEATURE EVENTS & MEETUPS</h1>
              {arr.length === 2 && (
                <p>
                  If you want to conduct an event{" "}
                  <NavLink to="/eventConduct" className="conductlink btn3">
                    Click Here
                  </NavLink>{" "}
                </p>
              )}
            </div>
            <div className="future-events-search">
              <form>
                <div className="search-container">
                  <i class="fas fa-search search-icon"></i>
                  <input type="text" placeholder="Search" />
                </div>
              </form>
            </div>
          </div>

          <div className="event-container">
            {events.map((event) => {
              check = false;
              check = event.registeredUsers.includes(data);
              return (
                <div className="event-square" key={event._id}>
                  <img src={event.photo} alt="" />
                  <p className="event-date">Date : {formatDate(event.date)}</p>
                  <p className="event-name">Name : {event.eventName}</p>
                  <p className="event-type">Mode : {event.mode}</p>
                  <p className="event-type d111">Location : {event.location}</p>
                  <p className="event-dis d11">
                    Description : {event.description}
                  </p>
                  <div className="btn-continer">
                    {!check && (
                      <button
                        className="event-btn"
                        onClick={() => registeruser(event._id)}
                      >
                        Register
                      </button>
                    )}
                    {check && <button className="event-btn">Registered</button>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* <div className="past-events-div">
        <div className="past-events-title">
          <h2>DIRECTORY OF PAST EVENTS</h2>
          <p>Events are listed in reverse chronological order by date.</p>
        </div>
        <div className="past-events-search">
          <form>
            <div className="search-container">
            <i class="fas fa-search search-icon"></i>
            <input type="text" placeholder="Search" />
            </div>
          </form>
        </div>
      </div>

      <div className="events-table">
        <table>
          <thead>
            <tr>
              <th>EVENT</th>
              <th>DATE</th>
              <th>VENUE</th>
              <th>MORE</th>
            </tr>
          </thead>
          <tbody>
           <Past_Event/>
          </tbody>
        </table>
      </div> */}
      <div style={{ height: "80px" }}></div>
    </>
  );
};

export default Events;
