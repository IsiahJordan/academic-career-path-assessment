import React from 'react'
import axios from 'axios'
import {useState, useEffect} from 'react'
import './admin_box.css'	


interface Values{
  title : any;
  header : any;
  values : any;
  buttons : any;
}
function AdminBox({title, header, values, buttons} :  Values){
    const clicked = async (id : any , row : any) => {
      console.log(id);
      console.log(row);
      
      let mode = "";

      // Choose function to apply to row
      switch(id){
        case "Restore":
          console.log("Restored");
	  mode = "restore";
          break;
        case "Archived":
          console.log("Archived");
	  mode = "archive";
          break;
        default:
          console.log("Failed");
      }
      if (mode !== ""){
        try {
	  const table = title.toLowerCase();

          const response = await axios.post('http://localhost:8081/app/' + table + '/' + mode + '/0', row);
          const response2 = await axios.post('http://localhost:8081/app/' + table + '/' + mode + '/1', row);

          console.log(response.data);
	  console.log(response2.data);
        } catch (error) {
          console.error('Error:', error);
        }  
      }
    };


   return (
     <article>
       <h1> {title} </h1>
       <div id="admin-box">
         <input type="search" placeholder="search">
	 </input>
	 <table>
	   <thead>
   	     <tr id="header">
	       {header.map((rows : any) => (
	         <th key={rows.id}> 
	           {rows.label}
	         </th>
	       ))}
	     </tr>
	   </thead>
	   <tbody>
             {values.map((rows : any) => (
	       <tr key={rows.id}>
	         {Object.keys(rows).map((key, row) => (
	           <td key={key}>
	             {rows[key]}
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
     </article>
   );
}

export default AdminBox;
