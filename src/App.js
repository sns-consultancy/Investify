import React, { useState, useRef, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

// Components
import Logo from './components/Logo';
import ProtectedRoute from "./components/ProtectedRoute.js";
import CookieConsent from "./components/CookieConsent";
import UpgradeModal from "./components/UpgradeModal";

// Pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import AddInvestment from "./pages/AddInvestment";
import ViewPortfolio from "./pages/Viewportfolio";
import InvestmentHistory from "./pages/InvestmentHistory";
import StockAnalyzer from "./pages/StockAnalyzer";
import InvestChatbot from "./pages/StockAnalyzer";
import MarketNewsSummarizer from "./pages/MarketNewsSummarizer";
import AiRecommendations from "./pages/AiRecommendations";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Plans from "./pages/Plans";
import BillingHistory from "./pages/BillingHistory";
import ProfilePage from "./pages/ProfilePage";
import Terms from "./pages/Terms";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import EULA from "./pages/EULA";
import Disclaimer from "./pages/Disclaimer";
import CookiePolicy from "./pages/CookiePolicy";
import AppSelector from "./pages/AppSelector";
import FindAdvisors from "./pages/FindAdvisors";
import AIChatbot from "./components/AIChatbot";

function AppContent() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [aiMenuOpen, setAiMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const menuRef = useRef(null);
  const aiMenuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
      if (aiMenuRef.current && !aiMenuRef.current.contains(e.target)) {
        setAiMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleUpgrade = async () => {
    const userToken = localStorage.getItem("token");
    try {
      const res = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          priceId: process.env.REACT_APP_STRIPE_PRICE_ID,
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error("Checkout session could not be created.");
      }
    } catch (err) {
      console.error("Checkout error", err);
      toast.error("Could not start checkout.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const hideNav = ["/", "/login", "/signup"].includes(location.pathname);

  return (
    <div className={`app-container ${darkMode ? "dark" : ""}`}>
      {!hideNav && (
        <nav className="navbar">
          <div className="nav-left"><Logo /></div>
          <div className="nav-right">
            {/* Main Menu */}
            <div className="dropdown" ref={menuRef}>
              <button onClick={() => setMenuOpen(!menuOpen)} className="dropdown-toggle">☰ Menu</button>
              <AnimatePresence>
                {menuOpen && (
                  <motion.div className="dropdown-menu" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                    <Link to="/home">Home</Link>
                    <Link to="/add-investment">Add Investment</Link>
                    <Link to="/view-portfolio">View Portfolio</Link>
                    <Link to="/investment-history">Investment History</Link>
                    <Link to="/find-advisors">Find Advisors</Link>
                    <Link to="/about">About</Link>
                    <Link to="/contact">Contact</Link>
                    <Link to="/terms">Terms</Link>
                    <hr />
                    <Link to="/profile">Profile</Link>
                    <Link to="/billing-history">Billing</Link>
                    <button onClick={handleLogout}>Logout</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {/* AI Menu */}
            <div className="dropdown" ref={aiMenuRef}>
              <button onClick={() => setAiMenuOpen(!aiMenuOpen)} className="dropdown-toggle">☰ AI Tools</button>
              <AnimatePresence>
                {aiMenuOpen && (
                  <motion.div className="dropdown-menu" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                    <Link to="/stock-analyzer">Stock Analyzer</Link>
                    <Link to="/invest-chatbot">Invest Chatbot</Link>
                    <Link to="/news-summarizer">Market News</Link>
                    <Link to="/ai-recommendations">AI Insights</Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {/* Dark Mode */}
            <button onClick={toggleDarkMode} className="theme-toggle" aria-label="Toggle dark mode">
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            {/* Upgrade */}
            <button onClick={handleUpgrade} className="upgrade-button">Upgrade</button>
          </div>
        </nav>
      )}
      {hideNav && (
        <div className="banner">
          <h1>Welcome to Investify</h1>
          <p>Your AI-powered investment assistant – anytime, anywhere.</p>
        </div>
      )}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/add-investment" element={<ProtectedRoute><AddInvestment /></ProtectedRoute>} />
        <Route path="/view-portfolio" element={<ProtectedRoute><ViewPortfolio /></ProtectedRoute>} />
        <Route path="/investment-history" element={<ProtectedRoute><InvestmentHistory /></ProtectedRoute>} />
        <Route path="/stock-analyzer" element={<ProtectedRoute><StockAnalyzer /></ProtectedRoute>} />
        <Route path="/invest-chatbot" element={<ProtectedRoute><InvestChatbot /></ProtectedRoute>} />
        <Route path="/news-summarizer" element={<ProtectedRoute><MarketNewsSummarizer /></ProtectedRoute>} />
        <Route path="/ai-recommendations" element={<ProtectedRoute><AiRecommendations /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/billing-history" element={<BillingHistory />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/eula" element={<EULA />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/cookies" element={<CookiePolicy />} />
        <Route path="/app-selector" element={<AppSelector />} />
        <Route path="/find-advisors" element={<FindAdvisors />} />
        <Route path="/chat" element={<AIChatbot />} />
      </Routes>
      {!hideNav && (
        <footer>
          <p>© 2025 Investify. All rights reserved.</p>
          <nav style={{ marginTop: "0.5rem" }}>
            <Link to="/terms">Terms</Link> | <Link to="/privacy">Privacy</Link> | <Link to="/eula">EULA</Link> | <Link to="/disclaimer">Disclaimer</Link> | <Link to="/cookies">Cookies</Link>
          </nav>
        </footer>
      )}
      <CookieConsent />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}