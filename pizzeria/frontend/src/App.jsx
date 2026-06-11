import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Services from "./pages/Service";
import CouponsOffers from "./components/CouponsOffers";
import Login from "./components/Login";
import Register from "./components/Register";

import MenuList from "./components/MenuList";
import Cart from "./components/Cart";
import UserProfile from "./components/UserProfile";
import HelpSupport from "./components/HelpSupport";
import AdminDashboard from "./components/AdminDashboard";
import BillList from "./components/BillList";
import PizzeriaAIChat from "./components/PizzeriaAIChat";
function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/login" element={<Login />} />
          <Route path="/services" element={<Services />} />
          <Route path="/coupons-offers" element={<CouponsOffers />} />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/menu"
          element={<MenuList />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/profile"
          element={<UserProfile />}
        />

        <Route
          path="/admin"
          element={<AdminDashboard />}
        />
        <Route
          path="/bills"
          element={<BillList />}
        />
      </Routes>
      <HelpSupport />
      <PizzeriaAIChat />

      <CouponsOffers /> 
      <Footer />
    </>
  );
}

export default App;