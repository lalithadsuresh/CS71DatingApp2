
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import "./Main.css";

const Homepage = () => {

  const { user, isLoading } = useAuth0();
  const [users, setUsers] = useState([]);

  useEffect(() => {

      const fetchUsersDisplayed = async () => {
      if (!user || isLoading) return;

        try {
          const currentUserId = user.sub;
          const res = await axios.get(`http://localhost:5000/api/profile/fetchusers/${currentUserId}`);
          setUsers(res.data || []);
          console.log(res.data);
          

        } catch (err) {
          console.error("Error");
        }
    };

    fetchUsersDisplayed();

  }, [user, isLoading]);
  

  /*
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
      
      */ 
      {/* <div className="nav-links"> */}
        {/* <a href="Matches.js" className="link">Your Matches</a> */}
        {/* <a href="Settings.js" className="link">Settings</a> */}
        {/* <a href="Profile.js" className="link">Profile</a> */}
        {/* <button className="match-button">Match</button> */}
      {/* </div>  */}
  

  // get all users in database that the current user hasn't swiped on
  // display them as cards here 

  return (
    <div className="user-card-container">
      {isLoading ? (
        <p>Loading users...</p>
      ) : users.length === 0 ? (
        <p>No users to display.</p>
      ) : (
        users.map((u) => (
          <div key={u.auth0UserId} className="user-card">
            <h3>{u.name}</h3>
            <p>{u.bio}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Homepage;
