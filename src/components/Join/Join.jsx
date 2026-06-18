import { useRef } from "react";
import emailjs from "@emailjs/browser";

const Join = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm("service_0gbe3wo", "template_u853iva", form.current, "Zza3fHy6xEn2-9Rs3")
      .then(() => { console.log("SUCCESS!"); })
      .catch((error) => { console.log("FAILED...", error.text); });
  };

  return (
    <div className="w-full max-w-[1220px] mx-auto px-[clamp(0.75rem,3vw,1.5rem)] py-8 my-8 flex flex-col md:flex-row gap-10 md:gap-20 items-center">
      <div className="text-white font-bold text-3xl md:text-5xl uppercase relative">
        <hr className="absolute -top-3 w-40 border-2 border-slate-400 rounded" />
        <div className="flex gap-3">
          <span className="stroke-text">READY TO</span>
          <span>LEVEL UP</span>
        </div>
        <div className="flex gap-3">
          <span>YOUR BODY</span>
          <span className="stroke-text">WITH US</span>
        </div>
      </div>
      <div className="flex justify-center items-end">
        <form ref={form} onSubmit={sendEmail} className="flex gap-4 md:gap-8 bg-bg-card-alt px-5 py-4 rounded-xl">
          <input
            type="email"
            name="user_email"
            placeholder="Enter Your Email Address"
            className="bg-transparent border-none outline-none text-white placeholder-slate-400 text-sm min-w-[180px]"
          />
          <button type="submit" className="btn whitespace-nowrap">
            Join Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default Join;
