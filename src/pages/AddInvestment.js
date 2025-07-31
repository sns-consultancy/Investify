import React from "react";

export default function AddInvestment() {
  return (
    <div className="pageWrapper">
      <div className="card">
        <h2>➕ Add Investment</h2>
        <p>Record a new stock, ETF, crypto, or other investment here.</p>
        {/* Example Form UI */}
        <form style={{ marginTop: 18 }}>
          <input className="input" placeholder="Symbol (e.g. AAPL)" />
          <input className="input" type="number" placeholder="Shares / Amount" />
          <button className="btn" type="submit">Add</button>
        </form>
      </div>
    </div>
  );
}
