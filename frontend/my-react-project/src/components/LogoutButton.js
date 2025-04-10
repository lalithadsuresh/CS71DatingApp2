import { useAuth0 } from "@auth0/auth0-react";


const LogoutButton = ({visible = false}) => {

    const { logout, isAuthenticated } = useAuth0();
    console.log("Is Authenticated:", isAuthenticated);
    if (!isAuthenticated || !visible) return null;

    return (
        isAuthenticated && (
            <button onClick={() => logout()} className='logoutbutton'>
                Sign Out
            </button>
        )
    )
}

export default LogoutButton