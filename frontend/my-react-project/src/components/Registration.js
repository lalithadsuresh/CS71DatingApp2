import axios from "axios";
import React from "react";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Registration = () => {

    const { user } = useAuth0();

    const [formData, setFormData] = useState({

        name: '',
        age: ''

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

            console.log("Success");

        } catch (err) {

            console.log("Error");

        }

    }

    return (

        <form onSubmit={handleSubmit}> 
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


    );



};

export default Registration;
