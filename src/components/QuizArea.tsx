"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Topic, Question } from "@/lib/subjects-data";
import { useAuth } from "@/context/AuthContext";
import confetti from "canvas-confetti";
import Notification from "./Notification";

type QuizAreaProps = {
  topic: Topic;
  sessionStarted: boolean;
  onEndSession: () => void;
};

export default function QuizArea({ topic, sessionStarted, onEndSession }: QuizAreaProps) {
  const { addPoints, completed } = useAuth();
  const [queue, setQueue] = useState<Question[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [finished, setFinished] = useState(false);
  const [notif, setNotif] = useState("");
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  useEffect(() => {
    if (sessionStarted) {
      setQueue([...topic.questions]);
      setCurrentQIndex(0);
      setFinished(false);
    }
  }, [sessionStarted, topic]);

  if (!sessionStarted) return null;

  const q = queue[currentQIndex];

  const handleSelect = (idx: number) => {
    if (selectedIdx !== null) return;
    setSelectedIdx(idx);

    if (idx === q.a) {
      setTimeout(() => {
        addPoints(10);
        setSelectedIdx(null);
        if (currentQIndex + 1 < queue.length) {
          setCurrentQIndex((prev) => prev + 1);
        } else {
          finishTopic();
        }
      }, 1000);
    } else {
      setNotif("Kurang tepat, coba lagi!");
      setTimeout(() => {
        setSelectedIdx(null);
        // Put the question back at the end
        setQueue((prev) => [...prev, q]);
        setCurrentQIndex((prev) => prev + 1);
      }, 1000);
    }
  };

  const finishTopic = () => {
    setFinished(true);
    if (!completed[topic.id]) {
      addPoints(50, topic.id);
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    }
  };

  return (
    <div className="card quiz" style={{ marginTop: "24px" }}>
      <Notification message={notif} show={!!notif} onClose={() => setNotif("")} />
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
        <h4>Kuis Singkat</h4>
        <p className="small">Sisa: {finished ? 0 : queue.length - currentQIndex}</p>
      </div>

      <AnimatePresence mode="wait">
        {!finished && q && (
          <motion.div
            key={currentQIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <p className="question-text">{q.q}</p>
            <div className="options" style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "16px" }}>
              {q.opts.map((opt, idx) => {
                let btnClass = "btn option";
                if (selectedIdx !== null && idx === selectedIdx) {
                  if (idx === q.a) btnClass += " correct";
                  else btnClass += " wrong";
                }

                return (
                  <button
                    key={idx}
                    className={btnClass}
                    onClick={() => handleSelect(idx)}
                    disabled={selectedIdx !== null}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {finished && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <p className="small" style={{ textAlign: "center" }}>🎉 Topik Selesai!</p>
          <div className="quiz-controls" style={{ marginTop: "16px", textAlign: "right" }}>
            <button className="btn" onClick={onEndSession}>
              Selesai Sesi
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
