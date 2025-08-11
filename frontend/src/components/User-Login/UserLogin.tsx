import "./UserLogin.css";
import {useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import LoginValidation from "./LoginValidation";
import axios from "axios";
import { useUser } from '../User-Context/UserContext';


const UserLogin = () => {
  const { updateUser } = useUser();

  const [values, setValues]= useState({
   
    email: '',
    password: ''
  })
  const navigate = useNavigate();
  const [errors, setErrors]= useState<{[key: string]: string}>({})

  const handleInput =(event:any)=> {
    setValues(prev => ({...prev,[event.target.name]:[event.target.value]}))
  }
  const handleSubmit = (event:any) => {
    event.preventDefault();
    const validationErrors = LoginValidation(values)
    setErrors(validationErrors);

    if (validationErrors.email === "" && validationErrors.password === ""
    ) {
      axios
      .post("http://localhost:8081/login", values)
      .then((res) => {
          if (res.data.status === "success") {
              
              
              const myUserData = res.data.data[0];

              const userID = myUserData.userID;
              const firstname = myUserData.firstname;
              const lastname = myUserData.lastname;
              const gender = myUserData.gender;
              const city = myUserData.city;
              const email = myUserData.email;
              const role = myUserData.role;
              const status = myUserData.status;

              alert("Login success ! Welcome " + firstname +' '+lastname);
               
             
              
              const payload ={
                userID : userID,
                firstname : firstname,
                lastname : lastname,
                gender : gender,
                city : city,  
                email: email,
                role : role,
                status : status
              }
              console.log(payload);
              updateUser(payload);
              navigate('/home');

          } else {
              alert("Wrong email or password");
          }
      })
      .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      <body>
    <div className="login-container">
      <div className="login-heading">
        <h1>Login</h1>
      </div>
      <div className="form-layout">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="text"
              className="form-control"
              name='email'
              onChange={handleInput}/>
              {errors.email && <span className="text-danger">{errors.email}</span>}
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name='password'
              onChange={handleInput}/>
              {errors.password && <span className="text-danger">{errors.password}</span>}
          </div>
          <div className="ForgotPass">
            <Link to="/forgot">Forgot Password</Link>
          </div>
          <div className="LoginButton">
            <button type="submit" className="btn btn-primary">Log In</button>
          </div>
          <div className="SignUp">
            <p>Don't have an account? </p>
            <Link to="/signup" >create one</Link>
          </div>
        </form>
      </div>
    </div>
    </body>
    </div>
  );
};

export default UserLogin;
