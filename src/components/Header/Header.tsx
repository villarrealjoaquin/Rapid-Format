import { Terminal } from "lucide-react";
import Combinations from "../Combinations/Combinations";
import Help from "../Help/Help";

export default function Header() {
  
  return (
    <header className="flex items-center justify-between px-6 py-4 rounded-2xl border border-purple-500/20 backdrop-blur-sm mx-10">
      <div className="relative flex flex-col items-start gap-1 animate-scale-in z-10">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl shadow-lg shadow-purple-500/25 animate-float">
            <Terminal />
          </div>
          <h1 className="hidden md:block text-4xl font-extrabold tracking-tight leading-none">
              <span className="animate-color-wave">Rapid</span>{" "}
              <span className="text-gray-300 transition-colors duration-300 hover:text-white">
                Format
              </span>
            </h1>
        </div>
      </div>
      <div className="relative flex gap-3 z-10">
        <Help />
        <Combinations />
      </div>
    </header>
  );
}
