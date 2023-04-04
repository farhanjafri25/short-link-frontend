import { useState } from "react";
import axios from "axios";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [name, setUsername] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await axios.post(`http://localhost:3002/user/login`, {
      email,
      name,
    });
    if(response.data.code === 400) {
      alert('SignUp as a new Account');
    }
    else {
    localStorage.setItem("access_token", response.data.data);
    window.location.href = "/dashboard";
    }
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    const response = await axios.post(`http://localhost:3002/user/signup`, {
      email,
      name,
    });
    console.log(`response`, response);
    if(response?.data.code === 400) {
      alert(`${response?.data?.message}`)
    } else {
    localStorage.setItem("access_token", response.data.data);
    window.location.href = "/dashboard";
    }
  };

  return (
    <div className="modal-div">
      <div style={{ textAlign: "center" }}>
        <h3>Short Link Generator</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          required
          type="email"
          id="email"
          className="input-box"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter Email"
        />
        <label htmlFor="username">Username:</label>
        <input
          className="input-box"
          required
          min={5}
          type="text"
          id="username"
          value={name}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Enter Username"
        />
        <button type="submit">Login</button>
        <button onClick={handleSignUp}>Sign Up</button>
      </form>
    </div>
  );
}

export default LoginForm;
