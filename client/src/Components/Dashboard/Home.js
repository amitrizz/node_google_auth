import React, { useEffect, useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from '../Navbar/Navbar';
import { useSelector, useDispatch } from "react-redux"
import { SetisAuth } from '../../features/dashbaordSlice'

function Home() {
    const { user, isAuthenticated } = useAuth0();
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
    return (
        <div>
            {
                isauth ?
                    <div>
                        {isAuthenticated ?
                            <div>
                                <div>
                                    Login sucessfully done
                                </div>
                            </div>
                            :
                            <div>
                                Please login to access this accounts
                            </div>
                        }
                    </div>
                    :
                    <div style={{width:"100%",height:"100vh",display:"flex",justifyContent:"center",alignItems:"center",background:"rgba(100,100,100,0.5)"}}>Loading....</div>
            }
        </div>
    )
}

export default Home
