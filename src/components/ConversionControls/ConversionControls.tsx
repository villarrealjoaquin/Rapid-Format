import { useTranslations } from "@/hooks/useTranslations";
import { Shuffle } from "lucide-react";
import { Button } from "../ui/button";

interface ConversionControlsProps {
  fromFormat: string;
  toFormat: string;
  isEqual: boolean;
  onConvertClick: () => void;
}

const ConversionControls: React.FC<ConversionControlsProps> = ({
  fromFormat,
  toFormat,
  onConvertClick,
  isEqual,
}) => {
  const { t } = useTranslations();
  const isDisabled = fromFormat === "" || toFormat === "" || isEqual;

  const disabledReason = isDisabled
    ? fromFormat === "" || toFormat === ""
      ? t("accessibility.reason.selectFormats")
      : t("accessibility.reason.sameFormats")
    : "";

  return (
    <section
      className="flex flex-col gap-3 justify-center"
      aria-label={t("accessibility.conversionControls")}
    >
      {isDisabled && (
        <p id="convert-button-status" className="sr-only">
          {t("accessibility.convertUnavailable")} — {disabledReason}
        </p>
      )}

      <Button
        type="button"
        className="transition-colors duration-300 bg-transparent border border-[#8a5cf676] hover:bg-[#8a5cf676]/90 hover:cursor-pointer disabled:opacity-50 text-white font-bold py-7 px-4 rounded-full
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
        disabled={isDisabled}
        onClick={onConvertClick}
        aria-label={t("actions.convert")}
        aria-describedby={isDisabled ? "convert-button-status" : undefined}
      >
        <Shuffle aria-hidden="true" />
      </Button>
    </section>
  );
};

export default ConversionControls;
