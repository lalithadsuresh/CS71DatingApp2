import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const AuthenticatePage = () => {

    const { isAuthenticated, user } = useAuth0();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated && user) {
            axios.post('http://localhost:5001/api/users/sync', {
                auth0UserId: user.sub,
            })
            .then((res) => {
                axios.post('http://localhost:5001/api/users/registered', {
                    auth0UserId: user.sub
                })
                .then(() => {
                    const isRegistered = res.data.isRegistered;

                    if (isRegistered) {
                        navigate('/matches');
                        console.log(isRegistered);
                    }

                    else {
                        navigate('/registration');
                        console.log(isRegistered);
                    }

                })
                console.log('cess');
            })
            .catch((err) => {
                console.error(err);
            })
        }

    }, [isAuthenticated, user]);

    return (
        <hi> 
            <div>
                {!isAuthenticated ? <LoginButton/> : <LogoutButton/> }
            </div>
        </hi>

    );

};

export default AuthenticatePage;