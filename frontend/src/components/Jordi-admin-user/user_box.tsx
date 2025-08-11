import React from 'react'
import axios from 'axios'
import {useState} from 'react'
import './user_box.css'


const UserMessageBox = () => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    // Implement your submit logic here
    console.log('Subject:', subject);
    console.log('Message:', message);
    
    const content = {
      "subject": subject, 
      "message": message,
      "userID": 1
    };
    
    try {
      const response = await axios.post("http://localhost:5000/app/message/send", content);
      console.log("Successful");

    } catch(error){
      console.log("Failed");
    }

  };

return (
    <div className="message-box">
      <input
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />

      <textarea
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>

      <button onClick={handleSubmit}>Submit</button>
    </div>
  )
};

export default UserMessageBox;
