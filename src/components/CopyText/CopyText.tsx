import clsx from "clsx";
import { Check, Copy, Trash } from "lucide-react";
import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { Button } from "../ui/button";

export default function CopyText({
  text,
  onDeleteOutput,
}: {
  text: string;
  onDeleteOutput: () => void;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopyClick = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <>
      <CopyToClipboard text={text}>
        <div className="flex gap-3 z-50">
          <Button
            className="flex items-center bg-red-500 hover:bg-red-500/90 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={onDeleteOutput}
            disabled={!text}
          >
            <Trash width={16} height={16}/>
          </Button>
          <Button
            className={clsx(
              `flex px-3 items-center justify-center bottom-2 right-2 gap-3 py-1 bg-[#3a1d7ed2] text-white rounded transition-all duration-300`,
              !text ? "opacity-50 cursor-not-allowed" : "hover:bg-purple-700)"
            )}
            onAnimationEnd={() => setCopied(false)}
            disabled={!text}
            onClick={handleCopyClick}
          >
            {copied ? <Check width={16} height={16} /> : <Copy width={16} height={16} />}
          </Button>
        </div>
      </CopyToClipboard>
    </>
  );
}
