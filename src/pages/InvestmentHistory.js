import React from "react";
// import './InvestmentHistory.module.css'; // If you want custom CSS

export default function InvestmentHistory() {
  // Example dummy data
  const history = [
    { symbol: "AAPL", date: "2024-07-01", amount: 10 },
    { symbol: "TSLA", date: "2024-06-23", amount: 5 }
  ];

  return (
    <div className="pageWrapper">
      <div className="card">
        <h2>📜 Investment History</h2>
        <table style={{ width: "100%", marginTop: 20 }}>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Date</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item, i) => (
              <tr key={i}>
                <td>{item.symbol}</td>
                <td>{item.date}</td>
                <td>{item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ color: "#888", marginTop: "1rem" }}>
          This page will display a log of all your previous investments.
        </p>
      </div>
    </div>
  );
}
