import React from 'react'
import './user_profile.css'
import { useUser } from '../User-Context/UserContext';


interface props{
	name : any;
	pic : any;
	gender : any;
	bday : any;
	city : any;
}
function UserProfileDetail({name, pic, gender, bday, city}: props){
  const full_name = name.last + ", " + name.first + " " + name.mid;
  const { userData } = useUser();

  return(
    <article>
      <div id="profile">
      </div>
      <img src={pic}></img>
      <h4 id="name"> {full_name} </h4>
	  
      <div id="profile-container">
        <div className="profile-column">
	  <div>
	  <h4 id="name" style={{paddingRight:"14%"}}><strong>Email:</strong> {userData?.email}</h4>
	    
  	    <strong className="detail">Basic Information</strong>
	    <div className="column">
              <div className="column-detail">
  	        <strong>First Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong> 
		<br/>
	        <strong>Last Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong> 
		<br/>
	        <strong>Gender&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong> 
		<br/>
	        <strong>City&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong> 
	      </div>
	      <div className="column-detail">
	        <input type="text" value={name.first}/>
		<br/>
                <input type="text" value={name.last}/>
		<br/>
                <input type="text" value={gender}/>
		<br/>
                <input type="text" value={city}/>
	      </div>
	    </div>
	  </div>
	</div>
        <div className="profile-column">
	  <div>
    	    <strong className="detail">Account Management</strong>
            <div className="column">
              <div className="column-detail">
  	        <a href="/forgot">Reset Password</a> 
		<br/>
	       
	      </div>
	    </div>

	  </div>
	</div>      
      </div>
    </article>
  );
}

export default UserProfileDetail
