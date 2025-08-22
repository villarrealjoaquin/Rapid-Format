export default function Header() {
  return (
    <>
      <header className="text-center mb-12 px-4">
        <div className="flex flex-col items-center gap-6 max-w-2xl mx-auto">
          <div className="flex flex-col items-center gap-2 animate-scale-in">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
              <span className="animate-color-wave">Rapid</span>{" "}
              <span className="text-gray-300 transition-colors duration-300 hover:text-white">
                Format
              </span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-purple-700 rounded-full animate-pulse animate-delay-200"></div>
          </div>
        </div>
      </header>
    </>
  );
}