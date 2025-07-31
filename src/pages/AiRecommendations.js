import React from "react";

export default function AiRecommendations() {
  return (
    <div className="pageWrapper">
      <div className="card">
        <h2>🤖 AI Investment Recommendations</h2>
        <ul style={{ textAlign: "left", marginTop: "1rem" }}>
          <li>• Personalized stock picks</li>
          <li>• Portfolio rebalancing suggestions</li>
          <li>• Risk alerts & market trends</li>
        </ul>
        <p style={{ color: "#888", marginTop: "1.5rem" }}>
          Smart insights based on your portfolio will appear here.
        </p>
      </div>
    </div>
  );
}
