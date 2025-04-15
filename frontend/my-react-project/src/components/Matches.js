import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import "./Main.css";

const Matches = () => {
  const { user, isLoading } = useAuth0();
  const [matches, setMatches] = useState([]);

  const handleUnmatch = async (unmatchedUserId) => {
    try {
      await axios.post("http://localhost:5001/api/profile/unmatch", {
        userId: user.sub, // current user
        targetUserId: unmatchedUserId, // the person to unmatch
      });
  
      // Remove from local matches state
      setMatches((prev) =>
        prev.filter((match) => match.auth0UserId !== unmatchedUserId)
      );
    } catch (err) {
      console.error("Error unmatching:", err);
    }
  };

  useEffect(() => {
    const fetchMatches = async () => {
      if (!user || isLoading) return;

      try {
        const res = await axios.get(`http://localhost:5001/api/profile/getMatches/${user.sub}`);
        setMatches(res.data || []);
        console.log(res.data);
      } catch (err) {
        console.error("Error fetching matches:", err);
      }
    };

    fetchMatches();
  }, [user, isLoading]);

  return (
    <div className='page'>
      <div className='container'>
        <h1 className="title">Matches</h1>
        {matches.length === 0 ? (
          <p className="text">No matches yet. Keep swiping!</p>
        ) : (
          <div className='card-wrapper'>
            {matches.map((match) => (
              <div key={match.auth0UserId} className='profile-card'>

                <div className="flipper">
                  {/* FRONT */}
                  <div className="front">
                    <h2>
                      {match.name} - {match.pronouns}
                    </h2>
                    <div className="cardinfo">
                      <p className="cardtext">Age: {match.age}</p>
                      <p className="cardtext">Location: {match.location}</p>
                      <p className="cardtext">Job: {match.job}</p> 
                      <p className='cardtext'>{match.relationshipType}</p>
                      <p className='cardtext'>Education: {match.education}</p>
                      <p className='cardtext'>Sexuality: {match.datePreference}</p>
                    </div>
                      <h3>Bio:</h3>                      
                      <p className="bio">{match.bio}</p>
                  </div>
                </div>
                <p className="bio"> Social Media: {match.socialMediaHandle}</p>

                <img
                  src={match.profileImage}
                  alt={`${match.name}'s profile`}
                  className="profile-img"
                />
                  <button className="logoutbutton" onClick={() => handleUnmatch(match.auth0UserId)}>Unmatch</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Matches;