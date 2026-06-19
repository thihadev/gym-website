import React from "react";
import Logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { FaYoutube, FaFacebook, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative mt-8 bg-[#0f172a] border-t border-white/10 text-white overflow-hidden">
      {/* Glow blobs */}
      <div className="absolute bottom-0 right-[15%] w-72 h-32 blur-[120px] -z-10 bg-lime-500/20 rounded-full" />
      <div className="absolute bottom-0 left-[15%] w-72 h-32 blur-[120px] -z-10 bg-lime-400/10 rounded-full" />

      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <Link to="/">
          <img src={Logo} alt="logo" className="w-36 opacity-90 hover:opacity-100 transition" />
        </Link>

        {/* Copyright */}
        <p className="text-slate-500 text-base text-center">
          © {new Date().getFullYear()} Body By U. All rights reserved.
        </p>

        {/* Social */}
        <div className="flex gap-5">
          {[
            { icon: <FaYoutube />, href: "#" },
            { icon: <FaInstagram />, href: "#" },
            { icon: <FaFacebook />, href: "#" },
          ].map(({ icon, href }, i) => (
            <a
              key={i}
              href={href}
              className="w-9 h-9 flex items-center justify-center rounded-full border border-white/10 text-slate-400 hover:text-lime-400 hover:border-lime-400 transition text-lg"
            >
              {icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
