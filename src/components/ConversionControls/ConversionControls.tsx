import { Button } from '../ui/button';

interface ConversionControlsProps {
  fromFormat: string;
  toFormat: string;
  isEqual: boolean;
  onConvertClick: () => void;
}

const ConversionControls: React.FC<ConversionControlsProps> = ({ fromFormat, toFormat, onConvertClick, isEqual }) => (
  <>
    <div className="flex flex-col gap-3 justify-center">
      <Button
        className="transition-colors duration-300 bg-[#09090B] border-[#09090B] hover:bg-[#8a5cf676]/90 hover:cursor-pointer disabled:opacity-50 text-white font-bold py-2 px-4 rounded"
        disabled={fromFormat === "" || toFormat === "" || isEqual}
        onClick={onConvertClick}
      >
        Convertir Datos
      </Button>
    </div>
  </>
);

export default ConversionControls;