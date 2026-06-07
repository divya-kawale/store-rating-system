import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const StoreOwnerDashboard = () => {
  const [averageRating, setAverageRating] = useState(0);
  const [raters, setRaters] = useState([]);

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboard();
  }, []);

  // ---------------- FETCH DASHBOARD ----------------
  const fetchDashboard = async () => {
    try {
      const res = await API.get("/owner/dashboard");

      setAverageRating(res.data.average_rating || 0);
      setRaters(res.data.users || []);
    } catch (err) {
      console.log("Dashboard Error:", err);
    }
  };

  // ---------------- UPDATE PASSWORD ----------------
  const updatePassword = async () => {
    try {
      await API.put("/auth/update-password", passwordData);

      alert("Password updated successfully");

      setPasswordData({
        oldPassword: "",
        newPassword: "",
      });
    } catch (err) {
      console.log(err);
      alert("Failed to update password");
    }
  };

  // ---------------- LOGOUT ----------------
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div style={styles.page}>
      
      {/* HEADER */}
      <div style={styles.header}>
        <h2 style={styles.title}>Store Owner Dashboard</h2>
        <button style={styles.logoutBtn} onClick={logout}>
          Logout
        </button>
      </div>

      {/* STATS */}
      <div style={styles.grid}>
        <div style={styles.card}>
          <h4>Average Rating</h4>
          <h1 style={styles.rating}>⭐ {averageRating}</h1>
        </div>

        <div style={styles.card}>
          <h4>Total Ratings</h4>
          <h1 style={styles.rating}>{raters.length}</h1>
        </div>
      </div>

      {/* PASSWORD */}
      {/* <div style={styles.cardFull}>
        <h3>Update Password</h3>

        <input
          type="password"
          placeholder="Old Password"
          value={passwordData.oldPassword}
          onChange={(e) =>
            setPasswordData({
              ...passwordData,
              oldPassword: e.target.value,
            })
          }
          style={styles.input}
        />

        <input
          type="password"
          placeholder="New Password"
          value={passwordData.newPassword}
          onChange={(e) =>
            setPasswordData({
              ...passwordData,
              newPassword: e.target.value,
            })
          }
          style={styles.input}
        />

        <button style={styles.button} onClick={updatePassword}>
          Update Password
        </button>
      </div> */}

      {/* PASSWORD */}
<div style={styles.centerCard}>
  <h3 style={styles.sectionTitle}>Update Password</h3>

  <div style={styles.formGroup}>
    <label style={styles.label}>Old Password</label>
    <input
      type="password"
      placeholder="Enter old password"
      value={passwordData.oldPassword}
      onChange={(e) =>
        setPasswordData({
          ...passwordData,
          oldPassword: e.target.value,
        })
      }
      style={styles.input}
    />
  </div>

  <div style={styles.formGroup}>
    <label style={styles.label}>New Password</label>
    <input
      type="password"
      placeholder="Enter new password"
      value={passwordData.newPassword}
      onChange={(e) =>
        setPasswordData({
          ...passwordData,
          newPassword: e.target.value,
        })
      }
      style={styles.input}
    />
  </div>

  <button style={styles.primaryButton} onClick={updatePassword}>
    Update Password
  </button>
</div>

      {/* TABLE CARD (CENTERED) */}
      <div style={styles.tableContainer}>
        <h3>Users Who Rated Your Store</h3>

        <table style={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Rating</th>
            </tr>
          </thead>

          <tbody>
            {raters.length > 0 ? (
              raters.map((u, index) => (
                <tr key={index}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>⭐ {u.rating}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No ratings yet</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ---------------- STYLES ----------------
const styles = {
  page: {
    padding: "25px",
    minHeight: "100vh",
    backgroundColor: "#f4f6f8",
    fontFamily: "Arial",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },

  title: {
    margin: 0,
  },

  logoutBtn: {
    backgroundColor: "#e74c3c",
    color: "white",
    padding: "10px 15px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },

  grid: {
    display: "flex",
    gap: "20px",
    marginBottom: "20px",
  },

  card: {
    flex: 1,
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
    textAlign: "center",
  },

  cardFull: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
    marginBottom: "20px",
  },

  // ✅ CENTER TABLE
  tableContainer: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
    width: "80%",
    maxWidth: "900px",
    margin: "0 auto",
  },

  rating: {
    margin: "10px 0 0",
  },

  // =========================
  // 🔐 PASSWORD UI STYLES (NEW)
  // =========================

  centerCard: {
    backgroundColor: "white",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
    width: "60%",
    maxWidth: "500px",
    margin: "20px auto",
  },

  sectionTitle: {
    marginBottom: "15px",
    textAlign: "center",
  },

  formGroup: {
    marginBottom: "15px",
  },

  label: {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
    fontSize: "14px",
  },

  input: {
    width: "100%",
    padding: "12px",
    margin: "8px 0",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
  },

  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#2ecc71",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "10px",
  },

  primaryButton: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  table: {
    width: "100%",
    marginTop: "10px",
    borderCollapse: "collapse",
    textAlign: "center",
  },
};

export default StoreOwnerDashboard;