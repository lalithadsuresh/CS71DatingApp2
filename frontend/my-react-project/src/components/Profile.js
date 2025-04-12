import axios from "axios";
import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user } = useAuth0();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    location: '',
    pronouns: '',
    genderIdentity: '',
    datePreference: '',
    relationshipType: '',
    ethnicity: '',
    religion: '',
    bio: '',
    education: '',
    job: '',
    hobbies: '',
    dealbreakers: '',
    bestJoke: '',
    dinnerGuest: '',
    perfectDay: '',
    finalMeal: '',
    mostGrateful: '',
    accomplishment: '',
    valueFriendship: '',
    treasuredMemory: '',
    terribleMemory: '',
    loveLanguage: '',
    lastCried: '',
    seriousJoke: '',
    travelDestination: '',
    nextCity: ''
  });
  const [profileImage, setProfileImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log("Fetching profile for:", user?.sub);
        const response = await axios.get(`http://localhost:5001/api/users/profile/${user?.sub}`);
        console.log("Profile data loaded:", response.data);

        if (response.data) {
          const profile = response.data;

          setFormData({
            name: profile.name || '',
            age: profile.age || '',
            location: profile.location || '',
            pronouns: profile.pronouns || '',
            genderIdentity: profile.genderIdentity || '',
            datePreference: profile.datePreference || '',
            relationshipType: profile.relationshipType || '',
            ethnicity: profile.ethnicity || '',
            religion: profile.religion || '',
            bio: profile.bio || '',
            education: profile.education || '',
            job: profile.job || '',
            hobbies: profile.hobbies || '',
            dealbreakers: profile.dealbreakers || '',
            bestJoke: profile.bestJoke || '',
            dinnerGuest: profile.dinnerGuest || '',
            perfectDay: profile.perfectDay || '',
            finalMeal: profile.finalMeal || '',
            mostGrateful: profile.mostGrateful || '',
            accomplishment: profile.accomplishment || '',
            valueFriendship: profile.valueFriendship || '',
            treasuredMemory: profile.treasuredMemory || '',
            terribleMemory: profile.terribleMemory || '',
            loveLanguage: profile.loveLanguage || '',
            lastCried: profile.lastCried || '',
            seriousJoke: profile.seriousJoke || '',
            travelDestination: profile.travelDestination || '',
            nextCity: profile.nextCity || ''
          });
        }
      } catch (err) {
        console.error("Error fetching profile", err);
      } finally {
        setIsLoading(false); 
      }
    };

    if (user?.sub) {
      fetchProfile();
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

const handleImageChange = (e) => {
  setProfileImage(e.target.files[0]);
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form...");
    console.log("Form data:", formData);
  
    const submission = new FormData();
    for (const key in formData) {
      submission.append(key, formData[key]);
    }
    if (profileImage) {
      submission.append("profileImage", profileImage);
    }
    submission.append("auth0UserId", user.sub);
  
    try {
      const response = await axios.put(
        "http://localhost:5001/api/users/update",
        submission,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      console.log("Response from server:", response.data);
      alert("Changes saved!");
    } catch (err) {
      console.error("Error saving profile", err.response?.data || err.message);
      alert("Failed to save changes.");
    }
  };
  

  return (

    <div className = "page">
      <div className="container">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <h2 className="title">Edit Info</h2>

          {[
            { label: "Name", name: "name", type: "text" },
            { label: "Age", name: "age", type: "number" },
            { label: "Location", name: "location", type: "text" },
            { label: "Pronouns", name: "pronouns", type: "text" },
            { label: "Gender Identity", name: "genderIdentity", type: "text" },
            { label: "Who do you want to date? (Gender)", name: "datePreference", type: "text" },
            { label: "Ethnicity", name: "ethnicity", type: "text" },
            { label: "Religion", name: "religion", type: "text" },
            { label: "Education", name: "education", type: "text" },
            { label: "Job", name: "job", type: "text" }
          ].map((field, idx) => (
            <div className="text" key={idx}>
              <label htmlFor={field.name}>{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                className="form-control"
                id={field.name}
                onChange={handleChange}
              />
            </div>
          ))}

          <div className="text">
            <label htmlFor="relationshipType">Relationship Type</label>
            <select
              name="relationshipType"
              value={formData.relationshipType}
              className="form-control"
              id="relationshipType"
              onChange={handleChange}
            >
              <option value="">Select an option</option>
              <option>Life Partner</option>
              <option>Long-term Relationship</option>
              <option>Short-term Relationship</option>
              <option>Unsure</option>
              <option>Prefer not to say</option>
            </select>
          </div>

          <div className="text">
            <label htmlFor="bio">Short Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              className="form-control"
              id="bio"
              rows="4"
              onChange={handleChange}
            />
          </div>


          <h4 className="mt-5">About You </h4>

            {[
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
            ].map((field, idx) => (
              <div className="text" key={idx}>
                <label htmlFor={field.name}>{field.label}</label>
                <textarea
                  name={field.name}
                  value={formData[field.name]}
                  className="form-control"
                  id={field.name}
                  rows="2"
                  onChange={handleChange}
                />
              </div>
          ))}


          <div className="form-group mb-4">
            <label htmlFor="profileImage">Update Profile Image</label>
            <input
              type="file"
              accept="image/*"
              className="form-control"
              onChange={handleImageChange}
            />
          </div>

          <button type="submit" className="button">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
