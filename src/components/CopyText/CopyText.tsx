import { useState } from "react";
import { CopiedIcon, Copy } from "../icons/icons";
import CopyToClipboard from "react-copy-to-clipboard";
import { Trash } from "lucide-react";
import { Button } from "../ui/button";

export default function CopyText({ text, onDeleteOutput }: { text: string, onDeleteOutput: () => void }) {
  const [copied, setCopied] = useState(false);

  const handleCopyClick = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <>
      <CopyToClipboard text={text}>
        <div className="flex absolute bottom-2 right-2 gap-3">
          <Button className="flex items-center bg-red-500 hover:bg-red-500/90 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed "
            onClick={onDeleteOutput}
            disabled={!text}
          >
            <Trash className="w-5 h-5" />
          </Button>
          <button
            className="flex px-3 items-center justify-center bottom-2 right-2 gap-3 py-1 bg-[#8a5cf676] hover:bg-[#8a5cf676]/90 hover:scale-105 text-white rounded transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#8a5cf676]/90 disabled:hover:scale-100 disabled:hover:cursor-not-allowed"
            onAnimationEnd={() => setCopied(false)}
            disabled={copied}
            onClick={handleCopyClick}
          >
            {copied ? 'Copiado' : 'Copiar'} {copied ? <CopiedIcon /> : <Copy />}
          </button>
        </div>
      </CopyToClipboard>
    </>
  )
}