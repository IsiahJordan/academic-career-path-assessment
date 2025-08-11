// React Library
import React from 'react'
import {useState, useEffect} from 'react'


// Import File
import AdminNavBar from "../components/Jordi-admin-user/admin_nav.tsx" 

import './a-dashboard.css'

// Installed Dependencies
import axios from 'axios'
import 'chart.js/auto'
import { Chart } from 'react-chartjs-2'

function formatDate(inputDate : any) {
  // Parse the input date string
  const dateObject = new Date(inputDate);

  // Array of month names
  const monthNames = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];

  // Extract components from the date object
  const year = dateObject.getFullYear();
  const month = dateObject.getMonth();
  const day = dateObject.getDate();

  // Format the output string
  const formattedDate = `${monthNames[month]} ${day}, ${year}`;

  return formattedDate;
}

const generateRandomColor = () => {
  // Generate random RGB values
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  // Combine RGB values into a HEX color code
  const randomColor = `rgb(${r},${g},${b})`;

  return randomColor;
};


function AdminDashboard(){

  const [data, setData] = useState({
    labels: ['Label 1', 'Label 2', 'Label 3'],
    datasets: [
      {
        data: [30, 40, 30],
        backgroundColor: [generateRandomColor(), generateRandomColor(), generateRandomColor()],
      },
    ],
  });

  const [test, setTest] = useState([
    "New User 1", "New User 2", "New User 3"
  ]);
  const [logs, setLogs] = useState([]);

  // Content
  useEffect(() => {
    const req_url1 = "http://localhost:5000/app/adash/account";  
    const req_url2 = "http://localhost:5000/app/adash/test";
    const req_url3 = "http://localhost:5000/app/adash/logs";

    const req1 = axios.get(req_url1);
    const req2 = axios.get(req_url2);
    const req3 = axios.get(req_url3);

    Promise.all([req1, req2, req3])
      .then(responses => {
        const [res1, res2, res3] = responses;
        const username = [];
	for (let i = 0; i < res1.data.length; i++) username.push(res1.data[i]["username"]);
	setTest(username);
	setLogs(formatDate(res3.data[0]["date"]));
	const labels = [];
	const data = [];
	const backgroundColor = [];
	for (let i = 0; i < res2.data.length; i++){
          labels.push(res2.data[i]["title"]);
	  data.push(res2.data[i]["score"]);
	  backgroundColor.push(generateRandomColor());
	}
	setData({labels, datasets: [{data, backgroundColor}]});

      })
      .catch(error => {
        console.log("Failed Request");
      })
    }, []);
  console.log(logs); 

  return (
    <>
    <AdminNavBar/> 
    <div id="dash-article">
      <div id="dashboard">  
        <div id="dashboard-title">
	  <h1 id="dashboard-title-title">
	    Last Admin Change
	  </h1>
	  <div id="dashboard-title-content">
  	    {logs}
	  </div>
	</div>
	<div id="dashboard-article">
	  <span id="dashboard-stats">
	  <h1>
	    Subject Performance
	  </h1>
	    <div id="dashboard-graph">
   	      <Chart type="pie" data={data} options= {{ maintainAspectRatio: false }}/>
	    </div>
	  </span>
	  <span id="dashboard-user">   
  	    <h1>
	      New Users
	    </h1>
	    <ul>
	      {test.map((item, index) => (
                <li key={index}> {item} </li>
	     ))} 
	    </ul>
	  </span>
	</div>
      </div>
    </div>
    </>
  )
}

export default AdminDashboard;
