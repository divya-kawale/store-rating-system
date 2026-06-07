import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);

  const navigate = useNavigate();

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    role: "USER",
  });

  const [newStore, setNewStore] = useState({
    name: "",
    email: "",
    address: "",
    owner_id: "",
  });

  useEffect(() => {
    fetchDashboard();
    fetchUsers();
    fetchStores();
  }, []);

  // ---------------- LOGOUT ----------------
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  // ---------------- FETCH DASHBOARD ----------------
  const fetchDashboard = async () => {
    try {
      const res = await API.get("/admin/dashboard");
      setStats(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ---------------- FETCH USERS ----------------
  const fetchUsers = async () => {
    try {
      const res = await API.get("/admin/users");
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ---------------- FETCH STORES ----------------
  const fetchStores = async () => {
    try {
      const res = await API.get("/store/all");
      setStores(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ---------------- CREATE USER ----------------
  const createUser = async () => {
    try {
      await API.post("/admin/users", newUser);

      alert("User Created");

      setNewUser({
        name: "",
        email: "",
        password: "",
        address: "",
        role: "USER",
      });

      fetchUsers();
    } catch (err) {
      console.log(err);
      alert("Error creating user");
    }
  };

  // ---------------- CREATE STORE ----------------
  const createStore = async () => {
  try {
    if (!newStore.name || !newStore.email || !newStore.address || !newStore.owner_id) {
      alert("All fields including Owner ID are required");
      return;
    }

    const payload = {
      name: newStore.name,
      email: newStore.email,
      address: newStore.address,
      owner_id: parseInt(newStore.owner_id, 10),
    };

    console.log("SENDING TO BACKEND:", payload);

    const res = await API.post("/admin/stores", payload);

    console.log("SUCCESS RESPONSE:", res.data);

    alert("Store Created Successfully");

    setNewStore({
      name: "",
      email: "",
      address: "",
      owner_id: "",
    });

    fetchStores();
  } catch (err) {
    console.log("CREATE STORE ERROR:", err.response?.data || err.message);
    alert(err.response?.data?.message || "Error creating store");
  }
};

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <div style={styles.header}>
        <h2>Admin Dashboard</h2>

        <button onClick={logout} style={styles.logoutBtn}>
          Logout
        </button>
      </div>

      {/* STATS */}
      <div style={styles.statsContainer}>
        <div style={styles.card}>
          <h3>Total Users</h3>
          <p>{stats.totalUsers}</p>
        </div>

        <div style={styles.card}>
          <h3>Total Stores</h3>
          <p>{stats.totalStores}</p>
        </div>

        <div style={styles.card}>
          <h3>Total Ratings</h3>
          <p>{stats.totalRatings}</p>
        </div>
      </div>

      {/* ADD USER */}
      <h3>Add User</h3>

      <input
        placeholder="Name"
        value={newUser.name}
        onChange={(e) =>
          setNewUser({ ...newUser, name: e.target.value })
        }
      />

      <input
        placeholder="Email"
        value={newUser.email}
        onChange={(e) =>
          setNewUser({ ...newUser, email: e.target.value })
        }
      />

      <input
        placeholder="Password"
        type="password"
        value={newUser.password}
        onChange={(e) =>
          setNewUser({ ...newUser, password: e.target.value })
        }
      />

      <input
        placeholder="Address"
        value={newUser.address}
        onChange={(e) =>
          setNewUser({ ...newUser, address: e.target.value })
        }
      />

      <select
        value={newUser.role}
        onChange={(e) =>
          setNewUser({ ...newUser, role: e.target.value })
        }
      >
        <option value="USER">USER</option>
        <option value="ADMIN">ADMIN</option>
        <option value="STORE_OWNER">STORE_OWNER</option>
      </select>

      <button onClick={createUser}>Create User</button>

      {/* USERS TABLE */}
      <h3>Users</h3>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.address}</td>
              <td>{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ADD STORE */}
      <h3>Add Store</h3>

      <input
        placeholder="Store Name"
        value={newStore.name}
        onChange={(e) =>
          setNewStore({ ...newStore, name: e.target.value })
        }
      />

      <input
        placeholder="Email"
        value={newStore.email}
        onChange={(e) =>
          setNewStore({ ...newStore, email: e.target.value })
        }
      />

      <input
        placeholder="Address"
        value={newStore.address}
        onChange={(e) =>
          setNewStore({ ...newStore, address: e.target.value })
        }
      />

      {/* SIMPLE OWNER ID INPUT */}
      <input
        placeholder="Owner ID"
        value={newStore.owner_id}
        onChange={(e) =>
          setNewStore({
            ...newStore,
            owner_id: e.target.value,
          })
        }
      />

      <button onClick={createStore}>Create Store</button>

      {/* STORES TABLE */}
      <h3>Stores</h3>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {stores.map((s) => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.address}</td>
              <td>{s.average_rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// ---------------- STYLES ----------------
const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#f2f2f2",
    minHeight: "100vh",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },

  logoutBtn: {
    backgroundColor: "red",
    color: "white",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },

  statsContainer: {
    display: "flex",
    gap: "20px",
    marginBottom: "20px",
  },

  card: {
    backgroundColor: "white",
    padding: "15px",
    borderRadius: "10px",
    flex: 1,
    textAlign: "center",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },

  table: {
    width: "100%",
    backgroundColor: "white",
    marginBottom: "20px",
    borderCollapse: "collapse",
  },
};

export default AdminDashboard;