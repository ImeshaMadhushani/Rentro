
//import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Vehicles from "./pages/Vehicles";
import ViewDetails from "./pages/ViewDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/viewdetails/:id" element={<ViewDetails />} />
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
