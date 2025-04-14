'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function SplashScreen({ onFinish }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onFinish();
    }, 3000); // Duración del splash en milisegundos

    return () => clearTimeout(timer);
  }, [onFinish]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center transition-opacity duration-500">
      <Image src="/logo.png" alt="Logo" width={120} height={120} className="animate-pulse" />
      <p className="text-white text-2xl mt-4 animate-bounce">FocusMode.AI</p>
    </div>
  );
}