import { CrossArrows } from "../icons/icons";
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
  return (
  <>
    <div className="flex flex-col gap-3 justify-center">
      <Button
        className="transition-colors duration-300 bg-transparent border border-[#8a5cf676] hover:bg-[#8a5cf676]/90 hover:cursor-pointer disabled:opacity-50 text-white font-bold py-7 px-4 rounded-full"
        disabled={fromFormat === "" || toFormat === "" || isEqual}
        onClick={onConvertClick}
      >
        <CrossArrows />
      </Button>
    </div>
  </>
  );
};

export default ConversionControls;
