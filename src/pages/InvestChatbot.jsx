import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
const API = process.env.REACT_APP_API_URL;
function InvestChatbot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);
    try {
      const res = await axios.post(`${API}/chatbot`, { message: input }, {
        headers: { "Content-Type": "application/json" }
      });
      const botMsg = { sender: "bot", text: res.data.reply };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error("Chatbot error:", error);
      setMessages((prev) => [...prev, { sender: "bot", text: "Sorry, something went wrong." }]);
    } finally {
      setLoading(false);
      setInput("");
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };
  return (
    <div className="chat-container">
      <h2>Invest Chatbot</h2>
      <div className="chat-box" role="log" aria-live="polite">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.sender}`}>
            <span>{msg.text}</span>
          </div>
        ))}
        {loading && <div className="message bot"><span>Typing...</span></div>}
        <div ref={chatEndRef} />
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Ask something..."
          aria-label="Chat input"
        />
        <button onClick={handleSend} disabled={loading}>Send</button>
      </div>
    </div>
  );
}
export default InvestChatbot;