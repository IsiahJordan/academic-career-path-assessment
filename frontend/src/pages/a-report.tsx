// React Library
import React from 'react'
import {useState, useEffect} from 'react'

// Import File
import AdminNavBar from "../components/Jordi-admin-user/admin_nav.tsx" 
import './a-report.css'

// Installed Dependencies
import axios from 'axios'
import 'chart.js/auto'
import { Chart } from 'react-chartjs-2'

const generateRandomColor = () => {
  // Generate random RGB values
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  // Combine RGB values into a HEX color code
  const randomColor = `rgb(${r},${g},${b})`;

  return randomColor;
};

function AdminReport(){
  const [score, setScore] = useState(0.0);
  const [test, setTest] = useState(0);
  const [career, setCareer] = useState([
     "Loading", "Loading", "Loading"
  ]);
  const [school, setSchool] = useState([
    "Loading", "Loading", "Loading"
  ]);

  const [data, setData] = useState({
    labels: ['Label 1', 'Label 2', 'Label 3'],
    datasets: [
      {
        data: [30, 40, 30],
        backgroundColor: ['gold', 'lightskyblue', 'lightcoral'],
      },
    ],
  });

  const [data2, setData2] = useState({
    labels: ['Label 1', 'Label 2', 'Label 3'],
    datasets: [
      {
        data: [30, 40, 30],
        backgroundColor: ['gold', 'lightskyblue', 'lightcoral'],
      },
    ],
  });

  // Content
  useEffect(() => {
    // Request URL
    const req_url1= "http://localhost:5000/app/report/score";
    const req_url3 = "http://localhost:5000/app/report/career";
    const req_url2 = "http://localhost:5000/app/report/test";
    const req_url4 = "http://localhost:5000/app/report/schools";
    const req_url5 = "http://localhost:5000/app/report/stats/career";
    const req_url6 = "http://localhost:5000/app/report/stats/schools";

    // Get Request
    const req1 = axios.get(req_url1);
    const req2 = axios.get(req_url2);
    const req3 = axios.get(req_url3);
    const req4 = axios.get(req_url4);
    const req5 = axios.get(req_url5);
    const req6 = axios.get(req_url6);

    Promise.all([req1, req2, req3, req4, req5, req6 ])
      .then(responses => {
        const [ res1, res2, res3, res4, res5, res6 ] = responses;
	setScore(res1.data[0]["Average"].toFixed(1));
	
	const temp = [];
        for (let i = 0; i < res3.data.length; i++) temp.push(res3.data[i]["careerName"]);
	let count = 0;
	const temp2 = [];
	for (let i = 0; i < res2.data.length; i++) count += res2.data[i]["COUNT(T.testId)"];
        for (let i = 0; i < res4.data.length; i++) temp2.push(res4.data[i]["schoolName"]);

        setTest(count);
	setCareer(temp);
	setSchool(temp2);

  	  const labels = [];
	  const data = [];
	  const backgroundColor = [];
	  for (let i = 0; i < res5.data.length; i++){
            labels.push(res5.data[i]["name"]);
	    data.push(res5.data[i]["id"]);
	    backgroundColor.push(generateRandomColor());
	  }

	  setData({labels: labels, datasets: [{data: data, backgroundColor: backgroundColor}]});
	  console.log(data);
          const labels2 = [];
	  const data2 = [];
	  const backgroundColor2 = [];
	  for (let i = 0; i < res6.data.length; i++){
            labels2.push(res6.data[i]["name"]);
	    data2.push(res6.data[i]["id"]);
	    backgroundColor2.push(generateRandomColor());
 	  }

	  setData2({labels: labels2, datasets: [{data: data2, backgroundColor: backgroundColor2}]});



      })
      .catch(error => {
        console.log("Failed Request");
      })
    }, []);
       

  return (
    <>
    <AdminNavBar/> 
    <div className='reports-container'>
    <article>
      <div id="report-content">
        <div className="top-row">
          <div className="equal-size-div">
	    <div className="report-title">
	      TOTAL NUMBER OF TAKEN ASSESSMENT
	    </div>
	    <div className="content">
	      <div>Avg {test} per day</div>
	    </div>
	  </div>
          <div className="equal-size-div">
	    <div className="report-title">
	      AVERAGE TOTAL SCORE
	    </div>
	    <div className="content">
	      <div> Avg {score + "%"} Score per day </div>
	    </div>
	  </div>
          <div className="equal-size-div">
	    <div className="report-title">
	      TOP 3 MOST FREQUENT CAREER
	    </div>
	    <div className="content">
	       <ul>
  	        {career.map((item, index) => (
                   <li key={index}> {item} </li>
	        ))} 
	      </ul>
	    </div>
	  </div>
        </div>
        <div className="bottom-row">
          <div className="large-div">
	    <div className="report-title">
	      CHART
	    </div>
	    <div className="content">
	      <div className="content-chart">
	      < Chart type="doughnut" data={data} options= {{ maintainAspectRatio: false }}/>
	      </div>
	      <div className="content-chart">
	       < Chart type="doughnut" data={data2} options= {{ maintainAspectRatio: false }}/>
	      </div>
	    </div>
	  </div>
          <div className="small-div">
	    <div className="report-title">
	      TOP 3 MOST FREQUENT SCHOOLS
	    </div>
	    <div className="content">
		<ul>
  	        {school.map((item, index) => (
                   <li key={index}> {item} </li>
	        ))} 
	      </ul>
	    </div>
	  </div>
        </div>
      </div>
    </article>
    </div>
    </>
  )
}
export default AdminReport;
