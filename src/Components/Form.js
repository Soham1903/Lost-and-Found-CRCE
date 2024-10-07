import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../form.css";

function Form() {
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setConfirmPassword] = useState("");
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (email.includes("crce") && password === cpassword) {
      const response = await fetch("http://127.0.0.1:8000/api/signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        setAlert({
          show: true,
          message: "Sign up successful! You can now log in.",
          type: "success",
        });
        setIsLogin(true);
      } else {
        setAlert({
          show: true,
          message: "Sign up failed. Please try again.",
          type: "danger",
        });
      }
    } else {
      if (!email.includes("crce")) {
        setAlert({
          show: true,
          message: "Kindly use your CRCE email.",
          type: "danger",
        });
      } else if (password !== cpassword) {
        setAlert({
          show: true,
          message: "Passwords do not match.",
          type: "danger",
        });
      }
    }
  };

  const handleLogin = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (response.ok) {
      setAlert({
        show: true,
        message: "Login successful! Redirecting...",
        type: "success",
      });
      setTimeout(() => navigate("/home"), 2000); // Redirect after 2 seconds
    } else {
      setAlert({
        show: true,
        message: "Login failed. Please check your credentials.",
        type: "danger",
      });
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        {alert.show && (
          <div
            className={`alert alert-${alert.type} alert-visible`}
            role="alert"
          >
            {alert.message}
          </div>
        )}
        <div className="form-toggle">
          <button
            className={isLogin ? "active" : ""}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={!isLogin ? "active" : ""}
            onClick={() => {
              setIsLogin(false);
            }}
          >
            Sign Up
          </button>
        </div>

        {isLogin ? (
          <div className="form">
            <h2>Login Form</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
          </div>
        ) : (
          <div className="form">
            <h2>Signup Form</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={cpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button onClick={handleSignup}>Sign up</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Form;
