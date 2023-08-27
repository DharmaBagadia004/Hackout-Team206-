import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  function whatsappAlert() {
    alert("Message Us on +91 9512199416");
  }

  function EmailAlert() {
    alert("Mail us on nirmalchaudhary@gmail.com");
  }

  function AppointmentQuery() {
    alert("Contact us on +91 9265398735");
  }
  return (
    <>
      <div id="footer">
        <div className="containerFooter">
          <div className="row1">
            <div className="footer-col">
              <h4>
                <b>Quick links</b>
              </h4>
              <ul>
                <li>
                  <NavLink>Home</NavLink>
                </li>
                <li>
                  <NavLink>Events</NavLink>
                </li>
                <li>
                  <NavLink>Achievements</NavLink>
                </li>
                <li>
                  <NavLink>Services</NavLink>
                </li>
              </ul>
            </div>
            <div class="footer-col">
              <h4>
                <b>get help</b>
              </h4>
              <ul>
                <li>
                  <NavLink>Contact us</NavLink>{" "}
                </li>
                <li>
                  <NavLink>Email</NavLink>
                </li>
                <li>
                  <NavLink>Appointment Query</NavLink>
                </li>
                <li>
                  <NavLink>Whatsapp</NavLink>
                </li>
              </ul>
            </div>
            <div class="footer-col">
              <h4>
                <b>PARTNERS</b>
              </h4>
              <ul>
                <li>
                  <NavLink>General Partners</NavLink>
                </li>
                <li>
                  <NavLink>Special Partners</NavLink>
                </li>
                <li>
                  <NavLink>General Partners</NavLink>
                </li>
                <li>
                  <NavLink>Special Partners</NavLink>
                </li>
              </ul>
            </div>
            <div class="footer-col">
              <h4>
                <b>Schedule</b>
              </h4>
              <ul>
                <li>
                  <NavLink>Mon-Fri : 9:30 to 19:00</NavLink>
                </li>
                <li>
                  <NavLink>Sat : 11:00 to 15:00</NavLink>
                </li>
                <li>
                  <NavLink>Sun : Only emergencies</NavLink>
                </li>
              </ul>
            </div>
            <div class="footer-col">
              <h4>
                <b>follow us</b>
              </h4>
              <div class="social-links">
                <NavLink>
                  <i class="fab fa-facebook-f"></i>
                </NavLink>

                <NavLink>
                  <i class="fab fa-twitter"></i>
                </NavLink>

                <NavLink>
                  <i class="fab fa-instagram"></i>
                </NavLink>

                <NavLink>
                  <i class="fab fa-linkedin-in"></i>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
