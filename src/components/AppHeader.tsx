"use client";

import { useState } from "react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import ProfileModal from "./ProfileModal";

export default function AppHeader() {
  const { user, userPhoto } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);

  const toggleSidebar = () => {
    document.getElementById("sidebar")?.classList.toggle("open");
    document.getElementById("hamburgerBtn")?.classList.toggle("is-active");
  };

  return (
    <>
      <header className="app-header">
        <div className="header-left">
          <button id="hamburgerBtn" className="hamburger-btn" onClick={toggleSidebar}>
            <span></span>
            <span></span>
            <span></span>
          </button>
          <div className="header-title-group">
            <Image
              src="https://res.cloudinary.com/dgzufaone/image/upload/v1761143718/Gemini_Generated_Image_hbfzexhbfzexhbfz-modified_rcnbja.png"
              alt="Logo Kecil"
              width={32}
              height={32}
              className="header-logo"
            />
            <h1>BARBAR</h1>
          </div>
        </div>
        <div className="header-right">
          {user && (
            <img
              id="headerProfilePic"
              className="header-profile-pic"
              src={userPhoto}
              alt="Profil"
              style={{ display: "block" }}
              onClick={() => setModalOpen(true)}
            />
          )}
        </div>
      </header>

      {user && (
        <ProfileModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      )}
    </>
  );
}
