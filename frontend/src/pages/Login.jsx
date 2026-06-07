// import React, { useState } from "react";
// import { useEffect } from "react";
// import API from "../services/api";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();
//   // const [loading, setLoading] = useState(false);

//    useEffect(() => {
//     const token = localStorage.getItem("token");
//     const role = localStorage.getItem("role");

//     if (token) {
//       if (role === "ADMIN") {
//         navigate("/admin");
//       } else if (role === "USER") {
//         navigate("/stores");
//       } else if (role === "STORE_OWNER") {
//         navigate("/owner");
//       }
//     }
//   }, []);

//   const login = async () => {
//     if (!email || !password) {
//       alert("Please fill all fields");
//       return;
//     }

//     try {
//       setLoading(true);

//       const res = await API.post("/auth/login", {
//         email,
//         password,
//       });

//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("role", res.data.role);

//       alert("Login Successful");

//       if (res.data.role === "ADMIN") {
//         navigate("/admin");
//       } else if (res.data.role === "USER") {
//         navigate("/stores");
//       } else {
//         navigate("/owner");
//       }
//     } catch (err) {
//       console.log("Login Error:", err.response?.data || err.message);
//       alert(err.response?.data?.message || "Login Failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.card}>
//         <h2 style={styles.title}>Login</h2>

//         <input
//           style={styles.input}
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           style={styles.input}
//           placeholder="Password"
//           type="password"
//            value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button
//           style={styles.button}
//           onClick={login}
//           disabled={loading}
//         >
//           {loading ? "Logging in..." : "Login"}
//         </button>
//         <p onClick={() => navigate("/signup")}
//   style={{
  
//     marginTop: "20px",
//     cursor: "pointer",
//     color: "#007bff",
//     fontSize: "14px",
//   }}
// >
//   Don't have an account? Signup
 
// </p>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     height: "99vh",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#f2f2f2",
//   },
//   card: {
//     width: "300px",
//     padding: "40px",
//     backgroundColor: "white",
//     borderRadius: "10px",
//     boxShadow: "0 0 10px rgba(0,0,0,0.1)",
//     textAlign: "center",
//   },
//   title: {
//     marginBottom: "20px",
//   },
//   input: {
//     width: "100%",
//     padding: "10px",
//     margin: "10px 0",
//     borderRadius: "5px",
//     border: "1px solid #ccc",
//   },
//   button: {
//     width: "55%",
//     padding: "10px",
//     backgroundColor: "#007bff",
//     color: "white",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
//   },
// };

// export default Login;






import React, { useState } from "react";
import { useEffect } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // ✅ IMPORTANT: DO NOT AUTO REDIRECT FROM LOGIN PAGE
  useEffect(() => {
    // Just keeping it empty (no auto navigation)
  }, []);

  const login = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/login", {
        email,
        password,
      });

      // Save auth data
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      alert("Login Successful");

      // Role-based navigation AFTER login only
      if (res.data.role === "ADMIN") {
        navigate("/admin");
      } else if (res.data.role === "USER") {
        navigate("/stores");
      } else if (res.data.role === "STORE_OWNER") {
        navigate("/owner");
      } else {
        navigate("/");
      }

    } catch (err) {
      console.log("Login Error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Login</h2>

        <input
          style={styles.input}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          style={styles.button}
          onClick={login}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p
          onClick={() => navigate("/signup")}
          style={{
            marginTop: "20px",
            cursor: "pointer",
            color: "#007bff",
            fontSize: "14px",
          }}
        >
          Don't have an account? Signup
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
    width: "300px",
    padding: "40px",
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  title: {
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    width: "55%",
    padding: "10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Login;