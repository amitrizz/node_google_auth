import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useAuth0 } from '@auth0/auth0-react';

function AddUser() {
    const navigate = useNavigate();
    // const token = localStorage.getItem('token');
    const [vendor_name, setVendorName] = useState("");
    const [acc_no, setAccountNo] = useState(0);
    const [bank_name, setBankName] = useState("");
    const [address_1, setAddress1] = useState("");
    const [address_2, setAddress2] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [zip, setZip] = useState(0);
    const HandleSubmit = async () => {
        console.log(vendor_name, acc_no, bank_name, address_1, address_2, city, country,zip );
        try {
            // Send the request with the configured headers
            if (!vendor_name || !acc_no || !bank_name || !address_1 || !address_2 || !city ||!country ||!zip) {
                alert("Enter All Fields");
            } else {
                // console.log(firstname, lastname, email, gender, email, available, domain);
                // console.log();
                const response = await axios.post(`${process.env.REACT_APP_URI}/api/dashboard/adduser`, { vendor_name, acc_no, bank_name, address_1, address_2, city, country,zipcode:zip });
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

    return (
        <div className='DashBoard'>
            {
                isauth ?
                    <div className='User'>
                        {
                            isAuthenticated ?
                                <div className='sidebar'>
                                    <h1>ADD EMPLOYEE</h1>
                                    <div className='form'>
                                        <div class="mb-3">
                                            <label for="exampleInputEmail1" className="lable">Vendor Name</label>
                                            <input type="text" class="form-control" onChange={e => setVendorName(e.target.value)} maxLength={30} />
                                        </div>
                                        <div class="mb-3">
                                            <label for="exampleInputEmail1" className="lable">Account no</label>
                                            <input type="number" class="form-control" onChange={e => setAccountNo(e.target.value)} maxLength={10} />
                                        </div>

                                        <div class="mb-3">
                                            <label for="exampleInputEmail1" className="lable">Bank Name</label>
                                            <input type="text" class="form-control" onChange={e => setBankName(e.target.value)} maxLength={30} />
                                        </div>
                                        
                                        <div class="mb-3">
                                            <label for="exampleInputEmail1" className="lable">Country Name</label>
                                            <input type="text" class="form-control" onChange={e => setCountry(e.target.value)} maxLength={30} />
                                        </div>

                                        <div class="mb-3">
                                            <label for="exampleInputEmail1" className="lable">City Name</label>
                                            <input type="text" class="form-control" onChange={e => setCity(e.target.value)} maxLength={30} />
                                        </div>

                                        <div class="mb-3">
                                            <label for="exampleInputEmail1" className="lable">Zip Code</label>
                                            <input type="number" class="form-control" onChange={e => setZip(e.target.value)} maxLength={30} />
                                        </div>
                                        <div class="mb-3">
                                            <label for="exampleInputEmail1" className="lable">Address line 1</label>
                                            <input type="text" class="form-control" onChange={e => setAddress1(e.target.value)} maxLength={30} />
                                        </div>
                                        <div class="mb-3">
                                            <label for="exampleInputEmail1" className="lable">Address line 2</label>
                                            <input type="text" class="form-control" onChange={e => setAddress2(e.target.value)} maxLength={30} />
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

export default AddUser
