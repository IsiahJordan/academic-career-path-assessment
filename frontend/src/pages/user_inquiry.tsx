// React Library
import React from 'react'
import { useState, useEffect } from 'react'

// Import File
import UserNavBar from "../components/Jordi-admin-user/user_nav.tsx"
import UserMessageBox from "../components/Jordi-admin-user/user_box.tsx"

import './user_inquiry.css'

// Installed Dependencies
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../components/Navbar/navbar.tsx'

function Inquiry(){
 
  return(
    <>
      <Navbar/>
      <UserMessageBox/>
    </>
  )
}

export default Inquiry
