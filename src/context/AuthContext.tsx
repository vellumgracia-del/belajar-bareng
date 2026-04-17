"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db, provider, CUSTOM_APP_ID } from "@/lib/firebase";

type AuthContextType = {
  user: User | null;
  userName: string;
  userPhoto: string;
  points: number;
  completed: Record<string, boolean>;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  saveUserProfile: (name: string) => Promise<void>;
  addPoints: (amount: number, topicId?: string) => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userName, setUserName] = useState("");
  const [userPhoto, setUserPhoto] = useState("https://via.placeholder.com/40");
  const [points, setPoints] = useState(0);
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  // Load from locale storage first
  useEffect(() => {
    const saved = localStorage.getItem("barbar_v4");
    if (saved) {
      try {
        const p = JSON.parse(saved);
        setPoints(p.points || 0);
        setCompleted(p.completed || {});
      } catch (e) {
        console.error("Local storage error", e);
      }
    }
  }, []);

  // Save to locale storage when values change
  useEffect(() => {
    localStorage.setItem("barbar_v4", JSON.stringify({ points, completed, userName }));
  }, [points, completed, userName]);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubs = onAuthStateChanged(auth, async (currUser) => {
      setUser(currUser);
      if (currUser) {
        setUserPhoto(currUser.photoURL || "https://via.placeholder.com/40");
        try {
          const profileRef = doc(db, "artifacts", CUSTOM_APP_ID, "users", currUser.uid, "profile", "info");
          const docSnap = await getDoc(profileRef);
          if (docSnap.exists()) {
            setUserName(docSnap.data().name);
            syncScoreToFirebase(currUser.uid, docSnap.data().name, points);
          } else {
            setUserName(currUser.displayName || "");
          }
        } catch (e) {
          console.error("Failed to load profile", e);
          setUserName(currUser.displayName || "");
        }
      } else {
        setUserName("");
      }
      setLoading(false);
    });

    return () => unsubs();
  }, [points]);

  const syncScoreToFirebase = async (uid: string, name: string, currentPoints: number) => {
    if (!db || !uid || !name) return;
    try {
      await setDoc(doc(db, "artifacts", CUSTOM_APP_ID, "public", "data", "leaderboard", uid), {
        uid: uid,
        name: name,
        score: currentPoints,
        lastUpdated: new Date().toISOString(),
      });
    } catch (e) {
      console.error("Sync error", e);
    }
  };

  const login = async () => {
    if (!auth) throw new Error("Offline");
    await signInWithPopup(auth, provider);
  };

  const logout = async () => {
    if (auth) {
      await signOut(auth);
      setPoints(0);
      setCompleted({});
      setUserName("");
    }
  };

  const saveUserProfile = async (newName: string) => {
    setUserName(newName);
    if (!db || !user) return;
    const profileRef = doc(db, "artifacts", CUSTOM_APP_ID, "users", user.uid, "profile", "info");
    await setDoc(profileRef, { name: newName, updatedAt: new Date().toISOString() });
    syncScoreToFirebase(user.uid, newName, points);
  };

  const addPoints = (amount: number, topicId?: string) => {
    const newPoints = points + amount;
    setPoints(newPoints);
    if (topicId) {
      setCompleted((prev) => ({ ...prev, [topicId]: true }));
    }
    if (user && userName) {
      syncScoreToFirebase(user.uid, userName, newPoints);
    }
  };

  return (
    <AuthContext.Provider value={{ user, userName, userPhoto, points, completed, loading, login, logout, saveUserProfile, addPoints }}>
      {children}
    </AuthContext.Provider>
  );
}
