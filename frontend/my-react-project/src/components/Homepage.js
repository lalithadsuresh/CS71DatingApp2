import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import "./Main.css";

const Homepage = () => {

  const { user, isLoading } = useAuth0();
  const [users, setUsers] = useState([]);
  console.log("Is loading:", isLoading);
  console.log("Users:", users);
  
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
  

  // get all users in database that the current user hasn't swiped on
  // display them as cards here 

  return (
    <>
    <div className="container">
        <h1 className="titleMain">Unmasked</h1>
        <p className="subtitle">No pictures, just personality - unmask your true connection.</p>
    </div>
    
    <div className="user-card-container">
      {isLoading ? (
        <p className = "text">Loading users...</p>
      ) : users.length === 0 ? (
        <p className="text">No users to display.</p>
      ) : (
        users.map((u) => (
          <div key={u.auth0UserId} className="profile-card">
            <h3>{u.name}</h3>
            <p>{u.bio}</p>
          </div>
        ))
      )}
    </div>
    </>

  );
};

export default Homepage;
