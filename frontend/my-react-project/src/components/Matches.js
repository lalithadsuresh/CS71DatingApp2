import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import "./Main.css";

const Matches = () => {

  const BASE_URL = process.env.REACT_APP_BASE_URL;
  
  const { user, isLoading } = useAuth0();
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
  
  

  const handleUnmatch = async (unmatchedUserId) => {
    try {
      await axios.post(
        `${BASE_URL}/api/profile/unmatch`,
        {
          userId: user.sub,
          targetUserId: unmatchedUserId,
        }
      );
  
      // Remove from local matches state
      setMatches((prev) =>
        prev.filter((match) => match.auth0UserId !== unmatchedUserId)
      );
    } catch (err) {
      console.error("Error unmatching:", err);
    }
  };

  const toggleFlip = (userId) => {
    setFlippedCards((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  useEffect(() => {
    const fetchMatches = async () => {
      if (!user || isLoading) return;

      try {
        const res = await axios.get(
          `${BASE_URL}/api/profile/getMatches/${user.sub}`
        );
        setMatches(res.data || []);
        console.log(res.data);
      } catch (err) {
        console.error("Error fetching matches:", err);
      }
    };

    fetchMatches();
  }, [user, isLoading]);

  return (
    <div className="page">
      <div className="container">
        <h1 className="title">Matches</h1>
        {matches.length === 0 ? (
          <p className="text-23">No matches yet. Keep swiping!</p>
        ) : (
          <div className="card-wrapper">
            {matches.map((match) => {
              const isFlipped = flippedCards[match.auth0UserId] || false;
  
              return (
                <div
                  key={match.auth0UserId}
                  className={`profile-card flip-container ${isFlipped ? "flipped" : ""}`}
                  onClick={() => toggleFlip(match.auth0UserId)}
                >
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
                        <p className="cardtext">{match.relationshipType}</p>
                        <p className="cardtext">Education: {match.education}</p>
                        <p className="cardtext">Sexuality: {match.datePreference}</p>
                      </div>
                      <h3>Bio:</h3>
                      <p className="bio">{match.bio}</p>
                    </div>
  
                    {/* BACK */}
                    <div className="back">
                      <div className="about-section">
                        <h4 className="about-header">About {match.name}</h4>
                        <ul className="about-list">
                          {aboutYouOptions
                            .filter(({ name }) => match[name] && match[name].trim() !== "")
                            .slice(0, 5)
                            .map(({ name, label }) => (
                              <li key={name} className="about-item">
                                <strong>{label}:</strong> {match[name]}
                              </li>
                            ))}
                        </ul>
                        <img
                          className="profile-img"
                          src={match.profileImage}
                          alt={`${match.name}'s profile`}
                        />
                        <p className="bio">Social Media: {match.socialMediaHandle}</p>
                        <button
                          className="logoutbutton"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleUnmatch(match.auth0UserId);
                          }}
                        >
                          Unmatch
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
)};
  
export default Matches;