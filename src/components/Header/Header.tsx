import { Terminal } from "lucide-react";
import { useTranslations } from "../../hooks/useTranslations";
import Help from "../Help/Help";
import { Github } from "../icons/icons";
import { Button } from "../ui/button";
import { SidebarTrigger } from "../ui/sidebar";

export default function Header() {
  const { t } = useTranslations();

  return (
    <header className="w-full flex items-center justify-between px-6 py-4 border-b border-purple-500/20 backdrop-blur-sm">
      <div className="relative flex items-center gap-3 animate-scale-in z-10">
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl shadow-lg shadow-purple-500/25 animate-float"
            aria-label={t("header.logo")}
            aria-hidden="true"
          >
            <Terminal aria-hidden="true" />
          </div>
          <h1
            className="hidden md:block text-4xl font-extrabold tracking-tight leading-none"
            title="Rapid Format"
          >
            <span className="animate-color-wave">Rapid</span>{" "}
            <span className="text-gray-300 transition-colors duration-300 hover:text-white">
              Format
            </span>
          </h1>
        </div>
      </div>
      <nav className="relative flex items-center gap-3 z-10">
      <Button
          asChild
          variant="outline"
          size="sm"
          className="flex items-center gap-2 bg-black/90 border-gray-700 text-white hover:bg-purple-700 hover:border-purple-600 hover:text-white hover:scale-105 backdrop-blur-sm transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
        >
          <a
            href="https://github.com/villarrealjoaquin/RapidFormat"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
            aria-label={`${t("header.github")} ${t("header.opensInNewTab")}`}
          >
            <Github ariaHidden={true} />
            <span className="font-medium">{t("header.github")}</span>
          </a>
        </Button>
        <Help />
        <SidebarTrigger className="md:hidden" />
      </nav>
    </header>
  );
}
