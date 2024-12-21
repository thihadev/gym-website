import React from "react";
import Github from "../../assets/github.png";
import Instagram from "../../assets/instagram.png";
import LinkedIn from "../../assets/linkedin.png";
import Logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
<div className="relative mt-5 text-white">
  {/* Blur Backgrounds */}
  <div className="absolute bottom-0 right-[15%] w-[26rem] h-[12rem] blur-[200px] -z-10 bg-blue-custom-1"></div>
  <div className="absolute bottom-0 left-[15%] w-[26rem] h-[12rem] blur-[200px] -z-10 bg-blue-custom-2"></div>

  {/* Footer Content */}
  <div className="relative container mx-auto py-6 px-4 flex flex-col lg:flex-row items-center justify-between">
    {/* Social Links */}
    <div className="flex space-x-6">
      <img src={Github} alt="github" className="w-8 h-8" />
      <img src={Instagram} alt="instagram" className="w-8 h-8" />
      <img src={LinkedIn} alt="linkedin" className="w-8 h-8" />
    </div>
    {/* Logo */}
    <div className="mt-4 lg:mt-0">
      <Link to="/">
      <img src={Logo} alt="logo" className="w-32" />
      </Link>
    </div>
  </div>
</div>

  );
};

export default Footer;
