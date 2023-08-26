import React, { useState, useEffect } from "react";
import axios from "axios";

const EventConduct = () => {
  const [eventname, setEventName] = useState("");
  const [eventtype, setEventType] = useState("");
  const [eventdate, setEventDate] = useState("");
  const [eventtime, setEventTime] = useState("");
  const [description, setDescription] = useState("");
  const [eventposter, setEventPoster] = useState(null);
  const [eventlocation, setEventLocation] = useState("");
  const [eventmode, setEventMode] = useState("online");
  const [eventLink, setEventLink] = useState("");
  const [events, setEvents] = useState([]);
  axios.defaults.withCredentials = true;

  useEffect(() => {
    // Fetch the data from the backend
    axios
      .get(`http://localhost:5000/api/event/${0}`)
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(`eventname : ${eventName} , eventType : ${eventType} , startDate : ${startDate} , endDate : ${endDate} ,startTime : ${startTime} , endTime : ${endTime} , description : ${description} , eventPoster : ${eventPoster} , eventLink : ${eventLink}`)
    try {
      const formData = new FormData();
      formData.append("eventName", eventname);
      formData.append("date", eventdate);
      formData.append("time", eventtime);
      formData.append("description", description);
      formData.append("eventLink", eventLink);
      formData.append("photo", eventposter);
      formData.append("mode", eventmode);
      formData.append("location", eventlocation);
      // formData.append("location", location);

      const response = await axios.post(
        "http://localhost:5000/api/events/event",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setEvents([...events, response.data]);
      console.log(response.data);
    } catch (error) {
      console.error(error);
      alert("Event with same name already exists please change event name");
    }
  };

  const deleteEvent = (eventId) => {
    axios
      .delete(`http://localhost:5000/api/events/event/${eventId}`)
      .then((response) => {
        console.log(response.data);
        // Remove the deleted blog from the speakers state
        const updatedEvents = events.filter((event) => event._id !== eventId);
        setSpeakers(updatedEvents);
      })
      .catch((error) => {
        console.error("Error:", error);
        window.location.replace("http://localhost:5173/signin");
      });
  };
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  return (
    <>
      <div>
        <div className="reg_head">
          <div className="common-heading ">
            <h1>Conduct new events</h1>
          </div>
        </div>
        <section className="container">
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="form"
          >
            <div className="column">
              <div className="input-box">
                <label htmlFor="eventdate">Event Name:</label>
                <input
                  type="text"
                  name="eventname"
                  id="eventname"
                  placeholder="Event Name"
                  required
                  value={eventname}
                  onChange={(e) => setEventName(e.target.value)}
                />
              </div>

              <div className="input-box">
                <label htmlFor="eventtype">Event Type:</label>
                <div className="select-box">
                  <select
                    name="eventtype"
                    id="eventtype"
                    placeholder="Event Type"
                    required
                    value={eventtype}
                    onChange={(e) => setEventType(e.target.value)}
                  >
                    <option hidden>Event Type</option>
                    <option value="Webinar">Webinar</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Hackathon">Hackathon</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="column">
              <div className="input-box">
                <label htmlFor="eventdate">Event Date:</label>
                <input
                  type="Date"
                  name="eventdate"
                  id="eventdate"
                  placeholder="Enter a Date"
                  required
                  value={eventdate}
                  onChange={(e) => setEventDate(e.target.value)}
                />
              </div>
              <div className="input-box">
                <label htmlFor="eventtime">Event Time:</label>
                <input
                  type="time"
                  name="eventtime"
                  id="eventtime"
                  placeholder=""
                  required
                  value={eventtime}
                  onChange={(e) => setEventTime(e.target.value)}
                />
              </div>
            </div>

            <div className="input-box address">
              <label htmlFor="description">Description:</label>
              <input
                name="description"
                id="description"
                cols="30"
                rows="10"
                placeholder="Description"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></input>
            </div>
            <div className="column">
              <div className="input-box">
                <label htmlFor="description">Event Mode:</label>
                <div className="select-box">
                  <select
                    name="eventmode"
                    id="eventmode"
                    placeholder="Event Mode"
                    required
                    value={eventmode}
                    onChange={(e) => setEventMode(e.target.value)}
                  >
                    <option value="" disabled>
                      Event Mode
                    </option>
                    <option value="online">Online</option>
                    <option value="offline">Offline</option>
                  </select>
                </div>
              </div>

              <div className="input-box ">
                <label htmlFor="eventposter">Event Poster:</label>
                <input
                  type="file"
                  name="eventposter"
                  class="custom-file-input"
                  required
                  onChange={(e) => setEventPoster(e.target.files[0])}
                />
              </div>
            </div>

            <div className="input-box ">
              <label htmlFor="eventlocation">Event Location:</label>
              <div>
                <textarea
                  name="eventlocation"
                  id="eventlocation"
                  placeholder="if online then write online otherwise location"
                  required
                  value={eventlocation}
                  onChange={(e) => setEventLocation(e.target.value)}
                ></textarea>
              </div>
            </div>

            {/* <div className="input-box ">
              <label htmlFor="eventlink" >Event link:</label>
              <input
                type="url"
                name="eventLink"
                id="eventLink"
                placeholder="Event Link"
                required
                value={eventLink}
                onChange={(e) => setEventLink(e.target.value)}
              />
            </div> */}

            <div>
              <input class="btn" type="submit" id="btn1" value="Submit" />
            </div>
          </form>
        </section>
      </div>

      <div className="about-info-div">
        <div style={{ height: "90px" }}></div>
        <h1 className="common-heading">Manage Events :- </h1>
      </div>
      <div className="feature-events f11">
        <div className="event-container">
          {events.map((event) => {
            return (
              <div className="event-square" key={event._id}>
                <img src={event.photo} alt="" />
                <p className="event-date">Date : {formatDate(event.date)}</p>
                <p className="event-name">Name : {event.eventName}</p>
                <p className="event-type">Mode : {event.mode}</p>
                <p className="event-dis d11">Location : {event.location}</p>
                <p className="event-dis d11">
                  Description : {event.description}
                </p>
                <button
                  className="event-btn"
                  onClick={() => deleteEvent(event._id)}
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default EventConduct;
