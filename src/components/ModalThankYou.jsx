import React from "react";
import { FaEnvelope } from "react-icons/fa"; // Envelope icon from FontAwesome
import { motion } from "framer-motion"; // For animations

const ModalThankYou = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      {/* Modal Box */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-lg shadow-lg w-96 p-6 relative"
      >
        {/* Animated Envelope Icon */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          className="flex justify-center"
        >
          <div className="bg-blue-100 text-blue-500 p-4 rounded-full"
         style={{ animation: "wave 1.5s infinite" }}
          >
            <FaEnvelope size={40} />
          </div>
        </motion.div>

        {/* Thank You Message */}
        <div className="mt-4 text-center">
          <h2 className="text-xl font-bold text-gray-800">Thank You!</h2>
          <p className="text-lg text-gray-600 mt-2">{message}</p>
        </div>

        {/* Close Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={onClose}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ModalThankYou;
