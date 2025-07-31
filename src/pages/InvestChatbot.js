import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const OCR_API_KEY = "helloworld"; // Replace with your ocr.space API key if you have one.

export default function InvestChatbot() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! Ask me anything about your investments." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [listening, setListening] = useState(false);
  const chatEndRef = useRef(null);

  // --- Voice-to-text (Web Speech API) ---
  const recognitionRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = "en-US";
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event) => {
        const text = event.results[0][0].transcript;
        setInput(text);
        setListening(false);
      };
      recognitionRef.current.onerror = () => {
        setError("Speech recognition error.");
        setListening(false);
      };
      recognitionRef.current.onend = () => setListening(false);
    }
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages(msgs => [...msgs, { sender: "user", text: input.trim() }]);
    setInput("");
    setLoading(true);
    setError("");
    try {
      // UPDATE: use your backend chatbot API here
      const res = await axios.post("http://localhost:8000/api/investbot", { message: input.trim() });
      setMessages(msgs =>
        [...msgs, { sender: "bot", text: res.data.reply || "Sorry, I have no answer." }]
      );
    } catch (err) {
      setMessages(msgs =>
        [...msgs, { sender: "bot", text: "Something went wrong. Please try again." }]
      );
      setError("Backend error");
    }
    setLoading(false);
  };

  // --- Voice-to-text start/stop handler ---
  const handleVoiceInput = () => {
    if (!recognitionRef.current) {
      setError("Speech recognition not supported on your browser.");
      return;
    }
    setListening(true);
    setError("");
    recognitionRef.current.start();
  };

  // --- OCR (Image to text) handler ---
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setError("");
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("language", "eng");
    formData.append("apikey", OCR_API_KEY);
    formData.append("isOverlayRequired", "false");

    try {
      const res = await axios.post(
        "https://api.ocr.space/parse/image",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      const text = res.data?.ParsedResults?.[0]?.ParsedText?.trim();
      if (text) {
        setInput(text);
      } else {
        setError("No readable text found in image.");
      }
    } catch (err) {
      setError("OCR failed. Try another image.");
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #eef1f5 0%, #e6e9f0 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div style={{
        width: "100%",
        maxWidth: 480,
        margin: "2rem auto 1rem auto",
        background: "#fff",
        borderRadius: 24,
        boxShadow: "0 8px 32px rgba(60,72,114,0.08), 0 2px 8px rgba(60,72,114,0.08)",
        padding: "2rem 1.5rem 1.5rem 1.5rem",
        display: "flex",
        flexDirection: "column"
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "1.25rem"
        }}>
          <span style={{
            fontSize: "2rem",
            fontWeight: 700,
            background: "linear-gradient(45deg, #3b82f6 0%, #2563eb 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginRight: "0.5rem"
          }}>Investment Chatbot</span>
        </div>
        <div style={{
          color: "#64748b",
          marginBottom: "1.5rem",
          textAlign: "center",
          fontSize: "1.09rem"
        }}>
          Ask me anything about your investments.
        </div>

        <div style={{
          flex: 1,
          minHeight: 280,
          maxHeight: 320,
          overflowY: "auto",
          marginBottom: 16,
          background: "#f8fafc",
          borderRadius: 12,
          padding: "1rem"
        }}>
          {messages.map((msg, idx) => (
            <div
              key={idx}
              style={{
                marginBottom: "0.85rem",
                display: "flex",
                justifyContent: msg.sender === "user" ? "flex-end" : "flex-start"
              }}
            >
              <div style={{
                maxWidth: "75%",
                padding: "0.9rem 1.25rem",
                borderRadius: 16,
                background: msg.sender === "user"
                  ? "linear-gradient(90deg, #6366f1 0%, #3b82f6 100%)"
                  : "#f1f5f9",
                color: msg.sender === "user" ? "#fff" : "#1e293b",
                fontWeight: msg.sender === "user" ? 500 : 400,
                boxShadow: msg.sender === "user"
                  ? "0 3px 12px rgba(99,102,241,0.11)"
                  : "none",
                wordBreak: "break-word",
                fontSize: "1.08rem",
                borderTopRightRadius: msg.sender === "user" ? 6 : 16,
                borderTopLeftRadius: msg.sender === "user" ? 16 : 6,
                textAlign: msg.sender === "user" ? "right" : "left",
                transition: "all 0.2s"
              }}>
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        <form
          onSubmit={handleSend}
          style={{
            display: "flex",
            gap: 8,
            alignItems: "center",
            marginTop: 8,
            flexWrap: "wrap"
          }}>
          <input
            style={{
              flex: 1,
              padding: "0.8rem 1rem",
              border: "2px solid #e2e8f0",
              borderRadius: 12,
              fontSize: 16,
              background: "#f8fafc",
              transition: "all 0.2s"
            }}
            value={input}
            disabled={loading}
            onChange={e => setInput(e.target.value)}
            placeholder="Type your message..."
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            style={{
              background: "linear-gradient(90deg,#3b82f6,#6366f1)",
              color: "#fff",
              fontWeight: 600,
              border: "none",
              borderRadius: 12,
              padding: "0.8rem 1.5rem",
              fontSize: 16,
              boxShadow: "0 2px 6px rgba(60,72,114,0.09)",
              cursor: loading || !input.trim() ? "not-allowed" : "pointer",
              opacity: loading || !input.trim() ? 0.55 : 1,
              transition: "all 0.18s"
            }}
          >
            {loading ? "Sending..." : "Send"}
          </button>
          <button
            type="button"
            disabled={listening || loading}
            onClick={handleVoiceInput}
            style={{
              marginLeft: 2,
              background: "#f1f5f9",
              border: "none",
              borderRadius: 10,
              padding: "0.8rem 1.1rem",
              fontWeight: 600,
              color: listening ? "#2563eb" : "#64748b",
              cursor: listening || loading ? "not-allowed" : "pointer",
              borderColor: listening ? "#2563eb" : "#e2e8f0",
              boxShadow: listening
                ? "0 0 10px #60a5fa,0 0 1px #3b82f6"
                : undefined,
              transition: "all 0.17s"
            }}
            title="Speak your question"
          >
            🎤
          </button>
          <label
            style={{
              background: "#f1f5f9",
              borderRadius: 10,
              padding: "0.7rem 1.1rem",
              marginLeft: 2,
              fontWeight: 600,
              color: "#64748b",
              cursor: loading ? "not-allowed" : "pointer",
              border: "none",
              boxShadow: undefined,
              transition: "all 0.17s"
            }}
            title="Upload image for OCR"
          >
            📷
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              disabled={loading}
              onChange={handleImageUpload}
            />
          </label>
        </form>
        {listening && (
          <div style={{
            color: "#2563eb",
            textAlign: "center",
            marginTop: 8,
            fontSize: 15,
            fontWeight: 500
          }}>Listening... Speak now!</div>
        )}
        {error && (
          <div style={{
            marginTop: 10,
            color: "#dc2626",
            background: "#fee2e2",
            padding: "0.6rem 1rem",
            borderRadius: 8,
            fontWeight: 500,
            textAlign: "center"
          }}>
            {error}
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
