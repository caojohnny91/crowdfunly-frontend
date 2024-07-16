import * as authService from "../../services/authService";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../SigninForm/SignForms.css";

const SignupForm = (props) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState([""]);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordConf: "",
  });

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUserResponse = await authService.signup(formData);
      props.setUser(newUserResponse.user);
      navigate("/");
    } catch (err) {
      updateMessage(err.message);
    }
  };

  const { username, email, password, passwordConf } = formData;

  const isFormInvalid = () => {
    return !(username && email && password && password === passwordConf);
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <fieldset aria-labelledby="signForms-legend">
          <legend className="signForms-legend">Sign Up</legend>

          <div className="signForms-inputs">
            <label htmlFor="username">Username:</label>
            <input type="text" id="name" value={username} name="username" onChange={handleChange} />
          </div>
          <div className="signForms-inputs">
            <label htmlFor="email">Email Address:</label>
            <input type="email" id="email" value={email} name="email" onChange={handleChange} />
          </div>
          <div className="signForms-inputs">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" value={password} name="password" onChange={handleChange} />
          </div>
          <div className="signForms-inputs">
            <label htmlFor="confirm">Confirm Password:</label>
            <input type="password" id="confirm" value={passwordConf} name="passwordConf" onChange={handleChange} />
          </div>
          <div className="signForms-buttons">
            <button disabled={isFormInvalid()}>Sign Up</button>
          </div>
        </fieldset>
      </form>
    </main>
  );
};

export default SignupForm;
