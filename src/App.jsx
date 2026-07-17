import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Favorites from "./pages/Favorites";
import Gallery from "./pages/Gallery";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import Request from "./pages/Request";
import WhatsNew from "./pages/WhatsNew";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import About from "./pages/About";
import HelpCenter from "./pages/HelpCenter";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/history" element={<History />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/request" element={<Request />} />
      <Route path="/whats-new" element={<WhatsNew />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/about" element={<About />} />
      <Route path="/help-center" element={<HelpCenter />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}