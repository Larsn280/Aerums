import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import RequireAuth from "./components/authentication/RequireAuth";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layOut/Layout";
import UnderConstruction from "./components/underConstruction/UnderConstruction";
import Calendar from "./components/calendar/Calendar";

import "./utilities.css";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/construction" element={<UnderConstruction />} />

        {/* Protected Routes */}
        <Route element={<RequireAuth />}>
          <Route path="/calendar" element={<Calendar />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
