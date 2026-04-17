"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { SUBJECTS_DATA } from "@/lib/subjects-data";
import { useAuth } from "@/context/AuthContext";
import QuizArea from "@/components/QuizArea";

export default function TopicVideoPage() {
  const { subject, topicId } = useParams();
  const router = useRouter();
  const { points, completed } = useAuth();
  
  const subName = decodeURIComponent(subject as string);
  const topic = SUBJECTS_DATA[subName]?.find((t) => t.id === topicId);
  
  const [sessionStarted, setSessionStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let t: NodeJS.Timeout;
    if (sessionStarted && timeLeft > 0) {
      t = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    }
    return () => clearInterval(t);
  }, [sessionStarted, timeLeft]);

  if (!topic) {
    return (
      <div className="page active">
        <h2>Topik Tidak Ditemukan</h2>
        <button className="btn" onClick={() => router.push("/belajar")}>Kembali</button>
      </div>
    );
  }

  const startSession = () => {
    setSessionStarted(true);
    videoRef.current?.play().catch(() => {});
  };

  const endSession = () => {
    setSessionStarted(false);
    setTimeLeft(300);
  };

  const mins = Math.floor(timeLeft / 60).toString().padStart(2, "0");
  const secs = (timeLeft % 60).toString().padStart(2, "0");

  return (
    <div className="page active">
      <button className="btn back-btn" onClick={() => router.push(`/belajar/${subName}`)} style={{ marginBottom: "16px" }}>
        ← Kembali ke Topik
      </button>

      <div className="container-app">
        <main className="left">
          <div className="card video-card">
            <div className="video-container">
              <video ref={videoRef} controls preload="metadata">
                <source src={topic.video} type="video/mp4" />
              </video>
            </div>
            <div className="video-info-wrapper" style={{ marginTop: "16px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div className="topic-details">
                <h3>{topic.title}</h3>
                <p className="small">Timer: <span style={{ fontFamily: "monospace", fontWeight: "bold" }}>{mins}:{secs}</span></p>
              </div>
              <div className="topic-controls" style={{ flexGrow: 1, marginLeft: "20px" }}>
                <div className="progress-line" style={{ height: "6px", background: "#333", borderRadius: "3px", overflow: "hidden", marginBottom: "8px" }}>
                  <div style={{ height: "100%", width: `${((300 - timeLeft) / 300) * 100}%`, background: "var(--accent)", transition: "width 0.3s" }}></div>
                </div>
                <div className="controls" style={{ textAlign: "right" }}>
                  <button
                    className="btn accent-btn"
                    style={{ background: "var(--accent)", color: "white", borderColor: "var(--accent)" }}
                    onClick={startSession}
                    disabled={sessionStarted}
                  >
                    {sessionStarted ? "Sesi Berjalan" : "Mulai Sesi"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <QuizArea topic={topic} sessionStarted={sessionStarted} onEndSession={endSession} />
        </main>

        <aside className="sidebar">
          <div className="card">
            <div className="card-header">Statistik Saya</div>
            <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
              <div>
                <p className="small">Selesai</p>
                <strong style={{ fontSize: "20px", color: "var(--green)" }}>{Object.keys(completed).length}</strong>
              </div>
              <div>
                <p className="small">Poin</p>
                <strong style={{ fontSize: "20px", color: "var(--yellow)" }}>{points}</strong>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
