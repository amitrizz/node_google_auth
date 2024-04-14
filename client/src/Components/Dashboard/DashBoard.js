import React, { useEffect, useState } from 'react'
import axios from "axios"
import './DashBoard.css'
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { ChangeData, PreviousButtonState, SetUserIdForUpdate } from '../../features/dashbaordSlice'
import { useAuth0 } from '@auth0/auth0-react'

function DashBoard() {

    const navigate = useNavigate()

    const data = useSelector(state => state.data)
    const isbuttonDisble = useSelector(state => state.currentstate)
    const [fileContent, setFileContent] = useState(false);

    const [skip, setSkip] = useState(1);

    const dispatch = useDispatch();

    const AddMoreDataToTable = async () => {
        try {
            // console.log(skip);
            setFileContent(false);
            const response = await axios.post(`${process.env.REACT_APP_URI}/api/dashboard/loaddata`, { skip: skip + 1 });
            setSkip(skip + 1);
            dispatch(ChangeData(response.data.data))
            dispatch(PreviousButtonState(false));
            setFileContent(true);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    const DeleteUserbyId = async (id) => {
        try {
            // console.log(skip);
            setFileContent(false);
            let response = await axios.delete(`${process.env.REACT_APP_URI}/api/dashboard/deleteuser/${id}`);
            console.log(response.data);
            alert(response.data.result)
            response = await axios.get(`${process.env.REACT_APP_URI}/api/dashboard/loaddata`);
            dispatch(ChangeData(response.data.data))
            if (response.data.data[0].id == 1) {
                dispatch(PreviousButtonState(true));
            }
            setFileContent(true);
            // setFileContent(true);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    const RemoveMoreDataToTable = async () => {

        try {
            // console.log(skip);
            setFileContent(false);
            const response = await axios.post(`${process.env.REACT_APP_URI}/api/dashboard/loaddata`, { skip: skip - 1 });
            setSkip(skip - 1);
            dispatch(ChangeData(response.data.data))
            if (response.data.data[0].id == 1) {
                dispatch(PreviousButtonState(true));
            }
            setFileContent(true);
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
                // Send the request with the configured headers
                console.log(process.env.REACT_APP_URI);
                const response = await axios.get(`${process.env.REACT_APP_URI}/api/dashboard/loaddata`);
                dispatch(ChangeData(response.data.data))
                console.log(response.data.data);
                if (response.data.data[0].id == 1) {
                    dispatch(PreviousButtonState(true));  
                }
                setFileContent(true);
                //   setAllemployee(response)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

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
                        {fileContent && isAuthenticated ?
                            <div className='dashcontent'>
                                <button onClick={RemoveMoreDataToTable} disabled={isbuttonDisble}>Pre PAge</button>
                                <button onClick={AddMoreDataToTable}>Next PAge</button>
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
