const API_URL = process.env.REACT_APP_API_URL;

async function request(path, payload) {
  const res = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error('Request failed');
  return res.json();
}

export function buyStock(symbol, quantity) {
  return request('/api/trade/buy', { symbol, quantity });
}

export function sellStock(symbol, quantity) {
  return request('/api/trade/sell', { symbol, quantity });
}
