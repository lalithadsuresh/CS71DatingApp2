import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import "./Main.css";

const Homepage = () => {

  const { user, isLoading } = useAuth0();
  const [users, setUsers] = useState([]);
  const [matches, setMatches] = useState([]);
  console.log("Is loading:", isLoading);
  console.log("Users:", users);
  
  useEffect(() => {

      const fetchUsersDisplayed = async () => {
      if (!user || isLoading) return;

        try {
          const currentUserId = user.sub;
          const res = await axios.get(`http://localhost:5001/api/profile/fetchusers/${currentUserId}`);
          setUsers(res.data || []);
          console.log(res.data);
          

        } catch (err) {
          console.error("Error");
        }
    };

    fetchUsersDisplayed();

  }, [user, isLoading]);

  const handleAccept = async (acceptedUser) => {
    try {
      await axios.post("http://localhost:5001/api/profile/accept", {
        userId: user.sub,
        targetUserId: acceptedUser.auth0UserId,
      });

      const matchRes = await axios.post("http://localhost:5001/api/profile/checkMatch", {
        userId: user.sub,
        targetUserId: acceptedUser.auth0UserId,
      });
      
      if (matchRes.data.match) {

        // for the original user and current user, place the cards in the matches
        // section with their respective social media handles

        // prevMatches = prevMatches += acceptedUser

        setMatches((prevMatches) => [...prevMatches, acceptedUser]);
        

        console.log("MATCHED USERS");
      }

      // To prevent the appearance of an accepted user
  
      setUsers((prevUsers) =>
        prevUsers.filter((u) => u.auth0UserId !== acceptedUser.auth0UserId)
      );
    } catch (error) {
      console.error("Error accepting user:", error);
    }
  };
  
  const handleDecline = async (declinedUser) => {
    try {
      await axios.post("http://localhost:5001/api/profile/decline", {
        userId: user.sub,
        targetUserId: declinedUser.auth0UserId,
      });
  
      // To prevent the appearance of a declined user
      setUsers((prevUsers) =>
        prevUsers.filter((u) => u.auth0UserId !== declinedUser.auth0UserId)
      );
    } catch (error) {
      console.error("Error declining user:", error);
    }
  };

  

  // get all users in database that the current user hasn't swiped on
  // display them as cards here 

  return (
    <div className = "page">
      <div className="container">
          <h1 className="titleMain">Unmasked</h1>
          <p className="subtitle">No pictures, just personality - unmask your true connection.</p>
      </div>
      
      <div className="card-wrapper">
        {isLoading ? (
          <p className = "text">Loading users...</p>
        ) : users.length === 0 ? (
          <p className="text">No users to display.</p>
        ) : (
          users.map((u) => (
            <div key={u.auth0UserId} className="profile-card">
              <h2>{u.name}</h2>
              <p className = "text" >{u.age}</p>
              <p className = "text" >{u.location}</p>
              <p  className = "bio" >{u.bio}</p>

              <div className="card-buttons">
                <button onClick={() => handleAccept(u)}>Accept</button>
                <button onClick={() => handleDecline(u)}>Decline</button>
              </div>

            </div>
          ))
        )}
      </div>
    </div>

  );
};

export default Homepage;
