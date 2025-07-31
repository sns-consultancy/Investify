// src/pages/Home.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MoonIcon, SunIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";

const NAV_LINKS = [
  { name: "AI Tools", to: "/ai-tools" },
  { name: "Menu", to: "/menu" },
  { name: "Contact", to: "/contact" },
  { name: "About", to: "/about" },
];

export default function Home() {
  const [dark, setDark] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  // Toggle dark mode
  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-800 to-blue-600 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
      {/* Navbar */}
      <header className="flex items-center justify-between px-5 py-4 shadow-md bg-white/80 dark:bg-black/70 backdrop-blur z-20">
        <div className="flex items-center space-x-3">
          {/* Large Logo */}
          <img
            src="/logo192.png" // Change to your actual logo path
            alt="Investify Logo"
            className="h-14 w-14 rounded-lg shadow-lg bg-white/60"
            draggable={false}
          />
          <span className="text-3xl font-bold tracking-wide text-gray-800 dark:text-gray-100 font-mono">
            INVESTIFY
          </span>
        </div>
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(link => (
            <Link
              key={link.name}
              to={link.to}
              className="text-lg font-medium text-gray-700 dark:text-gray-200 hover:text-blue-700 dark:hover:text-yellow-400 transition"
            >
              {link.name}
            </Link>
          ))}
          <button
            className="ml-6 p-2 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-black hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            onClick={() => setDark(d => !d)}
            title="Toggle Dark Mode"
          >
            {dark ? (
              <SunIcon className="h-5 w-5 text-yellow-400" />
            ) : (
              <MoonIcon className="h-5 w-5 text-blue-600" />
            )}
          </button>
        </nav>
        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          onClick={() => setNavOpen(true)}
          aria-label="Open Menu"
        >
          <Bars3Icon className="h-8 w-8 text-gray-700 dark:text-gray-200" />
        </button>
      </header>

      {/* Mobile Nav Drawer */}
      <AnimatePresence>
        {navOpen && (
          <motion.nav
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.35 }}
            className="fixed top-0 right-0 w-72 h-full z-50 bg-white dark:bg-gray-900 shadow-lg flex flex-col p-7"
          >
            <button
              className="self-end mb-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800"
              onClick={() => setNavOpen(false)}
              aria-label="Close Menu"
            >
              <XMarkIcon className="h-7 w-7 text-gray-800 dark:text-gray-200" />
            </button>
            <div className="flex flex-col gap-6">
              {NAV_LINKS.map(link => (
                <Link
                  key={link.name}
                  to={link.to}
                  className="text-xl font-medium text-gray-800 dark:text-gray-200 hover:text-blue-700 dark:hover:text-yellow-400 transition"
                  onClick={() => setNavOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <button
                className="mt-4 p-2 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-black hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                onClick={() => setDark(d => !d)}
                title="Toggle Dark Mode"
              >
                {dark ? (
                  <SunIcon className="h-5 w-5 text-yellow-400" />
                ) : (
                  <MoonIcon className="h-5 w-5 text-blue-600" />
                )}
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* HERO */}
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, type: "spring", bounce: 0.2 }}
          className="relative w-full max-w-2xl mx-auto bg-white/40 dark:bg-gray-900/70 backdrop-blur-2xl rounded-3xl shadow-2xl p-10 pt-16 mt-12 mb-8 flex flex-col items-center border border-white/20"
          style={{ boxShadow: "0 8px 60px 0 rgba(44, 62, 80, .25)" }}
        >
          {/* Animated Welcome Text */}
          <h1 className="text-3xl sm:text-5xl font-black mb-4">
            <span className="bg-gradient-to-r from-gray-800 via-gray-900 to-black bg-clip-text text-transparent dark:from-white dark:to-blue-400">
              Welcome to{" "}
            </span>
            <motion.span
              initial={{ scale: 0.96 }}
              animate={{ scale: [1.03, 1.11, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, repeatType: "reverse" }}
              className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent drop-shadow-lg"
              style={{ WebkitTextStroke: "0.5px #333", filter: "brightness(1.2)" }}
            >
              Investify
            </motion.span>
          </h1>
          <p className="mb-8 text-lg sm:text-xl text-gray-900 dark:text-gray-200 font-medium tracking-wide">
            Your <span className="font-semibold text-blue-600 dark:text-blue-300">AI-powered</span> investment assistant
          </p>
          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-6 mt-2">
            <Link
              to="/chatbot"
              className="bg-blue-600 text-white px-8 py-3 rounded-xl shadow-lg hover:bg-blue-700 active:scale-95 transition text-lg font-semibold"
            >
              Chatbot
            </Link>
            <Link
              to="/portfolio"
              className="bg-white border border-blue-600 text-blue-600 px-8 py-3 rounded-xl shadow-lg hover:bg-blue-100 dark:bg-gray-800 dark:border-blue-300 dark:text-blue-300 dark:hover:bg-gray-900 active:scale-95 transition text-lg font-semibold"
            >
              View Portfolio
            </Link>
          </div>
        </motion.div>
        {/* Features */}
        <section className="w-full max-w-2xl text-center mt-2">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-lg text-white dark:text-blue-200 mb-2"
          >
            Track your investments in real time
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-lg text-white dark:text-blue-200 mb-2"
          >
            AI-driven stock analysis
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="text-lg text-white dark:text-blue-200"
          >
            Personalized insights for smarter decisions
          </motion.p>
        </section>
      </main>
    </div>
  );
}
