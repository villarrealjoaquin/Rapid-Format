import { useState } from "react";
import { CopiedIcon, Copy } from "../icons/icons";
import CopyToClipboard from "react-copy-to-clipboard";

export default function CopyText({ text }: { text: string }) {
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
        <div className="flex">
          <button
            className="inline-flex px-3 absolute bottom-2 right-2 gap-3 py-1 bg-[#8a5cf676] text-white rounded"
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