// React Library
import React from 'react'
import {useState, useEffect, useCallback} from 'react'


// Import File
import './admin_pop_box.css'

// Installed Dependencies
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function AdminInboxComp({name, desc}){
  const [message, setMessage] = useState("");

  

  const closePop = () => {
    window.location.reload();
  };
  
  return(
    <div id="admin-popup">
     <div id="user-message"><h1>{name}</h1></div>
     <div id="msg-subject"><strong>Description</strong></div>
     <p id="msg-content">{desc}</p>
      <button onClick={closePop}>Close</button>
    </div>
  )
}

export default AdminInboxComp;
