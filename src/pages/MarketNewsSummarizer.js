import React from "react";

export default function MarketNewsSummarizer() {
  return (
    <div className="pageWrapper">
      <div className="card">
        <h2>📰 Market News Summarizer</h2>
        <ul style={{ textAlign: "left", marginTop: "1rem" }}>
          <li>• AI-powered summaries of trending financial news</li>
          <li>• See what’s moving the markets today</li>
        </ul>
        <p style={{ color: "#888", marginTop: "1.5rem" }}>
          This page will summarize trending financial news using AI.
        </p>
      </div>
    </div>
  );
}
