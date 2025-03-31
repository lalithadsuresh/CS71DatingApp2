import React from 'react';
import "./Main.css";

{/* <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat+Alternates:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"></link> */}
const Profile = () => {
  return (
    <div className="container">
      <h1 className="title">Unmasked</h1>
      <p className="subtitle">No pictures, just personality - unmask your true connection.</p>
      
      <div className="profile-card">
        <h2 className="name">Natassia</h2>
        <textarea className="question" placeholder="Your essence in a sentence..."></textarea>
        <input className="question" type="text" placeholder="Question 2" />
        <input className="question" type="text" placeholder="Question 3" />
        <input className="question" type="text" placeholder="Question 4" />
      </div>
      
    </div>
  );
};

export default Profile;
