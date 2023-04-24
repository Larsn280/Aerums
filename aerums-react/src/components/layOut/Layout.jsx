import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";

const Layout = () => {
  return (
    <main className="App">
      <Navbar/>
      <Outlet />
      {/* <Footer/> */}
    </main>
  );
};

export default Layout;