
// React Library
import React from 'react'
import {useState, useEffect, useCallback} from 'react'


// Import File
import UserNavBar from "../components/Jordi-admin-user/user_nav.tsx" 

import './suggestions.css'
import AdminDescComp from "../components/Jordi-admin-user/admin-pop-desc.tsx"


// Installed Dependencies
import axios from 'axios'
import 'chart.js/auto'
import { Chart } from 'react-chartjs-2'
import { useNavigate } from "react-router-dom"


const generateRandomColor = () => {
  // Generate random RGB values
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  // Combine RGB values into a HEX color code
  const randomColor = `rgb(${r},${g},${b})`;

  return randomColor;
};


function UserSuggCareer(){
  const [course, setCourse] = useState([]);
  const [label, setLabel] = useState(["Loading"]);
  const [list, setList] = useState([
    {name: "test", desc: "test"}
  ]);
  const [con, setCon] = useState("");
  const [data, setData] = useState([]);
  const [color, setColor] = useState([]);

  const navigate = useNavigate();
  const onGet = useCallback((id : any) => {
    
    switch(id){
      case 0:
        navigate("/suggestion/school");
        break;
      case 1:
        navigate("/suggestion/course");
	break;
      case 2:
        navigate("/suggestion/career");
	break;
      default:
        navigate("/suggestion");
    }
  }, [navigate]);
 


  // Content
  useEffect(() => {
    const req_url = "http://localhost:5000/app/sugg/results";
     const req_url2 = "http://localhost:5000/app/sugg/career";
     const req_url3 = "http://localhost:5000/app/sugg/test";

    const userID = {userId: 1};
    const req1 = axios.post(req_url, userID); 
    const req2 = axios.post(req_url2, userID);
    const req3 = axios.post(req_url3, userID);

    Promise.all([req1, req2, req3])
      .then(responses => {
        const [res1, res2, res3] = responses;
	setCourse(res1.data);
	setList(res2.data);

	const title = [];
	for (let i = 0; i < res3.data.length; i++){
          title.push(res3.data[i]["title"]);
	}
        setLabel(title);
	const d = [];
	for (let i = 0; i < res3.data.length; i++){
          d.push(res3.data[i]["score"]);
	}
	setData(d);
	const colors = [];
        for (let i = 0; i < title.length; i++){
          colors.push(generateRandomColor());
        }
	setColor(colors);

      }).catch(error => {
        console.log("Failed Request: " + error);
      })
    }, []);

  const intensity = [];
  for (const thres in data){
     if(data[thres] <= 25){
       intensity.push(1.2);
     }
     else if (data[thres] <= 50){
       intensity.push(1.4);
     }
     else if (data[thres] <= 75){
       intensity.push(1.6);
     }
     else intensity.push(1.9);
  }

  const pie = {
    labels: label,
    datasets: [
      {
        data: data,
        backgroundColor: color
      },
    ],
  };

  const clicked = (data : any) => {
    setCon(<AdminDescComp 
      name={data["careerName"]}
      desc={data["description"]}
    />);
  }

  return (
    <>
    <UserNavBar/> 
    <div id="sugg-article">
      <div id="sug-stats">       
	<div id="sug-graph">
   	  <Chart type="pie" data={pie} options= {{ maintainAspectRatio: false }}/>
	</div>
        <ul>
          {data.map((item, key) => (
            <li id="criter"key={key} style={{filter:'brightness('+intensity[key]+')'}}>
	      {label[key]}: {item}%
	    </li>
          ))}
        </ul> 
      </div>
      <div id="sug-cons">
	<ul>
	  {list.map((item, key) => (
            <li key={key}> 
	      <div onClick={() => {clicked(item)}}> {item["careerName"]} </div>
	    </li>
	  ))}
	</ul>
      </div>
      {con}
    </div>
    </>
  )
}

export default UserSuggCareer;
