import React from "react";
import { FaEnvelope } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const ModalThankYou = ({ message, onClose }) => {
  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center z-50" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-sm bg-bg-card border border-white/10 rounded-2xl shadow-2xl p-8 relative"
        >
          <button onClick={onClose} className="absolute top-3 right-4 text-slate-400 hover:text-white text-2xl transition">&times;</button>
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            className="flex justify-center"
          >
            <div className="bg-accent-dim text-accent p-4 rounded-full animate-wave">
              <FaEnvelope size={36} />
            </div>
          </motion.div>
          <div className="mt-5 text-center">
            <h2 className="text-2xl font-bold text-white">Thank You!</h2>
            <p className="text-base text-slate-300 mt-3 leading-relaxed">{message}</p>
          </div>
          <div className="mt-6 flex justify-center">
            <button onClick={onClose} className="btn">
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ModalThankYou;
