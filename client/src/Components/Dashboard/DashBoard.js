import React, { useEffect, useState } from 'react'
import axios from "axios"
import './DashBoard.css'
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { ChangeData, PreviousButtonState, SetUserIdForUpdate } from '../../features/dashbaordSlice'
import { useAuth0 } from '@auth0/auth0-react'

function DashBoard() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const data = useSelector(state => state.data)
    // const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [isLastPage, setIsLastPage] = useState(false);
    const DeleteUserbyId = async (id) => {
        try {

            const result = window.confirm("Are you sure?");
            // console.log(result);
            if(result){
                let response = await axios.delete(`${process.env.REACT_APP_URI}/api/dashboard/deleteuser/${id}`);
                response = await axios.get(`${process.env.REACT_APP_URI}/api/dashboard/loaddata/${page}`);
                // setData(response.data.data)
                dispatch(ChangeData(response.data.data))
            }
            
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const RedirectToUpdate = (id) => {
        dispatch(SetUserIdForUpdate(id));
        navigate("/updateuser")
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_URI}/api/dashboard/loaddata/${page}`);
                // setData(response.data.data);
                dispatch(ChangeData(response.data.data))
                setIsLastPage(response.data.data.length < 10);
                
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [page]);


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
        <div className='DashBoard'>
            {
                isauth ?
                    <div className='Dashbody'>
                        {isAuthenticated ?
                            <div className='dashcontent'>
                                <button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
                                <button onClick={() => setPage(page + 1)} disabled={isLastPage}>Next</button>
                                {
                                    data.map((obj) => {
                                        return (
                                            <div class="card" style={{ "margin": "10px" }}>
                                                <div class="card-body" key={obj._id}>
                                                    <div>
                                                        <h5 class="card-title">Vendor Name : {obj.vendor_name} {obj.last_name}</h5>
                                                        <h5 class="card-title">Bank Name: {obj.bank_name}</h5>
                                                        <h5 class="card-title">Account Number: {obj.acc_no}</h5>

                                                    </div>
                                                    <div>

                                                        <button onClick={() => DeleteUserbyId(obj._id)} class="btn btn-primary">Delete User</button>
                                                        <button style={{ "marginLeft": "10px" }} onClick={() => RedirectToUpdate(obj._id)} class="btn btn-primary">Update User</button>
                                                    </div>
                                                </div>
                                                {/* <li key={obj.id}> {obj.id} </li> */}
                                            </div>
                                        )
                                    })
                                }

                            </div>
                            : <div className='dashloading'>Please Login</div>
                        }
                    </div>
                    : <div style={{ width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "rgba(100,100,100,0.5)" }}>Loading....</div>
            }
        </div>
    )
}

export default DashBoard
