"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Notification from "./Notification";
import { AnimatePresence, motion } from "framer-motion";
import { setDoc, doc } from "firebase/firestore";
import { db, CUSTOM_APP_ID } from "@/lib/firebase";

export default function AddTopicModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [notif, setNotif] = useState("");

  const handleSave = async () => {
    if (!db || !user) {
      setNotif("Belum Login ke sistem.");
      return;
    }
    
    if (title.trim().length < 3) {
      setNotif("Nama topik minimal 3 karakter.");
      return;
    }

    setLoading(true);
    let roomId = title.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    if (!roomId) roomId = "topik-" + Date.now();

    try {
      await setDoc(doc(db, "artifacts", CUSTOM_APP_ID, "public", "data", "forum_rooms", roomId), {
        title: title.trim(),
        desc: desc.trim() || "Ruang diskusi baru.",
        createdBy: user.uid,
        createdAt: new Date().toISOString(),
      });
      setNotif("Topik berhasil ditambahkan!");
      setTitle("");
      setDesc("");
      onClose();
    } catch (e) {
      console.error(e);
      setNotif("Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Notification message={notif} show={!!notif} onClose={() => setNotif("")} />
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            <motion.div
              className="modal-card"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              exit={{ y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3>Tambah Topik Diskusi</h3>
              <p className="small" style={{ color: "var(--text-secondary)", marginBottom: "20px" }}>
                Buat ruang diskusi baru untuk berbagi dengan komunitas.
              </p>
              <input
                type="text"
                placeholder="Nama topik (mis: Desain Grafis)"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                type="text"
                placeholder="Deskripsi singkat topik ini..."
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
              <div style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
                <button className="btn" style={{ flex: 1 }} onClick={onClose} disabled={loading}>
                  Batal
                </button>
                <button
                  className="btn accent-btn"
                  style={{ flex: 1, background: "var(--accent)", color: "white", borderColor: "var(--accent)" }}
                  onClick={handleSave}
                  disabled={loading}
                >
                  {loading ? "Menyimpan..." : "Buat Topik"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
