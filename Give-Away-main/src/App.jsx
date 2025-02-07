import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GiveAwayForm } from "./components/GiveAwayForm/GiveAwayForm";
import { AdminDashboard } from "./components/AdminDashboard/AdminDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GiveAwayForm />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;