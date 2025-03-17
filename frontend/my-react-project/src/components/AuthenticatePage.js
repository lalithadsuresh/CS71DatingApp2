import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const AuthenticatePage = () => {

    const { isAuthenticated, user } = useAuth0();

    useEffect(() => {
        if (isAuthenticated && user) {
            axios.post('http://localhost:5000/api/users/sync', {
                auth0UserId: user.sub,
            })
            .then((res) => {
                axios.post('http://localhost:5000/api/users/registered')
                .then(() => {
                    const isRegistered = res.data.isRegistered;

                    if (isRegistered) {
                        console.log(isRegistered);
                    }

                    else {
                        console.log(isRegistered);
                    }

                })
                console.log('Sync success');
            })
            .catch((err) => {
                console.error(err);
            })
        }

    }, [isAuthenticated, user]);

    return (
        <hi> 
            Auth0 Login 
            <div>
                {!isAuthenticated ? <LoginButton/> : <LogoutButton/> }
            </div>
        </hi>

    );

};

export default AuthenticatePage;