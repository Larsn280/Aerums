import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import RequireAuth from "./components/authentication/RequireAuth";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layOut/Layout";

import "./utilities.css";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
