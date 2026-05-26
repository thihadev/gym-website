import React, { useEffect } from "react";

const Modal = ({ children, onClose }) => {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 p-4 bg-black/75 backdrop-blur-sm grid place-items-center z-[9999] animate-fade-in"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative w-full max-w-[440px] max-h-[calc(100svh-2rem)] overflow-y-auto rounded-2xl bg-bg-card border border-white/10 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-2.5 right-3 text-slate-400 hover:text-white text-2xl leading-none z-10 transition-colors"
          aria-label="Close"
        >
          &times;
        </button>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
