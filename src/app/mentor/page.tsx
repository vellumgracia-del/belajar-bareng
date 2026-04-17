"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function MentorPage() {
  const [messages, setMessages] = useState<{ sender: "ai" | "user"; text: string }[]>([
    { sender: "ai", text: "Halo! Saya adalah mentor AI Anda." }
  ]);
  const [input, setInput] = useState("");
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    const txt = input.trim();
    if (!txt) return;

    setMessages((prev) => [...prev, { sender: "user", text: txt }]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "ai", text: "Sistem AI sedang dalam pemeliharaan." }]);
    }, 800);
  };

  return (
    <div className="page active">
      <h2>AI Mentor</h2>
      <p className="page-subtitle">Tanyakan pada mentor AI kami.</p>
      
      <div className="mentor-page-container card">
        <div className="mentor-log-full" ref={logRef}>
          {messages.map((m, i) => (
            <motion.div
              key={i}
              className={`msg ${m.sender}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {m.text}
            </motion.div>
          ))}
        </div>
        <div className="mentor-input-full">
          <input
            type="text"
            placeholder="Tanya Mentor..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            className="btn accent-btn"
            style={{ background: "var(--accent)", color: "white", borderColor: "var(--accent)" }}
            onClick={handleSend}
          >
            Kirim
          </button>
        </div>
      </div>
    </div>
  );
}
