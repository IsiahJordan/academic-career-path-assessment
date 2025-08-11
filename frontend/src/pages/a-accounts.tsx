// React Library
import React from 'react'
import {useState, useEffect} from 'react'

// Import File
import AdminBox from "../components/Jordi-admin-user/admin_box.tsx"
import AdminNavBar from "../components/Jordi-admin-user/admin_nav.tsx" 

import './a-accounts.css'

// Installed Dependencies
import axios from 'axios'


function AdminAccounts(){
  const [data, setData] = useState([]);

  // Table Name
  const header_names = [
    {id: 0, label: "User ID"},
    {id: 2, label: "User Name"},
    {id: 3, label: "Email"},
    {id: 4, label: "Status"}
  ];

  // Content
  useEffect(() => {
    // Request URL
    const req_url = "http://localhost:5000/app/user";

    // Get Request
    const req = axios.get(req_url);

    Promise.all([req])
      .then(responses => {
        const [ res1 ] = responses;
	setData(res1.data);
	
      })
      .catch(error => {
        console.log("Failed Request");
      })
    }, []); 

  // Button names
  const button = {
    btn1: "Restore", 
    btn2: "Archived"
  };
  

  return(
    <>
      <AdminNavBar/>
      <AdminBox
        title="Accounts"
	header={header_names}
	values={data}
	buttons={button}
      />
    </>
  )
}

export default AdminAccounts;
