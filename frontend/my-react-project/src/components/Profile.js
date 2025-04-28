import axios from "axios";
import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user } = useAuth0();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '', age: '', location: '', pronouns: '', genderIdentity: '',
    datePreference: '', relationshipType: '', ethnicity: '', religion: '',
    bio: '', education: '', job: '', socialMediaHandle: ''
  });

  const [aboutAnswers, setAboutAnswers] = useState({});
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const [editProfileImage, setEditProfileImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/api/users/profile/${user?.sub}`
        );
        const profile = res.data;

        const aboutFields = {};
        const selected = [];
        aboutYouOptions.forEach(opt => {
          if (profile[opt.name]) {
            aboutFields[opt.name] = profile[opt.name]; // if user's profile has info, then update field accordingly
            selected.push(opt.name); // record in selected array section
          }
        });

        setFormData((prev) => ({
          ...prev,
          ...profile
        }));
        setAboutAnswers(aboutFields);
        setSelectedQuestions(selected);
        setEditProfileImage(profile.profileImage || '');
      } catch (err) {
        console.error("Error fetching profile", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (user?.sub) fetchProfile();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (selectedQuestions.includes(name)) {
      setAboutAnswers((prev) => ({ ...prev, [name]: value }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
    if (file) setEditProfileImage(URL.createObjectURL(file));
  };

  // submit questions + registration / profile information
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = editProfileImage;

      if (profileImage && typeof profileImage !== "string") {
        const data = new FormData();
        data.append("file", profileImage);
        data.append("upload_preset", "cloudinary_unmasked");

        const cloudRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dmnlqvcqt/image/upload",
          data
        );
        imageUrl = cloudRes.data.secure_url;
      }

      const selectedAnswersOnly = {};
      selectedQuestions.forEach((key) => {
        selectedAnswersOnly[key] = aboutAnswers[key] || "";
      });
      
      const updatedProfile = {
        ...formData,
        ...selectedAnswersOnly,
        profileImage: imageUrl,
        auth0UserId: user.sub
      };
      
      const res = await axios.put(
        `${BASE_URL}/api/users/update`,
        updatedProfile
      );
      alert("Changes saved!");
    } catch (err) {
      console.error("Error saving profile", err);
      alert("Failed to save changes.");
    }
  };

  return (
    <div className="page">
      <div className="container">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <h2 className="title">Edit Info</h2>

          {[
            { label: "Name", name: "name" }, { label: "Age", name: "age", type: "number" },
            { label: "Location", name: "location" }, { label: "Pronouns", name: "pronouns" },
            { label: "Gender Identity", name: "genderIdentity" },
            { label: "Sexuality", name: "datePreference" },
            { label: "Ethnicity", name: "ethnicity" }, { label: "Religion", name: "religion" },
            { label: "Education", name: "education" }, { label: "Job", name: "job" }, { label: "Social Media Handle", name: "socialMediaHandle"}
          ].map(({ label, name, type = "text" }) => (
            <div className="text" key={name}>
              <label htmlFor={name}>{label}</label>
              <input
                type={type}
                name={name}
                value={formData[name] || ''}
                className="form-control"
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
              rows="3"
              onChange={handleChange}
            />
          </div>

          <h4 className="mt-4">About You (Choose up to 5)</h4>
          {aboutYouOptions.map(({ label, name }) => (
            <div className="text" key={name}>
              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`checkbox-${name}`}
                  checked={selectedQuestions.includes(name)}
                  disabled={
                    !selectedQuestions.includes(name) && selectedQuestions.length >= 5
                  }
                  onChange={() => {
                    setSelectedQuestions((prev) =>
                      prev.includes(name)
                        ? prev.filter((qn) => qn !== name)
                        : [...prev, name]
                    );
                  }}
                />
                <label className="form-check-label" htmlFor={`checkbox-${name}`}>
                  {label}
                </label>
              </div>
              {selectedQuestions.includes(name) && (
                <textarea
                  name={name}
                  value={aboutAnswers[name] || ''}
                  className="form-control mb-3"
                  rows="2"
                  onChange={handleChange}
                />
              )}
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

          {editProfileImage && (
            <img className="profile-img" src={editProfileImage} alt="Current Profile" />
          )}

          <button type="submit" className="button">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
