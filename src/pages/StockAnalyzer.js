import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

// Stock icon as before
const StockIcon = () => (
  <svg width="36" height="36" fill="none" viewBox="0 0 24 24">
    <rect width="24" height="24" rx="6" fill="url(#StockAnalyzerGrad)" />
    <path d="M6 16L10.5 10L13.5 14L18 8" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    <defs>
      <linearGradient id="StockAnalyzerGrad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
        <stop stopColor="#6366f1"/>
        <stop offset="1" stopColor="#3b82f6"/>
      </linearGradient>
    </defs>
  </svg>
);

export default function StockAnalyzer() {
  const [symbol, setSymbol] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bulkResults, setBulkResults] = useState([]);
  const [bulkLoading, setBulkLoading] = useState(false);
  const [error, setError] = useState("");
  const [listening, setListening] = useState(false);

  const recognitionRef = useRef(null);

  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = "en-US";
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.onresult = (event) => {
        const text = event.results[0][0].transcript.replace(/\s/g, '').toUpperCase();
        setSymbol(text);
        setListening(false);
      };
      recognitionRef.current.onerror = () => {
        setError("Speech recognition error.");
        setListening(false);
      };
      recognitionRef.current.onend = () => setListening(false);
    }
  }, []);

  // Single analyze
  const handleAnalyze = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);
    if (!symbol.trim()) {
      setError("Please enter a stock symbol.");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/api/stock-analyze", { symbol: symbol.trim().toUpperCase() });
      setResult(res.data);
    } catch (err) {
      setError("Failed to fetch stock analysis.");
    }
    setLoading(false);
  };

  // Bulk analyze from CSV
  const handleCSVUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setBulkLoading(true);
    setBulkResults([]);
    setError("");

    const reader = new FileReader();
    reader.onload = async (evt) => {
      const content = evt.target.result;
      const lines = content.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
      // First row could be header (e.g., "Symbol")
      const symbols = lines
        .filter(l => /^[A-Za-z0-9]/.test(l))
        .map(l => l.split(",")[0].replace(/[^A-Za-z0-9]/g, "").toUpperCase())
        .filter((v, i, arr) => !!v && arr.indexOf(v) === i);

      const resArr = [];
      for (let sym of symbols) {
        try {
          const res = await axios.post("http://localhost:8000/api/stock-analyze", { symbol: sym });
          resArr.push({ ...res.data, symbol: sym });
        } catch (err) {
          resArr.push({ symbol: sym, error: "Failed" });
        }
      }
      setBulkResults(resArr);
      setBulkLoading(false);
    };
    reader.readAsText(file);
  };

  const handleVoiceInput = () => {
    if (!recognitionRef.current) {
      setError("Speech recognition not supported on your browser.");
      return;
    }
    setListening(true);
    setError("");
    recognitionRef.current.start();
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #eef1f5 0%, #e6e9f0 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      <div style={{
        width: "100%",
        maxWidth: 540,
        margin: "2.5rem auto 1rem auto",
        background: "#fff",
        borderRadius: 22,
        boxShadow: "0 8px 32px rgba(60,72,114,0.12), 0 2px 8px rgba(60,72,114,0.06)",
        padding: "2.5rem 1.5rem 2rem 1.5rem",
        display: "flex",
        flexDirection: "column"
      }}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: "1.7rem" }}>
          <span style={{ marginRight: "0.8rem" }}><StockIcon /></span>
          <span style={{
            fontSize: "2.2rem",
            fontWeight: 700,
            background: "linear-gradient(45deg, #3b82f6 0%, #6366f1 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            Stock Analyzer
          </span>
        </div>

        <form onSubmit={handleAnalyze} style={{ display: "flex", gap: 10, marginBottom: 24 }}>
          <input
            type="text"
            value={symbol}
            disabled={loading}
            onChange={e => setSymbol(e.target.value)}
            placeholder="Enter stock symbol (e.g., AAPL)"
            style={{
              flex: 1,
              padding: "0.9rem 1rem",
              border: "2px solid #e2e8f0",
              borderRadius: 10,
              fontSize: 17,
              background: "#f8fafc"
            }}
          />
          <button
            type="button"
            onClick={handleVoiceInput}
            disabled={loading || listening}
            style={{
              background: "#f1f5f9",
              border: "none",
              borderRadius: 10,
              padding: "0.9rem 1.2rem",
              fontWeight: 600,
              color: listening ? "#2563eb" : "#64748b",
              cursor: loading || listening ? "not-allowed" : "pointer",
              boxShadow: listening
                ? "0 0 10px #60a5fa,0 0 1px #3b82f6"
                : undefined,
              transition: "all 0.17s"
            }}
            title="Speak the symbol"
          >
            🎤
          </button>
          <button
            type="submit"
            disabled={loading}
            style={{
              background: "linear-gradient(90deg, #3b82f6, #6366f1)",
              color: "#fff",
              fontWeight: 600,
              border: "none",
              borderRadius: 10,
              padding: "0.9rem 1.8rem",
              fontSize: 17,
              boxShadow: "0 2px 6px rgba(60,72,114,0.09)",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.6 : 1,
              transition: "all 0.16s"
            }}
          >
            {loading ? "Analyzing..." : "Analyze"}
          </button>
        </form>

        <label style={{ display: "block", marginBottom: 20, marginTop: -5, color: "#6366f1", fontWeight: 500 }}>
          Bulk analyze:
          <input
            type="file"
            accept=".csv"
            disabled={bulkLoading}
            onChange={handleCSVUpload}
            style={{ marginLeft: 12, fontSize: 15 }}
          />
        </label>

        {listening && (
          <div style={{
            color: "#2563eb",
            textAlign: "center",
            marginBottom: 8,
            fontSize: 15,
            fontWeight: 500
          }}>Listening... Speak a stock symbol!</div>
        )}

        {error && (
          <div style={{
            color: "#b91c1c",
            background: "#fee2e2",
            padding: "0.8rem 1rem",
            borderRadius: 8,
            fontWeight: 500,
            marginBottom: 14,
            textAlign: "center"
          }}>
            {error}
          </div>
        )}

        {/* Single Stock Result */}
        {result && (
          <div style={{
            marginTop: 14,
            background: "#f1f5f9",
            borderRadius: 12,
            padding: "1.1rem 1.1rem",
            boxShadow: "0 2px 8px rgba(60,72,114,0.07)",
            fontSize: 17,
            color: "#1e293b"
          }}>
            <div><b>Symbol:</b> {result.symbol || symbol.trim().toUpperCase()}</div>
            {result.company && <div><b>Company:</b> {result.company}</div>}
            {result.price && <div><b>Price:</b> ${result.price}</div>}
            {result.summary && <div style={{ marginTop: "0.8rem" }}>{result.summary}</div>}

            {/* Chart rendering if history data exists */}
            {Array.isArray(result.history) && result.history.length > 0 && (
              <div style={{ marginTop: 18, marginBottom: -10 }}>
                <div style={{ fontWeight: 600, color: "#6366f1", marginBottom: 5 }}>Recent Price Trend</div>
                <ResponsiveContainer width="100%" height={210}>
                  <LineChart data={result.history}>
                    <CartesianGrid stroke="#e5e7eb" strokeDasharray="4" />
                    <XAxis dataKey="date" fontSize={13} tick={{ fill: "#64748b" }} />
                    <YAxis fontSize={13} tick={{ fill: "#64748b" }} width={55}/>
                    <Tooltip />
                    <Line type="monotone" dataKey="close" stroke="#6366f1" strokeWidth={2.5} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        )}

        {/* Bulk results table */}
        {bulkLoading && <div style={{ color: "#6366f1", fontWeight: 500, margin: "18px 0" }}>Analyzing CSV symbols, please wait...</div>}
        {bulkResults.length > 0 && (
          <div style={{ marginTop: 18 }}>
            <div style={{ fontWeight: 600, color: "#6366f1", marginBottom: 8 }}>Bulk Results</div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 16 }}>
                <thead>
                  <tr style={{ background: "#f1f5f9", color: "#6366f1" }}>
                    <th style={{ padding: "8px", borderRadius: "10px 0 0 10px" }}>Symbol</th>
                    <th style={{ padding: "8px" }}>Price</th>
                    <th style={{ padding: "8px" }}>Summary</th>
                    <th style={{ padding: "8px", borderRadius: "0 10px 10px 0" }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bulkResults.map((r, i) => (
                    <tr key={i} style={{ background: i % 2 ? "#f8fafc" : "#fff" }}>
                      <td style={{ padding: "8px", fontWeight: 600 }}>{r.symbol}</td>
                      <td style={{ padding: "8px" }}>{r.price ? `$${r.price}` : "-"}</td>
                      <td style={{ padding: "8px", maxWidth: 180, whiteSpace: "pre-wrap" }}>{r.summary || "-"}</td>
                      <td style={{ padding: "8px" }}>
                        {r.error ? <span style={{ color: "#b91c1c" }}>{r.error}</span> : "OK"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* Footer */}
      <footer style={{
        textAlign: "center",
        marginTop: 28,
        fontSize: "1rem",
        color: "#94a3b8"
      }}>
        <div style={{ marginBottom: 6 }}>
          <a href="/terms" style={{ color: "#2563eb", margin: "0 10px", textDecoration: "underline" }}>Terms</a>
          <span>|</span>
          <a href="/privacy" style={{ color: "#2563eb", margin: "0 10px", textDecoration: "underline" }}>Privacy</a>
          <span>|</span>
          <a href="/eula" style={{ color: "#2563eb", margin: "0 10px", textDecoration: "underline" }}>EULA</a>
          <span>|</span>
          <a href="/disclaimer" style={{ color: "#2563eb", margin: "0 10px", textDecoration: "underline" }}>Disclaimer</a>
          <span>|</span>
          <a href="/cookies" style={{ color: "#2563eb", margin: "0 10px", textDecoration: "underline" }}>Cookies</a>
        </div>
        <div>© 2025 Investify. All rights reserved.</div>
      </footer>
    </div>
  );
}
