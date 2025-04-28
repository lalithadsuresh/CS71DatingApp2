import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const DecidingPage = () => {

    const { isAuthenticated, isLoading, user } = useAuth0();
    const navigate = useNavigate();

    const BASE_URL = process.env.REACT_APP_BASE_URL;

    useEffect(() => {

        const checkRegistration = async () => {
            try {
                const response = await axios.post(`${BASE_URL}/api/users/registered`, {
                    auth0UserId: user.sub
                });
                const isRegistered = response.data.isRegistered;
                
                if (isRegistered) {
                    navigate("/homepage");
                } else {
                    navigate("/registration");
                }
                
            } catch (err) {
                console.error("Error with registration")
                navigate("/login");
            }
        };

        if (!isLoading) {
            if (isAuthenticated && user) {
                checkRegistration();
            } else {
                navigate("/login")
            }
        }


    }, [isAuthenticated, navigate, isLoading, user]);

    return (

        <div>
            {isLoading ? "Checking authentication..." : "Redirecting..."}
        </div>
    );

};

export default DecidingPage;