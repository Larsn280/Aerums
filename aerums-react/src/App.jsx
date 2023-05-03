import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import RequireAuth from "./components/authentication/RequireAuth";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layOut/Layout";
import UnderConstruction from "./components/underConstruction/UnderConstruction";
import Calendar from "./components/calendar/Calendar";
import Freetime from "./components/freetime/Freetime";
import Friends from "./components/friends/Friends";
import Profile from "./components/profile/Profile";
import Activitys from "./components/activitys/Activitys";
import "./utilities.css";
import "./App.css";
import Booking from "./components/booking/Booking";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Protected Routes */}
        <Route element={<RequireAuth />}>
          <Route path="/construction" element={<UnderConstruction />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/freetime" element={<Freetime />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/activitys" element={<Activitys />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
