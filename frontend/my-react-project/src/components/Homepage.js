// src/components/Homepage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import './Main.css';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Homepage = () => {
  const { user, isLoading } = useAuth0();
  const [users, setUsers] = useState([]);
  const [matches, setMatches] = useState([]);
  const [flippedCards, setFlippedCards] = useState({});

  const aboutYouOptions = [
    { label: "What are your hobbies?", name: "hobbies" },
    { label: "What are your dealbreakers?", name: "dealbreakers" },
    { label: "What is your best joke?", name: "bestJoke" },
    { label: "Who would you want as a dinner guest?", name: "dinnerGuest" },
    { label: "What would be a 'perfect' day for you?", name: "perfectDay" },
    { label: "What would your final meal be?", name: "finalMeal" },
    { label: "What are you most grateful for in your life?", name: "mostGrateful" },
    { label: "What’s your greatest accomplishment?", name: "accomplishment" },
    { label: "What do you value most in a friendship?", name: "valueFriendship" },
    { label: "What’s your most treasured memory?", name: "treasuredMemory" },
    { label: "What’s your most terrible memory?", name: "terribleMemory" },
    { label: "What is your love language?", name: "loveLanguage" },
    { label: "When was the last time you cried and why?", name: "lastCried" },
    { label: "What, if anything, is too serious to be joked about?", name: "seriousJoke" },
    { label: "Favorite travel destination?", name: "travelDestination" },
    { label: "Which country/city do you want to visit next?", name: "nextCity" }
  ];

  useEffect(() => {
    const fetchUsersDisplayed = async () => {
      if (!user || isLoading) return;

      try {
        const currentUserId = user.sub;
        const res = await axios.get(
          `${BASE_URL}/api/profile/fetchusers/${currentUserId}`
        );
        setUsers(res.data || []);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };

    fetchUsersDisplayed();
  }, [user, isLoading]);

  const handleAccept = async (acceptedUser) => {
    try {
      await axios.post(
        `${BASE_URL}/api/profile/accept`,
        {
          userId: user.sub,
          targetUserId: acceptedUser.auth0UserId,
        }
      );

      const matchRes = await axios.post(
        `${BASE_URL}/api/profile/checkMatch`,
        {
          userId: user.sub,
          targetUserId: acceptedUser.auth0UserId,
        }
      );

      if (matchRes.data.match) {
        setMatches((prev) => [...prev, acceptedUser]);
        console.log('MATCHED USERS');
      }

      setUsers((prev) =>
        prev.filter((u) => u.auth0UserId !== acceptedUser.auth0UserId)
      );
    } catch (error) {
      console.error('Error accepting user:', error);
    }
  };

  const handleDecline = async (declinedUser) => {
    try {
      await axios.post(
        `${BASE_URL}/api/profile/decline`,
        {
          userId: user.sub,
          targetUserId: declinedUser.auth0UserId,
        }
      );

      setUsers((prev) =>
        prev.filter((u) => u.auth0UserId !== declinedUser.auth0UserId)
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
        <p className="subtitle">
          Personality first, pictures second – unmask your true connection.
        </p>
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
                className={`profile-card flip-container ${
                  isFlipped ? 'flipped' : ''
                }`}
                onClick={() => toggleFlip(u.auth0UserId)}
              >
                <div className="flipper">
                  {/* FRONT */}
                  <div className="front">
                    <h2>
                      {u.name} – {u.pronouns}
                    </h2>
                    <div className="cardinfo">
                      <p className="cardtext">Age: {u.age}</p>
                      <p className="cardtext">Location: {u.location}</p>
                      <p className="cardtext">Job: {u.job}</p>
                      <p className="cardtext">{u.relationshipType}</p>
                      <p className="cardtext">Education: {u.education}</p>
                      <p className="cardtext">Sexuality: {u.datePreference}</p>
                    </div>
                    <h3>Bio:</h3>
                    <p className="bio">{u.bio}</p>
                  </div>

                  {/* BACK */}
                  <div className="back">
                    <div className="about-section">
                      <h4 className="about-header">About {u.name}</h4>
                      <ul className="about-list">
                        {aboutYouOptions
                          .filter(
                            ({ name }) =>
                              u[name] && u[name].trim() !== ''
                          )
                          .slice(0, 5)
                          .map(({ name, label }) => (
                            <li key={name} className="about-item">
                              <strong>{label}:</strong> {u[name]}
                            </li>
                          ))}
                      </ul>
                      <img
                        className="profile-img"
                        src={u.profileImage}
                        alt={`${u.name}'s avatar`}
                      />
                    </div>

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
