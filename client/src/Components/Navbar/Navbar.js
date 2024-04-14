import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux"
import { SetisAuth } from '../../features/dashbaordSlice'


function Navbar() {
    const { loginWithRedirect, user, isAuthenticated, logout } = useAuth0();

    // const dispatch = useDispatch();

    // const isauth = useSelector(state => state.isauth)

    const handleLogin = (e) => {
        // dispatch(SetisAuth(false));

        // console.log(isAuthenticated);
        loginWithRedirect()
    }

    const [isauth, setIsauth] = useState(false);
    const checkAuthentication = () => {
        // Mock logic to fetch authentication status from the server
        console.log(isAuthenticated);
        setIsauth(true);
    };

    useEffect(() => {
        let timerId = setTimeout(() => {
            checkAuthentication();
        }, 3000); // Delay in milliseconds

        // Cleanup function to clear the timer after component unmounts
        return () => clearTimeout(timerId);
    }, []); // Empty dependency array to run effect only once

    // console.log("loggin", user);
    return (
        <div className='navbarbody'>
            {
                isauth &&
                <div>

                    <nav className='navbody'>
                        <ul className="nav-link">
                            <li className="link">
                                <Link to="/" className={"link-styles"}>DashBoard</Link>
                            </li>
                            <li className="link">
                                <Link to="/adduser" className={"link-styles"}>Add User</Link>
                            </li>
                            {
                                isAuthenticated ?
                                    <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                                        Log Out
                                    </button> :
                                    <button onClick={(e) => handleLogin(e)}>Log In</button>

                            }
                        </ul>
                    </nav>

                </div>
            }

        </div >
    )
}

export default Navbar
