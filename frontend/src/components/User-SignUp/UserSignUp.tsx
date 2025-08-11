import "./UserSignUp.css"
import SignUpValidation from "./SignUpValidation"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
const UserSignUp = () => {

  //get data
  const [values, setValues]= useState({
    firstname:'',
    lastname:'',
    gender:'',
    city:'',
    email: '',
    password: '',
    role:'user',
    status:'active'
  })
  const navigate = useNavigate();
  const [errors, setErrors]= useState<{[key: string]: string}>({})
  // When form button is clicked call LoginValidation 

  const handleInput =(event:any)=> {
    setValues(prev => ({...prev, [event.target.name]: event.target.value}))
  }
  const handleSubmit = (event:any) => {
    event.preventDefault();
    const validationErrors = SignUpValidation(values);
    setErrors(validationErrors);

    if (
      validationErrors.firstname === "" &&
      validationErrors.lastname === "" &&
      validationErrors.gender === "" &&
      validationErrors.city === "" &&
      validationErrors.email === "" &&
      validationErrors.password === ""
    ) {
      axios
        .post("http://localhost:8081/signup", values)
        .then((res) => {
          navigate("/login");
          alert('Sign up successful');
        })
        .catch((err) => console.log(err));
    }
  };
  
  return (

    <div>
    <body>
    <div className="signup-container">
      <div className="signUp-heading">
        <h1>Sign Up</h1>
      </div>

      <div className="form-layout">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Firstname</label>
            <input
              type="text"
              className="form-control"
              name="firstname"
              value={values.firstname}
              onChange={handleInput}/>
              {errors.firstname && <span className="text-danger">{errors.firstname}</span>}
          </div>

          <div className="mb-5">
            <label className="form-label">Lastname</label>
            <input
              type="text"
              className="form-control"
              name="lastname"
              value={values.lastname}
              onChange={handleInput}/>
              {errors.lastname && <span className="text-danger">{errors.lastname}</span>}
          </div>
          <div className="gender-container mb-3">
            <div className="radioButton-gender mb-1">
            <label className="form-label">Gender</label>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="gender" value="Male" id="flexRadioDefault1"onChange={handleInput}/>
                <label className="form-check-label ">
                  Male
                </label>
              </div>
              <div className="form-check ">
                <input className="form-check-input " type="radio" name="gender" value="Female" id="flexRadioDefault2" onChange={handleInput}/>
                <label className="form-check-label ">
                  Female
                </label>
              </div>
            </div>
          {errors.gender && <span className="text-danger">{errors.gender}</span>}
          </div>
          
          <div className="city mb-3">
            <label className="form-label" id='citylabel'>City</label>
              <select
                className="form-select form-select-sm"
                aria-label="Small select example"
                name="city"
                id="city"
                value={values.city}
                onChange={handleInput}>
                <option value="">Select City</option>
                <option value="1">Caloocan</option>
                <option value="2">Las Pinas</option>
                <option value="3">Makati</option>
                <option value="4">Malabon</option>
                <option value="5">Mandaluyong</option>
                <option value="6">Manila</option>
                <option value="7">Marikina</option>
                <option value="8">Muntinlupa</option>
                <option value="9">Navotas</option>
                <option value="10">Paranaque</option>
                <option value="11">Pasay</option>
                <option value="12">Pateros</option>
                <option value="13">Quezon City</option>
                <option value="14">San Juan</option>
                <option value="15">Taguig</option>
                <option value="16">Valenzuela</option>
              </select>
            {errors.city && <span className="text-danger">{errors.city}</span>}
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
              <input
                type="text"
                className="form-control"
                name="email"
                value={values.email}
                onChange={handleInput}/>
                {errors.email && <span className="text-danger">{errors.email}</span>}
          </div>

          <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="text"
                className="form-control"
                name="password"
                value={values.password}
                onChange={handleInput}/>
                {errors.password && <span className="text-danger">{errors.password}</span>}
          </div>

          <div className="SignUpButton">
            <input type="hidden" name="role" value={values.role}/>
            <input type="hidden" name="status" value={values.status}/>
            <button type="submit" className="btn btn-primary">Register</button>
          </div>
        </form>

      </div>
    </div>
    </body>
    </div>
  )
}
export default UserSignUp