"use client";

import { useEffect, useState, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { collection, onSnapshot, addDoc } from "firebase/firestore";
import { db, CUSTOM_APP_ID } from "@/lib/firebase";
import AddTopicModal from "@/components/AddTopicModal";
import Notification from "@/components/Notification";
import { motion } from "framer-motion";

type Room = { id: string; title: string; desc: string; isDefault?: boolean; createdAt?: string };
type Message = { id: string; roomId: string; userId: string; userName: string; userPhoto: string; text: string; timestamp: string };

const DEFAULT_ROOMS: Room[] = [
  { id: "umum", title: "Ruang Umum", desc: "Tempat ngobrol bebas seputar pembelajaran.", isDefault: true },
  { id: "pemrograman", title: "Pemrograman", desc: "Diskusi seputar coding, algoritma, dan error.", isDefault: true },
  { id: "desain", title: "Desain UI/UX", desc: "Berbagi inspirasi, feedback desain, dan tips UI/UX.", isDefault: true },
];

const uniformRoomIcon = (
  <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "20px", height: "20px" }}>
    <line x1="4" y1="9" x2="20" y2="9"></line><line x1="4" y1="15" x2="20" y2="15"></line><line x1="10" y1="3" x2="8" y2="21"></line><line x1="16" y1="3" x2="14" y2="21"></line>
  </svg>
);

export default function ForumPage() {
  const { user, userName, userPhoto } = useAuth();
  const [rooms, setRooms] = useState<Room[]>(DEFAULT_ROOMS);
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeRoom, setActiveRoom] = useState("umum");
  const [input, setInput] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [notif, setNotif] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!db) return;
    
    const unsubsRooms = onSnapshot(collection(db, "artifacts", CUSTOM_APP_ID, "public", "data", "forum_rooms"), (snap) => {
      const custom: Room[] = [];
      snap.forEach((doc) => custom.push({ id: doc.id, ...doc.data() } as Room));
      custom.sort((a, b) => new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime());
      setRooms([...DEFAULT_ROOMS, ...custom]);
    });

    const unsubsMsgs = onSnapshot(collection(db, "artifacts", CUSTOM_APP_ID, "public", "data", "forum_messages"), (snap) => {
      const msgs: Message[] = [];
      snap.forEach((doc) => msgs.push({ id: doc.id, ...doc.data() } as Message));
      msgs.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
      setMessages(msgs);
    });

    return () => { unsubsRooms(); unsubsMsgs(); };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, activeRoom]);

  const handleSend = async () => {
    if (!user || !db) { setNotif("Gagal mengirim: Belum Login."); return; }
    const txt = input.trim();
    if (!txt) return;

    setInput("");
    try {
      await addDoc(collection(db, "artifacts", CUSTOM_APP_ID, "public", "data", "forum_messages"), {
        roomId: activeRoom,
        userId: user.uid,
        userName: userName,
        userPhoto: userPhoto,
        text: txt,
        timestamp: new Date().toISOString()
      });
    } catch (e) {
      console.error(e);
      setNotif("Gagal mengirim pesan forum.");
    }
  };

  const currentRoomData = rooms.find((r) => r.id === activeRoom) || rooms[0];
  const roomMessages = messages.filter((m) => m.roomId === activeRoom);

  return (
    <div className="page active" style={{ padding: "0 24px", paddingTop: "24px", maxWidth: "1200px" }}>
      <Notification message={notif} show={!!notif} onClose={() => setNotif("")} />
      <AddTopicModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      <div className="forum-container">
        <aside className="forum-sidebar-card">
          <div className="forum-profile">
            <img src={userPhoto} alt="Profile" />
            <div>
              <span style={{ fontSize: "10px", color: "var(--accent)", fontWeight: "bold", letterSpacing: "1px" }}>PROFIL KAMU</span>
              <strong style={{ display: "block", fontSize: "16px", marginTop: "2px" }}>{userName}</strong>
            </div>
          </div>
          
          <div className="forum-search">
            <input type="text" placeholder="🔍 Cari topik..." />
          </div>
          
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <h4 style={{ fontSize: "11px", color: "var(--text-secondary)", letterSpacing: "1px", textTransform: "uppercase" }}>Topik Pembelajaran</h4>
            <button
              style={{ background: "none", border: "none", color: "var(--accent)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
              title="Tambah Topik Baru"
              onClick={() => setModalOpen(true)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </button>
          </div>
          
          <div className="forum-rooms">
            {rooms.map((room) => (
              <button
                key={room.id}
                className={`forum-room-btn ${room.id === activeRoom ? "active" : ""}`}
                onClick={() => setActiveRoom(room.id)}
              >
                <span className="room-icon">{uniformRoomIcon}</span>
                <div className="room-info">
                  <strong>{room.title}</strong>
                  <span>{room.id.substring(0, 15)}</span>
                </div>
              </button>
            ))}
          </div>
          
          <div className="forum-footer">
            <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>BARBAR v1.0 • Exclusive</span>
          </div>
        </aside>

        <main className="forum-main">
          <header className="forum-header">
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ fontSize: "24px", display: "flex", alignItems: "center", color: "var(--accent)" }}>{uniformRoomIcon}</span>
              <div>
                <h3 style={{ fontSize: "20px" }}>{currentRoomData?.title || "Memuat..."}</h3>
                <p className="small" style={{ color: "var(--text-secondary)", marginTop: "2px" }}>{currentRoomData?.desc || "-"}</p>
              </div>
            </div>
            <div className="live-indicator">
              <span className="dot"></span> Live
            </div>
          </header>
          
          <div className="forum-messages">
            {roomMessages.length === 0 ? (
              <div className="forum-empty">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: "64px", height: "64px", opacity: 0.3 }}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                <p>Belum ada diskusi di ruangan ini.<br/>Jadilah yang pertama untuk BARBAR!</p>
              </div>
            ) : (
              roomMessages.map((msg) => {
                const isMe = msg.userId === user?.uid;
                return (
                  <motion.div key={msg.id} className={`chat-msg ${isMe ? "me" : "other"}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    {!isMe && <img src={msg.userPhoto || "https://via.placeholder.com/40"} className="chat-avatar" alt="User" />}
                    <div className="chat-bubble-container">
                      {!isMe && <div className="chat-name">{msg.userName}</div>}
                      <div className="chat-bubble">{msg.text}</div>
                    </div>
                  </motion.div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="forum-input-wrapper">
            <div className="forum-input-inner">
              <input
                type="text"
                placeholder="Tulis pesan rasionalmu di sini..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button className="forum-send-btn" onClick={handleSend}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
