import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import "./Main.css";

const Matches = () => {
  const { user, isLoading } = useAuth0();
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      if (!user || isLoading) return;

      try {
        const res = await axios.get(`http://localhost:5001/api/profile/getMatches/${user.sub}`);
        setMatches(res.data || []);
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
                <h2>{match.name}</h2>
                <p className="text">Age: {match.age}</p>
                <p className="text">Location: {match.location}</p>
                <p className="bio">{match.bio}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Matches;