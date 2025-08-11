// React Library
import React from 'react'
import {useState, useEffect} from 'react'


// Import File
import AdminBox from "../components/Jordi-admin-user/admin_box.tsx"
import AdminNavBar from "../components/Jordi-admin-user/admin_nav.tsx" 

import './a-archived.css'

// Installed Dependencies
import axios from 'axios'


function AdminArchived(){
  const [ data, setData ] = useState([]);

  // Table Name
  const header_names = [
    {id: 1, label: "Admin ID"},
    {id: 2, label: "User Name"},
    {id: 3, label: "Object"},
    {id: 4, label: "Class"},
    {id: 6, label: "Date"}
  ];

  // Content
  useEffect(() => {
    // Request URL
    const req_url = "http://localhost:5000/app/archive";

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
    label: "Restore"
  };


  return(
    <>
      <AdminNavBar/>
      <AdminBox
        title="Archive"
	header={header_names}
	values={data}
	buttons={button}
      />
    </>
  )
}

export default AdminArchived;
