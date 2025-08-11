import React from 'react'
import axios from 'axios'
import {useState, useEffect} from 'react'
import AdminInboxComp from './admin_pop_box.tsx'
import './admin_box.css'	

function AdminBox({title, header, values, buttons}){
    const [addRender, setAddRender] = useState("");
    const [currentTime, setCurrentTime] = useState(new Date());

useEffect(() => {
    // This effect will run once when the component mounts
    const intervalId = setInterval(() => {
      // Update the current date every second
      setCurrentTime(new Date());
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // The emp


      const truncateString = (str, maxLength) => {
      if (str == null) return str;
        return str.length > maxLength ? str.slice(0, maxLength) + '...' : str;
      };

    const clicked = async (id, row) => {
      
      let mode = ""; // What execution needs to be done

      // Choose function to apply to row
      switch(id){
        case "Restore":
          console.log("Restore");
	  mode = "restore";
          break;
        case "Archived":
          console.log("Archived");
	  mode = "archive";
          break;
	case "Reply":
	  mode = "reply";
	  break;
        default:
          console.log("Failed");
      }

   const formattedDateTime = () => {
      const year = currentTime.getUTCFullYear();
      const month = (`0${currentTime.getUTCMonth() + 1}`).slice(-2); // Months are zero-based
      const day = (`0${currentTime.getUTCDate()}`).slice(-2);
      const hours = (`0${currentTime.getUTCHours()}`).slice(-2);
      const minutes = (`0${currentTime.getUTCMinutes()}`).slice(-2);
      const seconds = (`0${currentTime.getUTCSeconds()}`).slice(-2);

    return `${year}/${month}/${day}`;
  };  

  if (mode == "reply"){
         try {
          const logData = {
             "userId": 1,
  	     "action": "Reply",
 	     "classId": "message"
	  };

           const response = await axios.post('http://localhost:5000/app/profile/pdata', row);

           const name = response.data[0]["firstName"] + " " + response.data[0]["lastName"];
	   setAddRender(<AdminInboxComp
             name={name}
	     email={response.data[0]["email"]}
	     messages={row["message"]}
	     subject={row["subject"]}
	     id={row["messageId"]}
	   />);

         } catch (error) {
             console.error('Error:', error);
         }  
	
      }
      else if (mode == "archive" && title == "Accounts"){
      try{
        const logData = {
           "userId": 1,
	   "action": "Archived",
	   "classId": "account"
	};
        const response1 = await axios.post('http://localhost:5000/app/account/user', id);
          
 	const arcData = {
	   "userId": 1,
	   "objectId": row["User ID"],
           "classId": 'account'
	};

        const response = await axios.post('http://localhost:5000/app/account/archive', row);
	const response2 = await axios.post('http://localhost:5000/app/logs/push', logData);

	const response3 = await axios.post('http://localhost:5000/app/archive/account', arcData);
        window.location.reload();

      } catch(error){console.log("test");}
      }
      else if (mode == "restore" && title=="Accounts"){
        try {
          const logData = {
             "userId": 1,
  	     "action": "Restore",
	     "classId": "account"
	  };
       	  const response3 = await axios.post('http://localhost:5000/app/logs/push', logData);
         
          const response = await axios.post('http://localhost:5000/app/account/restore/0', row);
          const response2 = await axios.post('http://localhost:5000/app/account/restore/1', row);
         
	  window.location.reload();

        } catch (error) {
          console.error('Error:', error);
        }  
      }

      else if (mode == "archive" && title == "Inbox"){
      try{
        const logData = {
           "userId": 1,
	   "action": "Archived",
	   "classId": "message"
	};

        const response1 = await axios.post('http://localhost:5000/app/messages/archive', row);

	row["date"] = formattedDateTime();
	const response2 = await axios.post('http://localhost:5000/app/logs/push', logData);

	const response3 = await axios.post('http://localhost:5000/app/archive/message', row);
	window.location.reload();
      } catch(error){console.log(error);}
      }

      else if (mode == "restore" && title=="Archive"){
        try {
          const logData = {
             "userId": 1,
  	     "action": "Restore",
	     "classId": "account"
	  };

       	  const response3 = await axios.post('http://localhost:5000/app/logs/push', logData);
          const response = await axios.post('http://localhost:5000/app/archive/restore/0', row);
          const response2 = await axios.post('http://localhost:5000/app/archive/restore/1', row);

	  window.location.reload();

        } catch (error) {
          console.error('Error:', error);
        }  
      }
    };

   const [selectedOption, setSelectedOption] = useState(header[0].label);
   const [searchTerm, setSearchTerm] = useState(''); 

   const filteredData = values.filter((item) => {
     return (
       (!selectedOption || String(item[selectedOption]).toLowerCase().includes(searchTerm.toLowerCase())) &&
         Object.values(item).some(
          (value) =>
           (typeof value === 'string' || typeof value === 'number') && value !== null &&
           String(value).toLowerCase().includes(searchTerm.toLowerCase())
       )
     );
   });    


   const handleSearchTermChange = event => {
      setSearchTerm(event.target.value);
    };


   const handleDropdownChange = (event) => {
     setSelectedOption(event.target.value);
   };

   return (
     <div id="article">
       {addRender}
       <h1> {title} </h1>
       <div id="admin-box">
        <input
          type="text"
          placeholder="search"
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
        <select
          id="filter"
          name="filter"
          value={selectedOption}
          onChange={handleDropdownChange}
        >
          {header.map((rows) => (
            <option key={rows.id} value={rows.label}>
              {rows.label}
            </option>
          ))}
        </select>
	<table>
	   <thead>
   	     <tr id="header">
	       {header.map((rows) => (
	         <th key={rows.id}> 
	           {rows.label}
	         </th>
	       ))}
	     </tr>
	   </thead>
	   <tbody>
             {filteredData.map((rows) => (
	       <tr key={rows.id}>
	         {Object.keys(rows).map((key, row) => (
	           <td key={key}>
	             {truncateString(rows[key], 10)}
	           </td>
	         ))}
	         {Object.keys(buttons).map((key, row) => (
	           <td key={key}>
		     <button type="button" onClick={() => clicked(buttons[key], rows)}>{buttons[key]}</button>
		   </td>
	         ))}
	       </tr>
	     ))}
	   </tbody>
	 </table>
       </div>
     </div>
   );
}

export default AdminBox;
