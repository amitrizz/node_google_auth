// import logo from './logo.svg';
import './App.css';
import DashBoard from './Components/Dashboard/DashBoard.js';
import { useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import Navbar from './Components/Navbar/Navbar.js';
import { Provider } from "react-redux"
// import Header from './Components//Navbar/Header.js';
import { store } from "../src/stores/store.js"
// import Login from './Components/loginPart/Login.js';
import Navbar from './Components/Navbar/Navbar.js';
import AddUser from './Components/AddUpdateUser/AddUser.js';
import UpdateUser from './Components/AddUpdateUser/UpdateUser.js';


function App() {
  const { user, isAuthenticated } = useAuth0();
  return (
    <Provider store={store}>

      <BrowserRouter>
        <div className='body'>

          <Navbar />
          <div className='app'>
            <Routes>
              {/* <Route path="/login" element={<Login />} ></Route> */}
              <Route path="/" element={<DashBoard />} ></Route>
              <Route path="/adduser" element={<AddUser />} />
              <Route path="/updateuser" element={<UpdateUser />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
