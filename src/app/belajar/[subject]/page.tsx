"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { SUBJECTS_DATA } from "@/lib/subjects-data";
import { useAuth } from "@/context/AuthContext";

export default function SubjectTopicPage() {
  const { subject } = useParams();
  const router = useRouter();
  const { completed } = useAuth();

  const subName = decodeURIComponent(subject as string);
  const topics = SUBJECTS_DATA[subName];

  if (!topics) {
    return (
      <div className="page active">
        <h2>Mata Pelajaran Tidak Ditemukan</h2>
        <button className="btn back-btn" onClick={() => router.push("/belajar")}>
          ← Kembali
        </button>
      </div>
    );
  }

  return (
    <div className="page active">
      <button className="btn back-btn" onClick={() => router.push("/belajar")}>
        ← Kembali ke Mata Pelajaran
      </button>
      <h2 style={{ marginTop: "16px" }}>Topik: {subName}</h2>
      <p className="page-subtitle">Topik dirancang untuk dipelajari dalam 5 menit.</p>

      <div className="selection-grid">
        {topics.map((t) => (
          <Link href={`/belajar/${subName}/${t.id}`} key={t.id} className="selection-card">
            <h4>
              {t.title} {completed[t.id] ? "✅" : ""}
            </h4>
            <p>{t.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
