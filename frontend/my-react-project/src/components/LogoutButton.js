import { useAuth0 } from "@auth0/auth0-react";


const LogoutButton = () => {

    const { logout, isAuthenticated } = useAuth0();
    console.log("Is Authenticated:", isAuthenticated);

    return (
        isAuthenticated && (
            <button onClick={() => logout()} className='button'>
                Sign Out
            </button>
        )
    )
}

export default LogoutButton