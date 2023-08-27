import React,{useState,useEffect} from 'react'
import Event_card from "../components/Event_card_home"
import { NavLink } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useContext } from 'react'
import axios from 'axios'


const Home = () => {

  const [events1, setEvents1] = useState([]);
  useEffect(() => {
    // Fetch the data from the backend
    
      axios
      .get(`http://localhost:5000/api/events/event/${4}`)
      .then((response) => {
        // console.log(response.data)
        setEvents1(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    },[]);
   

  return (
    <>
      <div className="container-top">
        <div className="image" data-aos="fade-right">
          <img src="photo/dsc1.jpg" alt="your image description" />
        </div>
        <div className="content" data-aos="fade-left">
          <h1 className="heading-top">MAKE GOOD THINGS TOGETHER</h1>
          <p className="info-top">Google Developers Group is an initiative to concentrate the efforts of many developers in and around to learn, share and get productive using the various Google products.</p>
          <button className="top-btn">Become A Member</button>
          <button className="top-btn1">Learn More</button>
        </div>
      </div>
      <div className="what-we-do" data-aos="fade-up"
     data-aos-anchor-placement="center-bottom">
        <div className="wwd01">
          <h2 className="heading-what-we-do">WHAT WE DO?</h2>
          <p>Google Developer Groups (GDGs) are for developers who are interested in Google's developer technology.</p>
          <p style={{ marginTop: '1rem' }}>About different Google technologies</p>
        </div>  
        <div className="wwd02">
          <div className="group">
          <i className="fas fa-message wwd02-icons"></i>
            <h4>TALKS</h4>
            <p>Get updated with the latest news and announcements</p>
          </div>
          <div className="group">
          <i className="fas fa-code wwd02-icons"></i>
            <h4>CODE LABS</h4>
            <p>Get hands-on experience and guidance from the community members</p>
          </div>
          <div className="group">
          <i className="fas fa-graduation-cap wwd02-icons"></i>
            <h4>CAMPUS ROADSHOWS</h4>
            <p>Share knowledge in different Companies, colleges and universities</p>
          </div>
          <div className="group">
          <i className="fas fa-circle-nodes wwd02-icons"></i>
            <h4>LIVE VIEWING PARTIES</h4>
            <p>Share knowledge in different Companies, colleges and universities</p>
          </div>
        </div>
      </div>

      <div className="app-name">
        <h2>ABOUT APP NAME</h2>
        <p>Google Developer Group is inspired by GTUG/GDG Family. We started our journey in Feb 2011. We try to engage student developers, fresh graduates, and professionals through our hack events & meetups. The motive is to create a local ecosystem of programmers & hackers in and around. Technology awareness is the main goal for the first few years of the group.</p>
        <button className="app-name-btn">Learn More</button>
        <p className="app-name-about">See more about us</p>
      </div>

      <div className="feature-events">
        <h1>OUR FEATURE EVENT & MEETUP</h1>
        <p>Events are listed in reverse chronological order by date.</p>
        <div data-aos="fade-left"
            data-aos-offset="100">
        <Event_card ev={events1}/>
        {/* {events} */}
        </div>
      </div>
      <div>
      <NavLink to="/Events" className="eventlink btn3">Show More</NavLink>
      </div>
    </>
  )
}
AOS.init({
  duration:600
});
export default Home

