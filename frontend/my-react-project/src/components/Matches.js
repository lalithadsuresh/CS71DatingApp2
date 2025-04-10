import React from 'react';
import "./Main.css"
const Matches = () => {
  return (
    <div className='page'>
      <div className='container'>
        <h1 className="title">Matches</h1>
      </div>
      <div className='card-wrapper'>
        <div className='profile-card'>
                  <h2>Name</h2>
                  <p className = "text" >age</p>
                  <p className = "text" >location</p>
                  <p  className = "bio" >bio</p>
                </div>
      </div>
    </div>
  );
};

export default Matches;
