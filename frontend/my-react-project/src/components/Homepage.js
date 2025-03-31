// import React from 'react';

// const Homepage = () => {
//   return (
//     <div>
//       This is the homepage of our web app, where users 
//       swipe to create matches. 
//     </div>
//   );
// };

// export default Homepage;


import React from 'react';
import "./Main.css";

const Homepage = () => {
  return (
    <div className="container">
      <h1 className="title">Unmasked</h1>
      <p className="subtitle">No pictures, just personality - unmask your true connection.</p>
      
      <div className="profile-card">
        <h2 className="name">Natassia</h2>
        <input className="question" type="text" placeholder="Your essence in a sentence"/>
        <input className="question" type="text" placeholder="Question 2" />
        <input className="question" type="text" placeholder="Question 3" />
        <input className="question" type="text" placeholder="Question 4" />
      </div>
      
      {/* <div className="nav-links"> */}
        {/* <a href="Matches.js" className="link">Your Matches</a> */}
        {/* <a href="Settings.js" className="link">Settings</a> */}
        {/* <a href="Profile.js" className="link">Profile</a> */}
        {/* <button className="match-button">Match</button> */}
      {/* </div>  */}
    </div>
  );
};

export default Homepage;
