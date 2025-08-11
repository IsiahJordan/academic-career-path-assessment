// React Library
import React from 'react'
import {useState, useEffect} from 'react'
import Navbar from "../Navbar/navbar"

// Import File
import AdminBox from "./adminBox/admin_box"


// Installed Dependencies
import axios from 'axios'


function AdminInbox(){
  const [ data, setData ] = useState([]);
  const [ status, setStatus ] = useState([]);

  // Table Name
  const header_names = [
    {id: 1, label: "messageId"},
    {id: 2, label: "userId"},
    {id: 3, label: "subject"},
    {id: 4, label: "message"},
    {id: 5, label: "status"}
  ];

  // Content
  useEffect(() => {
    // Request URL
    const req_url = "http://localhost:8081/app/profile/inbox";

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
    label: "Reply",
    label2: "Archive"
  };


  return(
    <>
    <Navbar/>
      <AdminBox
        title="Inbox"
	header={header_names}
	values={data}
	buttons={button}
      />
    </>
  )
}

export default AdminInbox;
