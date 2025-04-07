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
    job: ''
  });

  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log("Fetching profile for:", user?.sub);
        const response = await axios.get(`http://localhost:5000/api/users/profile/${user?.sub}`);
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
            job: profile.job || ''
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form...");
    console.log("Form data:", formData);
  
    try {
      const response = await axios.put('http://localhost:5000/api/users/update', {
        ...formData,
        auth0UserId: user.sub
      });
  
      console.log("Response from server:", response.data);
      alert("Changes saved!");
    } catch (err) {
      console.error("Error saving profile", err.response?.data || err.message);
      alert("Failed to save changes.");
    }
  };
  


  return (

    <div className="container py-5">
      <form onSubmit={handleSubmit}>
        <h2 className="mb-5">Edit Your Profile</h2>

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
          <div className="form-group mb-4" key={idx}>
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

        <div className="form-group mb-4">
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

        <div className="form-group mb-4">
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

        <button type="submit" className="btn btn-primary mt-4">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Profile;
