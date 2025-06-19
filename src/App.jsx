import React, { useState } from "react";
import axios from "axios";
import "./App.css"

function App() {
  const [prompt, setPrompt] = useState("");
  const [chat, setChat] = useState([]); 
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!prompt.trim()) return;

    setChat([...chat, { sender: "You", text: prompt }]);
    setLoading(true);
    setPrompt("");

    try {
     
      const backendUrl = 
        "https://ai-chat-server-wcr4.onrender.com/api/ai";

      const res = await axios.post(backendUrl, { prompt });
      setChat((prev) => [...prev, { sender: "AI", text: res.data.result }]);
    } catch (err) {
      console.error(err);
      setChat((prev) => [
        ...prev,
        { sender: "AI", text: "❌ Error retrieving from API." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h1>Claude Chat App</h1>
      <p>Ask anything to beta AI Assistant </p>

      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          minHeight: "300px",
          minWidth: "",
          marginBottom: "10px",
        }}
      >
        {chat.map((msg, idx) => (
          <p
            key={idx}
            style={{ textAlign: msg.sender === "You" ? "right" : "left" }}
          >
            <strong>{msg.sender}:</strong> {msg.text}
          </p>
        ))}
        {loading && (
          <p>
            <em>Loading...</em>
          </p>
        )}
      </div>

      <input
        type="text"
        placeholder="Ask here"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{ width: "80%", padding: "8px" }}
      />
      <button
        onClick={handleSubmit}
        style={{ padding: "8px 16px", marginLeft: "10px" }}
      >
        Send
      </button>
    </div>
  );
}

export default App;
