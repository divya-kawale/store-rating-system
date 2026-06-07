import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const StoreList = () => {
  const [stores, setStores] = useState([]);
  const [ratings, setRatings] = useState({});
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  const navigate = useNavigate();

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      const res = await API.get("/store/all");
      setStores(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const rateStore = async (storeId) => {
    const ratingValue = ratings[storeId];

    if (!ratingValue || ratingValue < 1 || ratingValue > 5) {
      alert("Please enter rating between 1 to 5");
      return;
    }

    try {
      const store = stores.find((s) => s.id === storeId);

      if (store?.user_rating) {
        await API.put("/rating/update", {
          store_id: storeId,
          rating: ratingValue,
        });

        alert("Rating Updated Successfully");
      } else {
        await API.post("/rating/submit", {
          store_id: storeId,
          rating: ratingValue,
        });

        alert("Rating Submitted Successfully");
      }

      fetchStores();

      setRatings({
        ...ratings,
        [storeId]: "",
      });
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
  };

  const filteredStores = stores
    .filter(
      (store) =>
        store.name.toLowerCase().includes(search.toLowerCase()) ||
        store.address.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const ratingA = Number(a.average_rating) || 0;
      const ratingB = Number(b.average_rating) || 0;

      return sortOrder === "asc"
        ? ratingA - ratingB
        : ratingB - ratingA;
    });

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h2>Store Listings</h2>

        <button style={styles.logoutButton} onClick={logout}>
          Logout
        </button>
      </div>

      {/* Search & Sort */}
      <div style={styles.topBar}>
        <input
          style={styles.search}
          type="text"
          placeholder="Search by store name or address..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          style={styles.sortButton}
          onClick={() =>
            setSortOrder(
              sortOrder === "asc" ? "desc" : "asc"
            )
          }
        >
          Sort Rating (
          {sortOrder === "asc"
            ? "Low → High"
            : "High → Low"}
          )
        </button>
      </div>

      {/* Stores */}
      <div style={styles.listContainer}>
        {filteredStores.length > 0 ? (
          filteredStores.map((store) => (
            <div key={store.id} style={styles.card}>
              <h3>{store.name}</h3>

              <p style={styles.text}>
                <strong>Address:</strong>{" "}
                {store.address}
              </p>

              <p style={styles.rating}>
                ⭐ Overall Rating:{" "}
                {store.average_rating || 0}
              </p>

              <p style={styles.rating}>
                ⭐ Your Rating:{" "}
                {store.user_rating || "Not Rated"}
              </p>

              <input
                style={styles.input}
                type="number"
                min="1"
                max="5"
                placeholder="Enter rating (1-5)"
                value={ratings[store.id] || ""}
                onChange={(e) =>
                  setRatings({
                    ...ratings,
                    [store.id]: e.target.value,
                  })
                }
              />

              <button
                style={styles.button}
                onClick={() =>
                  rateStore(store.id)
                }
              >
                {store.user_rating
                  ? "Update Rating"
                  : "Submit Rating"}
              </button>
            </div>
          ))
        ) : (
          <h3>No Stores Found</h3>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f2f2f2",
    padding: "20px",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },

  logoutButton: {
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
  },

  topBar: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "20px",
    flexWrap: "wrap",
  },

  search: {
    width: "60%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },

  sortButton: {
    padding: "10px 15px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },

  listContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
  },

  card: {
    width: "280px",
    backgroundColor: "white",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },

  text: {
    color: "#555",
    marginBottom: "10px",
  },

  rating: {
    marginBottom: "10px",
  },

  input: {
    width: "100%",
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginTop: "10px",
  },

  button: {
    width: "100%",
    marginTop: "10px",
    padding: "10px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default StoreList;