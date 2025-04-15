import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import './Main.css';

const Homepage = () => {
  const { user, isLoading } = useAuth0();
  const [users, setUsers] = useState([]);
  const [matches, setMatches] = useState([]);
  const [flippedCards, setFlippedCards] = useState({});

  useEffect(() => {
    const fetchUsersDisplayed = async () => {
      if (!user || isLoading) return;

      try {
        const currentUserId = user.sub;
        const res = await axios.get(`http://localhost:5001/api/profile/fetchusers/${currentUserId}`);
        setUsers(res.data || []);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };

    fetchUsersDisplayed();
  }, [user, isLoading]);

  const handleAccept = async (acceptedUser) => {
    try {
      await axios.post('http://localhost:5001/api/profile/accept', {
        userId: user.sub,
        targetUserId: acceptedUser.auth0UserId,
      });

      const matchRes = await axios.post('http://localhost:5001/api/profile/checkMatch', {
        userId: user.sub,
        targetUserId: acceptedUser.auth0UserId,
      });

      if (matchRes.data.match) {
        setMatches((prevMatches) => [...prevMatches, acceptedUser]);
        console.log('MATCHED USERS');
      }

      setUsers((prevUsers) =>
        prevUsers.filter((u) => u.auth0UserId !== acceptedUser.auth0UserId)
      );
    } catch (error) {
      console.error('Error accepting user:', error);
    }
  };

  const handleDecline = async (declinedUser) => {
    try {
      await axios.post('http://localhost:5001/api/profile/decline', {
        userId: user.sub,
        targetUserId: declinedUser.auth0UserId,
      });

      setUsers((prevUsers) =>
        prevUsers.filter((u) => u.auth0UserId !== declinedUser.auth0UserId)
      );
    } catch (error) {
      console.error('Error declining user:', error);
    }
  };

  const toggleFlip = (userId) => {
    setFlippedCards((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  return (
    <div className="page">
      <div className="container">
        <h1 className="titleMain">Unmasked</h1>
        <p className="subtitle">No pictures, just personality - unmask your true connection.</p>
      </div>

      <div className="card-wrapper">
        {isLoading ? (
          <p className="text">Loading users...</p>
        ) : users.length === 0 ? (
          <p className="text">No users to display.</p>
        ) : (
          users.map((u) => {
            const isFlipped = flippedCards[u.auth0UserId] || false;

            return (
              <div
                key={u.auth0UserId}
                className={`profile-card flip-container ${isFlipped ? 'flipped' : ''}`}
                onClick={() => toggleFlip(u.auth0UserId)}
              >
                <div className="flipper">
                  {/* FRONT */}
                  <div className="front">
                    <h2>
                      {u.name} - {u.pronouns}
                    </h2>
                    <p className="cardtext">{u.age}</p>
                    <p className="cardtext">{u.location}</p>
                    <p className="cardtext">{u.job}</p>
                    <p className="cardtext">{u.relationshipType}</p>
                    <p className="bio">{u.bio}</p>
                  </div>

                  {/* BACK */}
                  <div className="back">
                    <div className="card-buttons">
                      <button
                        className="cardbutton"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAccept(u);
                        }}
                      >
                        Accept
                      </button>
                      <button
                        className="cardbutton"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDecline(u);
                        }}
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Homepage;
