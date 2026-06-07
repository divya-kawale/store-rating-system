import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const signup = async () => {
    if (!name || !email || !address || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      await API.post("/auth/signup", {
        name,
        email,
        address,
        password,
      });

      alert("Signup Successful");
      navigate("/");
    } catch (err) {
      console.log(err);
      alert("Signup Failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Signup</h2>

        <input
          style={styles.input}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          style={styles.input}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          placeholder="Address"
          onChange={(e) => setAddress(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={styles.button} onClick={signup}>
          Signup
        </button>

        <p onClick={() => navigate("/")}>
          Already have account? Login
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
  },
  card: {
    width: "320px",
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "8px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Signup;