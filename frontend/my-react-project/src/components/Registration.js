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
        job: ''
        
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevFormData) => {
            let updatedForm = {...prevFormData};
            updatedForm[name] = value;
            return updatedForm;
        });

    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        const auth0UserId = user?.sub;

        //send a request to put it into database?

        try {
            
            const response = await axios.post('http://localhost:5000/api/users/register',
                {...formData,
                auth0UserId: auth0UserId
                }
            );


            navigate("/matches")

            console.log("Success");

        } catch (err) {

            console.log("Error");

        }

    }

    return (
/*         <form onSubmit={handleSubmit}> 
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name">
            </input>
            <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Age">
            </input>
            <button type="submit"> 
                Register
            </button>
        </form>
*/




        <div className="container py-5">
            <form onSubmit={handleSubmit}> 

                <h2 className="mb-5">Personal Information</h2>

                <div className="form-group mb-4">
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

                <div className="form-group mb-4">
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

                <div className="form-group mb-4">
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

                <div className="form-group mb-4">
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

                <div className="form-group mb-4">
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

                <div className="form-group mb-4">
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

                <div className="form-group mb-4">
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

                <div className="form-group mb-4">
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

                <div className="form-group mb-4">
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

                <div className="form-group mb-4">
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

                <div className="form-group mb-4">
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

                <div className="form-group mb-5">
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

                <button type="submit" className="btn btn-primary mt-4"> 
                    Submit
                </button>

            </form>
        </div>

        

    
    );
    

};

export default Registration;
