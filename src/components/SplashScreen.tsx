"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

export default function SplashScreen() {
  const { loading } = useAuth();
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (!loading) {
      setTimeout(() => setShow(false), 800);
    }
  }, [loading]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="splash-screen"
          initial={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="splash-logo"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src="https://res.cloudinary.com/dgzufaone/image/upload/v1761143718/Gemini_Generated_Image_hbfzexhbfzexhbfz-modified_rcnbja.png"
              alt="Logo"
              width={48}
              height={48}
              className="header-logo"
            />
            <h1>BARBAR</h1>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
