import { useTranslations } from "@/hooks/useTranslations";
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
  const { t } = useTranslations();

  const handleCopyClick = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <CopyToClipboard text={text}>
      <div
        className="flex gap-3 z-50"
        aria-label={t("converter.outputActions")}
        aria-disabled={!text}
        role="group"
      >
        <Button
          className="flex items-center bg-red-500 hover:bg-red-500/90 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={onDeleteOutput}
          disabled={!text}
          aria-disabled={!text}
          aria-label={t("converter.deleteButton")}
          aria-describedby={!text ? "delete-status" : undefined}
          type="button"
        >
          <Trash width={16} height={16} />
        </Button>
        <Button
          className={clsx(
            `flex px-3 items-center justify-center bottom-2 right-2 gap-3 py-1 bg-[#3a1d7ed2] text-white rounded transition-all duration-300`,
            !text ? "opacity-50 cursor-not-allowed" : "hover:bg-purple-700)"
          )}
          onAnimationEnd={() => setCopied(false)}
          disabled={!text}
          aria-disabled={!text}
          aria-label={t("converter.copyButton")}
          aria-describedby={
            !text ? "copy-status" : copied ? "copy-success-status" : undefined
          }
          type="button"
          onClick={handleCopyClick}
        >
          {copied ? (
            <Check width={16} height={16} />
          ) : (
            <Copy width={16} height={16} />
          )}
        </Button>
        {!text && (
          <div id="delete-status" role="status" className="sr-only">
            {t("converter.deleteButtonDisabled")}
          </div>
        )}
        {!text && (
          <div id="copy-status" role="status" className="sr-only">
            {t("converter.copyButtonDisabled")}
          </div>
        )}
        {copied && (
          <div id="copy-success-status" role="status" className="sr-only">
            {t("converter.copySuccess")}
          </div>
        )}
      </div>
    </CopyToClipboard>
  );
}
