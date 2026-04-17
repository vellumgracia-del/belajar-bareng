"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { addDoc, collection } from "firebase/firestore";
import { db, CUSTOM_APP_ID } from "@/lib/firebase";
import Notification from "@/components/Notification";
import { motion, AnimatePresence } from "framer-motion";

export default function FeedbackPage() {
  const { user, userName } = useAuth();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [notif, setNotif] = useState("");
  const [thanks, setThanks] = useState(false);

  const handleSubmit = async () => {
    if (!user || userName === "Pemain Anonim") {
      setNotif("Login terlebih dahulu.");
      return;
    }
    if (rating === 0) {
      setNotif("Beri minimal 1 bintang.");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "artifacts", CUSTOM_APP_ID, "public", "data", "feedback"), {
        user: userName,
        rating: rating,
        message: text.trim(),
        timestamp: new Date().toISOString(),
      });
      setNotif("Feedback terkirim ke server!");
      setThanks(true);
      setRating(0);
      setText("");
      setTimeout(() => setThanks(false), 2000);
    } catch (e) {
      console.error(e);
      setNotif("Gagal kirim.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page active">
      <Notification message={notif} show={!!notif} onClose={() => setNotif("")} />
      <div className="feedback-container">
        <div className="card feedback-wrapper">
          <h3>Beri Penilaian Anda</h3>
          <div className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${star <= (hoverRating || rating) ? "selected" : ""}`}
                style={{ color: star <= (hoverRating || rating) ? "var(--yellow)" : "var(--text-secondary)" }}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
              >
                {star <= (hoverRating || rating) ? "★" : "☆"}
              </span>
            ))}
          </div>
          <textarea
            placeholder="Saran Anda..."
            style={{ minHeight: "100px", resize: "vertical", marginTop: "10px" }}
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <button
            className="btn accent-btn animated-btn"
            style={{ background: "var(--accent)", color: "white", borderColor: "var(--accent)" }}
            onClick={handleSubmit}
            disabled={loading}
          >
            <span>{loading ? "Mengirim..." : "Kirim Feedback"}</span>
          </button>
          
          <AnimatePresence>
            {thanks && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="small"
                style={{ color: "var(--green)", fontWeight: 600, marginTop: "16px" }}
              >
                Terima kasih!
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
