import React from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

export default function Navbar({
  menuOpen,
  setMenuOpen,
  aiMenuOpen,
  setAiMenuOpen,
  menuRef,
  aiMenuRef,
  darkMode,
  toggleDarkMode,
  onUpgrade,
  onLogout,
  LogoImg
}) {
  return (
    <nav className="navbar">
      <div className="nav-left" style={{ display: "flex", alignItems: "center" }}>
        <img
          src={LogoImg}
          alt="Investify Logo"
          height={48}
          style={{ maxHeight: 48, maxWidth: 48, marginRight: 8 }}
        />
      </div>
      <div className="nav-right">
        <div className="dropdown" ref={menuRef}>
          <button onClick={() => setMenuOpen(v => !v)} className="dropdown-toggle">☰ Menu</button>
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
                <button onClick={onLogout}>Logout</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="dropdown" ref={aiMenuRef}>
          <button onClick={() => setAiMenuOpen(v => !v)} className="dropdown-toggle">☰ AI Tools</button>
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
        <button onClick={toggleDarkMode} className="theme-toggle" aria-label="Toggle dark mode">
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button onClick={onUpgrade} className="upgrade-button">Upgrade</button>
      </div>
    </nav>
  );
}
