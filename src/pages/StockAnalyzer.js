import React, { useState } from "react";

export default function StockAnalyzer() {
  const [query, setQuery] = useState("");

  const handleAnalyze = () => {
    // Placeholder for stock analysis logic
    alert(`Analyzing stock: ${query}`);
  };

  return (
    <div className="pageWrapper">
      <div className="card">
        <h2>Stock Analyzer</h2>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter stock symbol (e.g., AAPL)"
        />
        <button onClick={handleAnalyze}>Analyze</button>
      </div>
    </div>
  );
}