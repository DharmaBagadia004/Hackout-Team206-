import React, { useState } from "react";
import EventApi from "../API/EventApi";
import { NavLink } from "react-router-dom";


const Event_card_home = (props) => {
  const [data, setData] = useState(EventApi);
  const {ev} = props

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  return (
    <>
      <div className="home_card">
        {ev.slice(0,5).map((curEle) => {
          return (
            
              <div className="card mb-3" style={{ maxWidth: '540px' }} key={curEle._id}>
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
                      <p className="card-text d11">
                      {curEle.description}
                      </p>
                      <p className="card-text">
                        <small className="text-muted">
                        {formatDate(curEle.date)}
                        </small>
                      </p>
                    </div>

                  </div>
                </div>
              </div>
            
          );
        })}
      </div>
    </>
  );
};

export default Event_card_home;
