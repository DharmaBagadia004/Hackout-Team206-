import React from 'react'

const About = () => {
  return (
    <>
      <div className="about-info-div">
        <div style={{ height: "90px" }}></div>
        <h1 className='common-heading'>ABOUT US</h1>
      </div>

      <div className="about-container-top">
        <div className="about-image">
          <img src="photo/about.jpg" alt="your image description" />
        </div>
        <div className="about-content">
        <div> 
        <p className="about-info-top">
            Google Developer Group Jalandhar is inspired by GTUG/GDG Family. We
            started our journey in Feb 2011. We try to engage student developers,
            fresh graduates, and professionals through our hack events & meetups.
            The motive is to create a local ecosystem of programmers & hackers in
            and around Jalandhar. Technology awareness is the main goal for the
            first few years of the group.
          </p>
          <button className="about-top-btn">Become A Member</button>
          <button className="about-top-btn1">Learn More</button>

        </div>
          
        </div>
      </div>
      <div style={{ height: "50px" }}></div>

      <div className="accordion-info-div">
        <div style={{ height: "50px" }}></div>
        <h1>COMMUNITY GUIDELINES</h1>
      </div>
      <div className="accordion-container">
        <button className="accordion">Be Nice<i className="arrow"></i></button>
        <div className="panel">
          <p>We're all part of the same community, so be friendly, welcoming, and generally a nice person. Be someone that other people want to be around.</p>
        </div>

        <button className="accordion">Be Respectful and Constructive<i className="arrow"></i></button>
        <div className="panel">
          <p>Remember to be respectful and constructive with your communication to fellow members. Don't get into flamewars, make personal attacks, vent, or rant unconstructively. Everyone should take responsibility for the community and take the initiative to diffuse tension and stop a negative thread as early as possible.</p>
        </div>

        <button className="accordion">Be Collaborative<i className="arrow"></i></button>
        <div className="panel">
          <p>Work together! We can learn a lot from each other. Share knowledge, and help each other out.</p>
        </div>
      </div>

      <div className="codeconduct">
        <h1>CODE OF CONDUCT</h1>
        <p>When you join our programs, you’re joining a community. And like any growing community, a few ground rules about expected behavior are good for everyone. These guidelines cover both online (e.g., mailing lists, social channels) and offline (e.g., in-person meetups) behavior. Violations of this code of conduct can result in members being removed from the program. Use your best judgment, and if you’d like more clarity or have questions feel free to reach out.</p>
      </div>

      <div className="antiharass">
        <h1>ANTI-HARASSMENT POLICY</h1>
        <h3>Why do we have an official Anti-Harassment policy for App Name events?</h3>
        <ul>
          <li>It sets expectations for behavior at the event. Simply having an anti-harassment policy can prevent harassment.</li>
          <li>It encourages people to attend who have had bad experiences at other events</li>
          <li>It gives event staff/volunteers instructions on how to handle harassment quickly, with a minimum amount of disruption for the event.</li>
        </ul>
        <h2>App Name is dedicated to providing a harassment-free event experience for everyone, regardless of:</h2>
        <ul>
          <li>Gender</li>
          <li>Sexual Orientation</li>
          <li>Disability</li>
          <li>Gender Identity</li>
          <li>Age</li>
          <li>Race</li>
          <li>Religion</li>
          <li>Nationality</li>
        </ul>
        <p>The above is not an exhaustive list -- we do not tolerate harassment of event participants in any form.</p>
        <p>Sexual language and imagery are not appropriate for any event venue, including talks. Event participants violating these rules may be expelled from the event and event banned from future events at the discretion of the event organizers/management.</p>
        <p>Harassment includes (but is not limited to):</p>
        <ul>
          <li>Offensive verbal comments related to gender, sexual orientation, disability, gender identity, age, race, religion</li>
          <li>The use or display of sexual images in public spaces</li>
          <li>Deliberate intimidation</li>
          <li>Stalking</li>
          <li>Harassing photography or recording</li>
          <li>Sustained disruption of talks or other events</li>
          <li>Inappropriate physical contact</li>
          <li>Unwelcome sexual attention</li>
        </ul>
        <p>Participants asked to stop any harassing behavior are expected to comply immediately.</p>
        <p>Exhibiting partners and guests are also subject to the anti-harassment policy. In particular, exhibitors and speakers should not use sexualized images, activities, or other material, or otherwise create a sexualized environment in their slide decks, exhibit material, exhibit staffing, promotional items, or demo material.</p>
        <p>If you are being harassed, notice that someone else is being harassed, or have any other concerns, please contact an organizer or event volunteer immediately. Organizers and event volunteers may be identified by t-shirts or special badges/lanyards. Organizers will investigate the issue and take appropriate action. This may include helping participants contact venue security or local law enforcement, providing escorts, or otherwise assisting those experiencing harassment to feel safe for the duration of the event.</p>
        <p>Though we hope that we never have to invoke this policy, we believe that having this document helps everyone think a little more about how their actions and words affect the whole community, as well as individuals in the community.</p>
      </div>

      <div style={{ height: "40px" }}></div>
    </>
  )
}

export default About
