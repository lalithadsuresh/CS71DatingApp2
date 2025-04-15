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
  const [editProfileImage, seteditProfileImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/users/profile/${user?.sub}`);
        if (response.data) {
          const profile = response.data;
          setFormData((prev) => ({
            ...prev,
            ...profile
          }));
          seteditProfileImage(profile.profileImage || '');
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
    const file = e.target.files[0];
    setProfileImage(file);
    if (file) {
      seteditProfileImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting profile data...");

    try {
      let imageUrl = editProfileImage;

      if (profileImage) {
        const data = new FormData();
        data.append("file", profileImage);
        data.append("upload_preset", "cloudinary_unmasked");

        const cloudinaryRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dmnlqvcqt/image/upload",
          data
        );

        imageUrl = cloudinaryRes.data.secure_url;
        console.log("Uploaded to Cloudinary:", imageUrl);
      }

      const updatedProfile = {
        ...formData,
        profileImage: imageUrl,
        auth0UserId: user.sub,
      };

      const response = await axios.put("http://localhost:5001/api/users/update", updatedProfile);
      console.log("Profile updated:", response.data);
      alert("Changes saved!");
    } catch (err) {
      console.error("Error saving profile", err.response?.data || err.message);
      alert("Failed to save changes.");
    }
  };

  return (
    <div className="page">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <h2 className="title">Edit Info</h2>

          {[
            "name", "age", "location", "pronouns", "genderIdentity", "datePreference",
            "relationshipType", "ethnicity", "religion", "bio", "education", "job",
            "hobbies", "dealbreakers", "bestJoke", "dinnerGuest", "perfectDay",
            "finalMeal", "mostGrateful", "accomplishment", "valueFriendship",
            "treasuredMemory", "terribleMemory", "loveLanguage", "lastCried",
            "seriousJoke", "travelDestination", "nextCity"
          ].map((field, idx) => (
            <div className="form-group" key={idx}>
              <label htmlFor={field}>
                {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, " $1")}
              </label>
              <textarea
                name={field}
                id={field}
                value={formData[field]}
                className="form-control"
                onChange={handleChange}
                rows="2"
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
