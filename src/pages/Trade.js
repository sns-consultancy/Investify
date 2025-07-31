import React, { useState } from 'react';
import { buyStock, sellStock } from '../services/tradeService';

export default function Trade() {
  const [symbol, setSymbol] = useState('');
  const [quantity, setQuantity] = useState('');
  const [result, setResult] = useState('');

  const handleBuy = async () => {
    try {
      const res = await buyStock(symbol, Number(quantity));
      setResult(res.message || 'Trade executed');
    } catch (err) {
      setResult('Trade failed');
    }
  };

  const handleSell = async () => {
    try {
      const res = await sellStock(symbol, Number(quantity));
      setResult(res.message || 'Trade executed');
    } catch (err) {
      setResult('Trade failed');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto' }}>
      <h2>Trade Stocks</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <input
          placeholder="Symbol"
          value={symbol}
          onChange={e => setSymbol(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
        />
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={handleBuy}>Buy</button>
          <button onClick={handleSell}>Sell</button>
        </div>
        {result && <p>{result}</p>}
      </div>
    </div>
  );
}
