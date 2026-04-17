"use client";

import Link from "next/link";
import { SUBJECTS_DATA } from "@/lib/subjects-data";

export default function BelajarPage() {
  const subjects = Object.keys(SUBJECTS_DATA);

  return (
    <div className="page active">
      <h2>Pilih Mata Pelajaran</h2>
      <p className="page-subtitle">Pilih salah satu mata pelajaran untuk melihat topik yang tersedia.</p>
      
      <div className="selection-grid">
        {subjects.map((sub) => (
          <Link href={`/belajar/${sub}`} key={sub} className="selection-card">
            <h4>{sub}</h4>
            <p>{SUBJECTS_DATA[sub].length} Topik</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
