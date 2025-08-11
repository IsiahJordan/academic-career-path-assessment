// React Library
import React from 'react'
import {useState, useEffect} from 'react'

// Import File
import AdminBox from "../components/Jordi-admin-user/admin_box.tsx"
import AdminNavBar from "../components/Jordi-admin-user/admin_nav.tsx" 
import './a-accounts.css'

// Installed Dependencies
import axios from 'axios'


function AdminLogs(){
  const [data, setData] = useState([]);
  // Table Name
  const header_names = [
    {id: 1, label: "logId"},
    {id: 2, label: "userId"},
    {id: 3, label: "action"},
    {id: 4, label: "classId"},
    {id: 6, label: "date"}
  ];

  // Content
  useEffect(() => {
    // Request URL
    const req_url = "http://localhost:5000/app/logs";

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
    btn1: ""
  };


  return(
    <>
      <AdminNavBar/>
      <AdminBox
        title="Logs"
	header={header_names}
	values={data}
	buttons={button}
      />
    </>
  )
}

export default AdminLogs;
