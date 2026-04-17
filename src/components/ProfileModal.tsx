"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import Notification from "./Notification";
import { AnimatePresence, motion } from "framer-motion";

export default function ProfileModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { userName, userPhoto, saveUserProfile } = useAuth();
  const [nameInput, setNameInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [notif, setNotif] = useState("");

  useEffect(() => {
    if (isOpen) {
      setNameInput(userName);
    }
  }, [isOpen, userName]);

  const handleSave = async () => {
    const newName = nameInput.trim();
    if (newName.length < 3) {
      setNotif("Nama minimal 3 karakter");
      return;
    }
    setLoading(true);
    await saveUserProfile(newName);
    setLoading(false);
    onClose();
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
              <h3>Pengaturan Profil</h3>
              <p className="small" style={{ color: "var(--text-secondary)", marginBottom: "20px" }}>
                Ubah nama tampilan Anda.
              </p>
              <img
                src={userPhoto}
                alt="Foto Profil"
                style={{ width: "80px", height: "80px", borderRadius: "50%", border: "2px solid var(--accent)", marginBottom: "16px" }}
              />
              <input
                type="text"
                placeholder="Masukkan nama panggilan baru..."
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
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
                  {loading ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
