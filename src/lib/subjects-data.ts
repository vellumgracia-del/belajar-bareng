export type Question = {
  id: string;
  q: string;
  opts: string[];
  a: number; // Index of the correct answer
};

export type Topic = {
  id: string;
  title: string;
  video: string;
  description: string;
  questions: Question[];
};

export type SubjectsData = {
  [subject: string]: Topic[];
};

export const SUBJECTS_DATA: SubjectsData = {
  Biologi: [
    {
      id: "b1",
      title: "Sistem Pencernaan",
      video:
        "https://res.cloudinary.com/dgzufaone/video/upload/v1760703550/Belajar_IPA_Sistem_Pencernaan_Manusia_SiapNaikLevel_fnur0d.mp4",
      description: "Video: organ & proses pencernaan (≤3 menit).",
      questions: [
        {
          id: "b1q1",
          q: "Proses memecah makanan secara kimiawi pertama kali terjadi di?",
          opts: ["Lambung", "Mulut", "Usus Halus"],
          a: 1,
        },
        {
          id: "b1q2",
          q: "Organ yang menyerap sebagian besar nutrisi adalah?",
          opts: ["Usus Besar", "Usus Halus", "Lambung"],
          a: 1,
        },
        {
          id: "b1q3",
          q: "Enzim yang memulai pencernaan karbohidrat di mulut adalah?",
          opts: ["Lipase", "Pepsin", "Amilase"],
          a: 2,
        },
      ],
    },
    {
      id: "b2",
      title: "Sirkulasi Darah",
      video:
        "https://res.cloudinary.com/dgzufaone/video/upload/v1760709823/barbar/Apa_yang_terjadi_di_dalam_tubuh_saat_darah_mengalir__-_Belajar_IPA_cj8b2r.mp4",
      description: "Sirkulasi darah ringkas (≤3 menit).",
      questions: [
        {
          id: "b2q1",
          q: "Bagian darah yang berperan dalam pembekuan darah?",
          opts: ["Eritrosit", "Leukosit", "Trombosit"],
          a: 2,
        },
        {
          id: "b2q2",
          q: "Pembuluh yang membawa darah kaya oksigen dari paru-paru ke jantung?",
          opts: ["Vena Kava", "Arteri Pulmonalis", "Vena Pulmonalis"],
          a: 2,
        },
      ],
    },
  ],
  Matematika: [
    {
      id: "m1",
      title: "Konsep Pecahan",
      video:
        "https://res.cloudinary.com/dgzufaone/video/upload/v1760751491/barbar/Pecahan_-_Animasi_Matematika_SD_n2roxi.mp4",
      description: "Apa itu pembilang dan penyebut?",
      questions: [
        {
          id: "m1q1",
          q: "Berapakah hasil dari 1/2 + 1/4?",
          opts: ["2/6", "3/4", "1/3"],
          a: 1,
        },
        {
          id: "m1q2",
          q: "Angka di bagian bawah pecahan disebut?",
          opts: ["Pembilang", "Penyebut", "Koefisien"],
          a: 1,
        },
      ],
    },
    {
      id: "m2",
      title: "Teorema Pythagoras",
      video:
        "https://res.cloudinary.com/dgzufaone/video/upload/v1761116900/Teorema_Pythagoras_dan_Pembuktian_dengan_Animasi_arpdtu.mp4",
      description: "Mencari sisi miring segitiga siku-siku.",
      questions: [
        {
          id: "m2q1",
          q: "Rumus Teorema Pythagoras untuk sisi miring (c) adalah?",
          opts: ["a² + b² = c²", "a² - b² = c²", "a + b = c"],
          a: 0,
        },
        {
          id: "m2q2",
          q: "Jika a=3 dan b=4, maka panjang sisi miring c adalah?",
          opts: ["5", "7", "25"],
          a: 0,
        },
      ],
    },
  ],
  Ekonomi: [
    {
      id: "e1",
      title: "Permintaan & Penawaran",
      video:
        "https://res.cloudinary.com/dgzufaone/video/upload/v1760750374/introduction-to-supply-and-demand_PwrjcZaP_x6tsu1.mp4",
      description: "Mengenal kurva D dan S (≤3 menit).",
      questions: [
        {
          id: "e1q1",
          q: "Jika harga barang naik, maka jumlah barang yang diminta cenderung...",
          opts: ["Naik", "Tetap", "Turun"],
          a: 2,
        },
        {
          id: "e1q2",
          q: "Titik pertemuan kurva permintaan dan penawaran disebut?",
          opts: ["Harga Maksimum", "Keseimbangan Pasar", "Titik Impas"],
          a: 1,
        },
      ],
    },
  ],
};
