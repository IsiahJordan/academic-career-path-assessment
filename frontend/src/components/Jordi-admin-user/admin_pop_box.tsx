// React Library
import React from 'react'
import {useState, useEffect, useCallback} from 'react'


// Import File
import './admin_pop_box.css'

// Installed Dependencies
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function AdminInboxComp({name, email, messages, subject, id}){
  const [message, setMessage] = useState("");
  const [active, setActive] = useState(true);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    // Implement your submit logic here
    console.log('Reply:', message);
    
    const content = {
      "subject": "Reply", 
      "message": message,
      "userID": 2
    };

    const upd = {
      "row": id
    }
    
    try {
      const response = await axios.post("http://localhost:5000/app/message/send", content);
      const response2 = await axios.post("http://localhost:5000/app/message/answ", upd);

      console.log("Successful");

    } catch(error){
      console.log("Failed");
    }
    window.location.reload();
  };
  

  const closePop = () => {
    window.location.reload();
  };
  
  return(
    <div id="admin-popup">
     <div id="user-message">{name} {"<" + email + ">"}</div>
     <div id="msg-subject"><strong>{subject}</strong></div>
     <p id="msg-content">{messages}</p>
     <textarea
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={closePop}>Close</button>
    </div>
  )
}

export default AdminInboxComp;
