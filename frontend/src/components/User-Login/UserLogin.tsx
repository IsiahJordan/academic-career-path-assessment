import "./UserLogin.css";
import { useState } from "react";
import axios from "axios";

const UserLogin = () => {
  //get data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: any) => {
    event.preventDefault();
    axios
      .post("http://localhost:8081/admin", { email, password })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div className="login-container">
      <div className="heading">
        <h1>Login</h1>
      </div>
      <div className="form-layout">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="text"
              className="form-control"
              id="name"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="text"
              className="form-control"
              id="displayname"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="ForgotPass">
            <a href="">Forgot Password</a>
          </div>
          <div className="LoginButton">
            <button className="btn btn-primary">Log In</button>
          </div>
          <div className="SignUp">
            <p>Don't have an account? </p>
            <a href="">create one</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
