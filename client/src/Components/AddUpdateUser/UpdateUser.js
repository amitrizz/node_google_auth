import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { useAuth0 } from '@auth0/auth0-react';
import { ChangeData, PreviousButtonState, SetUserIdForUpdate } from '../../features/dashbaordSlice'

function UpdateUser() {
    const navigate = useNavigate();
    const dispatch = useDispatch();


    // const token = localStorage.getItem('token');
    const [vendor_name, setVendorName] = useState("");
    const [acc_no, setAccountNo] = useState(0);
    const [bank_name, setBankName] = useState("");
    const [address_1, setAddress1] = useState("");
    const [address_2, setAddress2] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [zip, setZip] = useState(0);
    const id = useSelector(state => state.userid)
    const HandleSubmit = async () => {
        // console.log("working");
        try {
            // Send the request with the configured headers
            if (!vendor_name || !acc_no || !bank_name || !address_1 || !address_2 || !city || !country || !zip || id == "none") {
                alert("Enter All Fields");
            } else {
                // console.log(firstname, lastname, email, gender, email, available, domain);
                // console.log();
                const response = await axios.put(`${process.env.REACT_APP_URI}/api/dashboard/updateuser/${id}`, { vendor_name, acc_no, bank_name, address_1, address_2, city, country, zip });
                console.log(response);
                if (response.status == 200) {
                    alert(`Submit Successfully`)
                    navigate("/")
                } else {
                    console.log(response.status);
                }
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }

    }

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Send the request with the configured headers
                const response = await axios.post(`${process.env.REACT_APP_URI}/api/dashboard/userbyid/${id}`);
                
                console.log(response.data.data);
                setVendorName(response.data.data.vendor_name);
                setAccountNo(response.data.data.acc_no);
                setBankName(response.data.data.bank_name);
                setAddress1(response.data.data.address_1);
                setAddress2(response.data.data.address_2);
                setCountry(response.data.data.country);
                setCity(response.data.data.city);
                setZip(response.data.data.zipcode);
            } catch (error) {
                alert(`User Not Found`)
                navigate("/")
            }
        };
        if (id !== "none") {
            fetchData();
        }
    }, [])
    return (
        <div className='User'>
            {
                isauth ?
                    <div className='sidebar'>
                        {
                            isAuthenticated ?
                                <div>

                                    <h1>Update EMPLOYEE</h1>
                                    <div className='form'>
                                        <div class="mb-3">
                                            <label for="exampleInputEmail1" className="lable">Vendor Name</label>
                                            <input value={vendor_name} type="text" class="form-control" onChange={e => setVendorName(e.target.value)} maxLength={30} />
                                        </div>
                                        <div class="mb-3">
                                            <label for="exampleInputEmail1" className="lable">Account no</label>
                                            <input value={acc_no} type="number" class="form-control" onChange={e => setAccountNo(e.target.value)} maxLength={10} />
                                        </div>

                                        <div class="mb-3">
                                            <label for="exampleInputEmail1" className="lable">Bank Name</label>
                                            <input value={bank_name} type="text" class="form-control" onChange={e => setBankName(e.target.value)} maxLength={30} />
                                        </div>

                                        <div class="mb-3">
                                            <label for="exampleInputEmail1" className="lable">Country Name</label>
                                            <input value={country} type="text" class="form-control" onChange={e => setCountry(e.target.value)} maxLength={30} />
                                        </div>

                                        <div class="mb-3">
                                            <label for="exampleInputEmail1" className="lable">City Name</label>
                                            <input value={city} type="text" class="form-control" onChange={e => setCity(e.target.value)} maxLength={30} />
                                        </div>

                                        <div class="mb-3">
                                            <label for="exampleInputEmail1" className="lable">Zip Code</label>
                                            <input value={zip} type="number" class="form-control" onChange={e => setZip(e.target.value)} maxLength={30} />
                                        </div>
                                        <div class="mb-3">
                                            <label for="exampleInputEmail1" className="lable">Address line 1</label>
                                            <input value={address_1} type="text" class="form-control" onChange={e => setAddress1(e.target.value)} maxLength={30} />
                                        </div>
                                        <div class="mb-3">
                                            <label for="exampleInputEmail1" className="lable">Address line 2</label>
                                            <input value={address_2} type="text" class="form-control" onChange={e => setAddress2(e.target.value)} maxLength={30} />
                                        </div>
                                        <button onClick={HandleSubmit} class="btn btn-outline-secondary">Submit</button>
                                    </div>
                                </div>
                                : <div className='dashloading'>Please Login</div>
                        }
                    </div>
                    : <div style={{ width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "rgba(100,100,100,0.5)" }}>Loading....</div>
            }
        </div>
    )
}

export default UpdateUser
