import { Github } from "../icons/icons";
import { Button } from "../ui/button";

export default function Footer() {
  return (
    <>
      <footer className="flex justify-center items-center gap-4 w-full text-center mt-10 mb-10 lg:mt-0 lg:mb-0">
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
          <p className="text-gray-300 text-sm">¿Te gusta el proyecto?</p>
          <Button
            asChild
            variant="outline"
            size="sm"
            className="group bg-transparent border-purple-400/50 text-purple-300 hover:bg-purple-600 hover:border-purple-500 hover:text-white transition-all duration-300 shadow-lg hover:shadow-purple-500/25 hover:scale-105"
          >
            <a
              href="https://github.com/villarrealjoaquin/RapidFormat"
              target="_blank"
              className="flex items-center gap-2"
            >
              <Github />
              <span className="font-medium">Ver en GitHub</span>
            </a>
          </Button>
        </div>
      </footer>
    </>
  );
}
