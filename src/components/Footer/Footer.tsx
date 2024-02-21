import { Github } from "../icons/icons";

export default function Footer() {
  return (
    <>
      <footer className="flex justify-center gap-2 w-full text-center">
        <p className="font-bold">
          Contribuí aca
        </p>
        <a href="https://github.com/villarrealjoaquin/RapidFormat" target="_blank">
          <Github /> 
        </a>
        ✨🚀
      </footer>
    </>
  )
}