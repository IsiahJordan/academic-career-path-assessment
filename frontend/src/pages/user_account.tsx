// React Library
import React from 'react'
import {useState, useEffect} from 'react'

// Import File
//import UserNavBar from "../components/Jordi-admin-user/user_nav.tsx"
import Navbar from "../components/Navbar/navbar.tsx"
import UserProfileDetail from "../components/Jordi-admin-user/user_profile.tsx"

import './user_inquiry.css'
import UserLogo from '../assets/user-icon.png' 

// Installed Dependencies
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import axios from 'axios'
import { useUser } from '../components/User-Context/UserContext.tsx';




function UserProfile(){
  const [user, setUser] = useState({});
  const { userData } = useUser();

  useEffect(() => {
    // Request URL
    const req_url = "http://localhost:5000/app/profile/data";

    // Get Request
    const req = axios.get(req_url);

    Promise.all([req])
      .then(responses => {
        const [ res1 ] = responses;
      setUser(res1.data[0]);
      console.log(res1.data[0]);
      })
      .catch(error => {
        console.log("Failed Request");
      })
    }, []);

  const name = {
    last: userData?.lastname,
    first: userData?.firstname,
    mid: ""
  };

  const bday = "02/03/12";
  const gender = userData?.gender;
  const city = userData?.city;
  const email = userData?.email;

  return(
    <>
      <Navbar/>
      <UserProfileDetail
        name={name}
	pic={UserLogo}
	gender={gender}
	bday={bday}
	city={city}
  
      />
    </>
  )
}

export default UserProfile
