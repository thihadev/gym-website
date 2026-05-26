const LoadingSpinner = ({ fullPage = false, size = "md" }) => {
  const sizes = { sm: "w-5 h-5", md: "w-7 h-7", lg: "w-9 h-9" };
  const ring = sizes[size] || sizes.md;

  return (
    <div
      className={`flex flex-col justify-center items-center gap-3 ${
        fullPage ? "fixed inset-0 bg-bg-base z-50" : "min-h-[40vh]"
      }`}
    >
      <div className={`relative ${ring}`}>
        <div className="absolute inset-0 rounded-full border-2 border-white/10" />
        <div className="absolute inset-0 rounded-full border-2 border-t-accent border-r-transparent border-b-transparent border-l-transparent animate-spin" />
      </div>
      <span className="text-slate-400 text-sm tracking-wide">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;
