import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import StoreList from "./pages/StoreList";
import AdminDashboard from "./pages/AdminDashboard";
import StoreOwnerDashboard from "./pages/StoreOwnerDashboard";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* DEFAULT PAGE */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="*" element={<Login />} />

        {/* USER */}
        <Route
          path="/stores"
          element={
            <ProtectedRoute role="USER">
              <StoreList />
            </ProtectedRoute>
          }
        />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* OWNER */}
        <Route
          path="/owner"
          element={
            <ProtectedRoute role="STORE_OWNER">
              <StoreOwnerDashboard />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;