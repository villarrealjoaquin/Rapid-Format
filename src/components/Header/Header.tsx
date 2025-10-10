import { Terminal } from "lucide-react";
import Help from "../Help/Help";
import { Github } from "../icons/icons";
import { Button } from "../ui/button";
import { SidebarTrigger } from "../ui/sidebar";

export default function Header() {
  return (
    <header className="w-full flex items-center justify-between px-6 py-4 border-b border-purple-500/20 backdrop-blur-sm">
      <div className="relative flex items-center gap-3 animate-scale-in z-10">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl shadow-lg shadow-purple-500/25 animate-float">
            <Terminal />
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight leading-none">
              <span className="animate-color-wave">Rapid</span>{" "}
              <span className="text-gray-300 transition-colors duration-300 hover:text-white">
                Format
              </span>
            </h1>
          </div>
        </div>
      </div>
      <div className="relative flex items-center gap-3 z-10">
        <Button
          variant="outline"
          size="sm"
          className="hidden sm:flex items-center gap-2 bg-black/90 border-gray-700 text-white hover:bg-purple-700 hover:border-purple-600 hover:text-white hover:scale-105 backdrop-blur-sm transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
        >
          <a
            href="https://github.com/villarrealjoaquin/RapidFormat"
            target="_blank"
            className="flex items-center gap-2"
          >
            <Github />
            <span className="hidden font-medium md:inline">Apoyanos</span>
          </a>
        </Button>
        <Help />
        <SidebarTrigger className="md:hidden" />
      </div>
    </header>
  );
}
