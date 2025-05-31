
//import './App.css';
import { BrowserRouter as Router, Routes, Route ,Navigate} from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Vehicles from "./pages/Vehicles";
import ViewDetails from "./pages/ViewDetails";
import AdminDashboard from "./Admin/AdminDashboard";

// Route protection components
const ProtectedRoute = ({ children, roles = [] }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || !user.token) {
    return <Navigate to="/login" replace />;
  }

  // Check if user has required role
  if (roles.length > 0 && !roles.includes(user.role)) {
    return <Navigate to="/not-found" replace />;
  }

  return children;
};
function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        {/* Role-specific routes */}
        <Route path="/home" element={
          <ProtectedRoute roles={["CLIENT"]}>
            <Home />
          </ProtectedRoute>
        } />

        <Route path="/admin/dashboard" element={
          <ProtectedRoute roles={["ADMIN"]}>
            <AdminDashboard />
          </ProtectedRoute>
        } />

{/* 
      // Accessible to both admins and clients
        <Route path="/profile" element={
          <ProtectedRoute roles={["ADMIN", "CLIENT"]}>
            <UserProfile />
          </ProtectedRoute>
        } /> */}
        

        {/* Protected routes */}
        {/* <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} /> */}
        <Route path="/vehicles" element={<ProtectedRoute><Vehicles /></ProtectedRoute>} />
        <Route path="/viewdetails/:id" element={<ProtectedRoute><ViewDetails /></ProtectedRoute>} />
        {/* Add more routes as needed */}

       
    

  
      </Routes>
    </Router>
  );
}

export default App;
