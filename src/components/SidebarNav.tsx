"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Notification from "./Notification";
import { useState } from "react";

export default function SidebarNav() {
  const { user, userName, userPhoto, logout } = useAuth();
  const pathname = usePathname();
  const [notif, setNotif] = useState("");

  const closeSidebar = () => {
    document.getElementById("sidebar")?.classList.remove("open");
    document.getElementById("hamburgerBtn")?.classList.remove("is-active");
  };

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    await logout();
    setNotif("Anda berhasil keluar.");
    closeSidebar();
  };

  return (
    <>
      <Notification message={notif} show={!!notif} onClose={() => setNotif("")} />
      <nav id="sidebar" className="sidebar-nav">
        {user && (
          <div className="welcome-user" style={{ display: "flex" }}>
            <img src={userPhoto} alt="User Photo" />
            <div>
              <div style={{ fontSize: "12px", color: "var(--accent)" }}>Selamat Datang,</div>
              <strong>{userName}</strong>
            </div>
          </div>
        )}

        <Link href="/home" className={`nav-link ${pathname === "/home" ? "active" : ""}`} onClick={closeSidebar}>
          <svg className="nav-icon" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          Beranda
        </Link>
        <Link href="/belajar" className={`nav-link ${pathname.startsWith("/belajar") ? "active" : ""}`} onClick={closeSidebar}>
          <svg className="nav-icon" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
          </svg>
          Mulai Belajar
        </Link>
        <Link href="/mentor" className={`nav-link ${pathname === "/mentor" ? "active" : ""}`} onClick={closeSidebar}>
          <svg className="nav-icon" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="14" x="3" y="7" rx="2" />
            <path d="M12 7V3" />
            <path d="M9 3h6" />
            <path d="M8 12h.01" />
            <path d="M16 12h.01" />
            <path d="M10 16h4" />
          </svg>
          AI Mentor
        </Link>
        <Link href="/forum" className={`nav-link ${pathname === "/forum" ? "active" : ""}`} onClick={closeSidebar}>
          <svg className="nav-icon" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          Forum Diskusi
        </Link>
        <Link href="/feedback" className={`nav-link ${pathname === "/feedback" ? "active" : ""}`} onClick={closeSidebar}>
          <svg className="nav-icon" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          Beri Penilaian
        </Link>

        {user && (
          <a href="#" className="nav-link" style={{ marginTop: "auto", color: "var(--red)" }} onClick={handleLogout}>
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: "var(--red)" }}>
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" x2="9" y1="12" y2="12" />
            </svg>
            Keluar Akun
          </a>
        )}
      </nav>
      <div id="sidebarOverlay" className="sidebar-overlay" style={{ display: "none" }} onClick={closeSidebar}></div>
    </>
  );
}
