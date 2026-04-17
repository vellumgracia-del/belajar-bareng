"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

export default function HomePage() {
  const { user, userName, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || !userName || userName === "Pemain Anonim")) {
      router.push("/");
    }
  }, [user, userName, loading, router]);

  if (loading || !user) return null;

  return (
    <div className="page active">
      <div className="home-hero">
        <h3>Selamat Datang di Dashboard</h3>
        <p>Lanjutkan progres belajarmu hari ini. Mau mulai belajar materi baru atau sapa teman di forum?</p>
      </div>

      <div className="selection-grid">
        <Link href="/belajar" className="selection-card">
          <h4 style={{ fontSize: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
            <svg className="nav-icon" style={{ color: "var(--accent)" }} viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
            </svg>
            Mulai Belajar
          </h4>
          <p>Akses semua video materi dan selesaikan kuis interaktifnya.</p>
        </Link>
        <Link href="/forum" className="selection-card">
          <h4 style={{ fontSize: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
            <svg className="nav-icon" style={{ color: "var(--accent)" }} viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            Forum Diskusi
          </h4>
          <p>Tempat ngobrol bebas, cari solusi bareng, dan berbagi ilmu.</p>
        </Link>
      </div>

      <div className="founder-section">
        <h3 style={{ fontSize: "24px", marginBottom: "24px" }}>Tim Pengembang</h3>
        <div className="founder-grid">
          <div className="founder-card">
            <div className="founder-photo">
              <Image src="https://res.cloudinary.com/dgzufaone/image/upload/v1761118376/Gemini_Generated_Image_jxmjhwjxmjhwjxmj_ixh88x.jpg" alt="Zulfa" fill style={{ objectFit: "cover" }} />
            </div>
            <div className="founder-shape"></div>
            <h4>Zulfa Fahmiy</h4>
            <p>CEO</p>
          </div>
          <div className="founder-card">
            <div className="founder-photo">
              <Image src="https://res.cloudinary.com/dgzufaone/image/upload/v1761119341/1000087641_pra_re9gau.png" alt="Prabu" fill style={{ objectFit: "cover" }} />
            </div>
            <div className="founder-shape"></div>
            <h4>Prabu Revolusi</h4>
            <p>CTO</p>
          </div>
        </div>
      </div>
    </div>
  );
}
