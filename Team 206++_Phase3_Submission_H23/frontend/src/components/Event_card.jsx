import React, { useState } from "react";
import EventApi from "../API/EventApi";
const Event_card = () => {
  const [data, setData] = useState(EventApi);
  return (
    <>
      <div className="event-container">
        {data.map((curEle) => {
            return (
              
                <div className="event-square" key={curEle.id}>
                  <img  src={curEle.photo} alt="" />
                  <p  className="event-date">{curEle.date}</p>
                  <p  className="event-name">{curEle.event_name}</p>
                  <p  className="event-type">{curEle.event_type}</p>
                  <p className="event-dis">{curEle.discription}</p>
                  <button className="event-btn">Register</button>
                </div>
              
            );
          
        })}
      </div>
    </>
  );
};

export default Event_card;
