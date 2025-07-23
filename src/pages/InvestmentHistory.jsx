
import React from "react";
import './InvestmentHistory.module.css'; // fallback plain CSS if module was not found

export default function InvestmentHistory() {
  return (
    <div className="pageWrapper">
      <div className="card">
        <h2>Investment History</h2>
        <p>This page will display a log of all your previous investments.</p>
      </div>
    </div>
  );
}
