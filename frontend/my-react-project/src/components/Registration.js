import axios from "axios";
import React from "react";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const Registration = () => {

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

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevFormData) => {
            let updatedForm = {...prevFormData};
            updatedForm[name] = value;
            return updatedForm;
        });

    }

    const handleImageChange = (e) => {
        setProfileImage(e.target.files[0]);
    };
    
   

    const handleSubmit = async (e) => {

        e.preventDefault();

        const auth0UserId = user?.sub;

        //send a request to put it into database?

        const submission = new FormData();
        for (const key in formData) {
          submission.append(key, formData[key]);
        }
    
        if (profileImage) {
          submission.append('profileImage', profileImage);
        }
    
        submission.append('auth0UserId', user.sub);
    
        
        try {
            
            const response = await axios.post(
                'http://localhost:5001/api/users/register',
                submission,
                {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                  },
                }
              );
              

              
            navigate("/matches")

            console.log("Success");

        } catch (err) {

            console.log("Error");

        }

    }

    return (



    <div className="page">
        <div className="container">
        <form onSubmit={handleSubmit} encType="multipart/form-data">

                <h2 className="title">Personal Information</h2>

                <div className="text">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        className="form-control"
                        id="name"
                        onChange={handleChange}>
                    </input>
                </div>

                <div className="text">
                    <label htmlFor="age">Age</label>
                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        className="form-control"
                        id="age"
                        onChange={handleChange}>
                    </input>
                </div>

                <div className="text">
                    <label htmlFor="location">Location</label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        className="form-control"
                        id="location"
                        onChange={handleChange}>
                    </input>
                </div>

                <div className="text">
                    <label htmlFor="pronouns">Pronouns</label>
                    <input
                        type="text"
                        name="pronouns"
                        value={formData.pronouns}
                        className="form-control"
                        id="pronouns"
                        onChange={handleChange}>
                    </input>
                </div>

                <div className="text">
                    <label htmlFor="genderIdentity">Gender Identity</label>
                    <input
                        type="text"
                        name="genderIdentity"
                        value={formData.genderIdentity}
                        className="form-control"
                        id="genderIdentity"
                        onChange={handleChange}>
                    </input>
                </div>

                <div className="text">
                    <label htmlFor="datePreference">Who do you want to date? (Gender)</label>
                    <input
                        type="text"
                        name="datePreference"
                        value={formData.datePreference}
                        className="form-control"
                        id="datePreference"
                        onChange={handleChange}>
                    </input>
                </div>

                <div className="text">
                    <label htmlFor="relationshipType">Relationship Type</label>
                    <select
                        name="relationshipType"
                        value={formData.relationshipType}
                        className="form-control"
                        id="relationshipType"
                        onChange={handleChange}>
                        <option value="">Select an option</option>
                        <option>Life Partner</option>
                        <option>Long-term Relationship</option>
                        <option>Short-term Relationship</option>
                        <option>Unsure</option>
                        <option>Prefer not to say</option>
                    </select>
                </div>

                <div className="text">
                    <label htmlFor="ethnicity">Ethnicity</label>
                    <input
                        type="text"
                        name="ethnicity"
                        value={formData.ethnicity}
                        className="form-control"
                        id="ethnicity"
                        onChange={handleChange}>
                    </input>
                </div>

                <div className="text">
                    <label htmlFor="religion">Religion</label>
                    <input
                        type="text"
                        name="religion"
                        value={formData.religion}
                        className="form-control"
                        id="religion"
                        onChange={handleChange}>
                    </input>
                </div>

                <div className="text">
                    <label htmlFor="bio">Short Bio</label>
                    <textarea
                        name="bio"
                        value={formData.bio}
                        className="form-control"
                        id="bio"
                        rows="4"
                        onChange={handleChange}>
                    </textarea>
                </div>

                <div className="text">
                    <label htmlFor="education">Education</label>
                    <input
                        type="text"
                        name="education"
                        value={formData.education}
                        className="form-control"
                        id="education"
                        onChange={handleChange}>
                    </input>
                </div>

                <div className="text">
                    <label htmlFor="job">Job</label>
                    <input
                        type="text"
                        name="job"
                        value={formData.job}
                        className="form-control"
                        id="job"
                        onChange={handleChange}>
                    </input>
                </div>

                <div className="form-group mb-4">
                    <label htmlFor="profileImage">Profile Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        className="form-control"
                        onChange={handleImageChange}
                    />
                </div>


                <h4 className=" mt-5">About you (Answer 5 questions)</h4>

                    {[
                    { label: "What are your hobbies?", name: "hobbies" },
                    { label: "What are your dealbreakers?", name: "dealbreakers" },
                    { label: "What is your best joke?", name: "bestJoke" },
                    { label: "Given the choice of anyone in the world, who would you want as a dinner guest?", name: "dinnerGuest" },
                    { label: "What would be a “perfect” day for you?", name: "perfectDay" },
                    { label: "What would your final meal be?", name: "finalMeal" },
                    { label: "What are you most grateful for in your life?", name: "mostGrateful" },
                    { label: "What’s your greatest accomplishment?", name: "accomplishment" },
                    { label: "What do you value most in a friendship?", name: "valueFriendship" },
                    { label: "What’s your most treasured memory?", name: "treasuredMemory" },
                    { label: "What’s your most terrible memory?", name: "terribleMemory" },
                    { label: "What is your love language?", name: "loveLanguage" },
                    { label: "Think about the last time you cried, what was the reason?", name: "lastCried" },
                    { label: "What, if anything, is too serious to be joked about?", name: "seriousJoke" },
                    { label: "Favorite travel destination?", name: "travelDestination" },
                    { label: "Which country/city do you want to visit next?", name: "nextCity" },
                    ].map((q, idx) => (
                    <div className="text" key={idx}>
                        <label htmlFor={q.name}>{q.label}</label>
                        <textarea
                        name={q.name}
                        value={formData[q.name]}
                        className="form-control"
                        id={q.name}
                        rows="2"
                        onChange={handleChange}
                        />
                    </div>
                ))}

                <button type="submit" className="button"> 
                    Submit
                </button>

            </form>
        </div>

    </div>

    
    );
    

};

export default Registration;
