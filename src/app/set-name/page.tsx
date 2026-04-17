"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Notification from "@/components/Notification";

export default function SetNamePage() {
  const { user, userName, saveUserProfile, loading } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [notif, setNotif] = useState("");

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
    if (user && user.displayName) {
      setName(user.displayName);
    }
  }, [user, loading, router]);

  const handleSave = async () => {
    if (name.trim().length < 3) {
      setNotif("Nama minimal 3 karakter");
      return;
    }
    await saveUserProfile(name.trim());
    router.push("/home");
  };

  if (loading || !user) return null;

  return (
    <div className="page active">
      <Notification message={notif} show={!!notif} onClose={() => setNotif("")} />
      <div className="landing-content">
        <div className="landing-text">
          <h2>Satu Langkah Lagi!</h2>
          <p>Masukkan nama panggilan yang ingin Anda gunakan di Papan Peringkat BARBAR.</p>
          <div className="landing-input-group">
            <input
              type="text"
              placeholder="Ketik nama panggilan Anda..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button
              className="btn accent-btn animated-btn"
              style={{ background: "var(--accent)", color: "white", borderColor: "var(--accent)" }}
              onClick={handleSave}
            >
              <span>Mulai Belajar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
