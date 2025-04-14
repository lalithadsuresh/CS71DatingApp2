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
    
  });
  
  const [profileImage, setProfileImage] = useState(null);
  const [editProfileImage, setEditProfileImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 
  const [aboutAnswers, setAboutAnswers] = useState({});
  const [selectedQuestions, setSelectedQuestions] = useState([]);


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
            profileImage: profile.profileImage || '', 
            genderIdentity: profile.genderIdentity || '',
            datePreference: profile.datePreference || '',
            relationshipType: profile.relationshipType || '',
            ethnicity: profile.ethnicity || '',
            religion: profile.religion || '',
            bio: profile.bio || '',
            education: profile.education || '',
            job: profile.job || '',
          });

          const aboutFields = [
            "hobbies", "dealbreakers", "bestJoke", "dinnerGuest", "perfectDay", "finalMeal",
            "mostGrateful", "accomplishment", "valueFriendship", "treasuredMemory",
            "terribleMemory", "loveLanguage", "lastCried", "seriousJoke", "travelDestination", "nextCity"
          ];
  
          const answered = [];
          const answers = {};

          aboutFields.forEach((field) => {
            if (profile[field]) {
              answered.push(field);
              answers[field] = profile[field];
            }
          });

          setSelectedQuestions(answered);
          setAboutAnswers(answers);
          setEditProfileImage(profile.profileImage || '');
          
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
    if (selectedQuestions.includes(name)) {
      setAboutAnswers((prev) => ({ ...prev, [name]: value }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

const handleImageChange = (e) => {
  const file = e.target.files[0];
  setProfileImage(file);

  if (file) {
    setEditProfileImage(URL.createObjectURL(file));
  }
};

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    let imageUrl = editProfileImage;

    // Upload the image to Cloudinary if a new file was chosen
    if (profileImage) {
      const data = new FormData();
      data.append("file", profileImage);
      data.append("upload_preset", "cloudinary_unmasked");

      const cloudinaryRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dmnlqvcqt/image/upload",
        data
      );

      imageUrl = cloudinaryRes.data.secure_url;
    }

    // Merge all form data + about answers
    const updatedProfile = {
      ...formData,
      ...aboutAnswers,
      profileImage: imageUrl,
      auth0UserId: user.sub,
    };

    const response = await axios.put("http://localhost:5001/api/users/update", updatedProfile);

    alert("Changes saved!");
  } catch (err) {
    console.error("Error saving profile", err);
    alert("Failed to save changes.");
  }
};


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


          <h4 className="mt-5">About You</h4>
          {aboutYouOptions.map((q, idx) => (
            <div className="text" key={idx}>
              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`checkbox-${q.name}`}
                  checked={selectedQuestions.includes(q.name)}
                  disabled={
                    !selectedQuestions.includes(q.name) &&
                    selectedQuestions.length >= 5
                  }
                  onChange={() => {
                    setSelectedQuestions((prev) =>
                      prev.includes(q.name)
                        ? prev.filter((qn) => qn !== q.name)
                        : [...prev, q.name]
                    );
                  }}
                />
                <label className="form-check-label" htmlFor={`checkbox-${q.name}`}>
                  {q.label}
                </label>
              </div>
              {selectedQuestions.includes(q.name) && (
                <textarea
                  name={q.name}
                  value={aboutAnswers[q.name] || ''}
                  className="form-control mb-3"
                  id={q.name}
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

          <button type="submit" className="button">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
