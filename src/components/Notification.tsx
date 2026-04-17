"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type NotificationProps = {
  message: string;
  show: boolean;
  onClose: () => void;
};

export default function Notification({ message, show, onClose }: NotificationProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (show) {
      const t = setTimeout(onClose, 2000);
      return () => clearTimeout(t);
    }
  }, [show, onClose]);

  if (!mounted) return null;

  return createPortal(
    <div className={`notification ${show ? "show" : ""}`}>
      {message}
    </div>,
    document.body
  );
}
