import { Button } from '../ui/button';

interface ConversionControlsProps {
  fromFormat: string;
  toFormat: string;
  isEqual: boolean;
  onConvertClick: () => void;
}

const ConversionControls: React.FC<ConversionControlsProps> = ({ fromFormat, toFormat, onConvertClick, isEqual }) => (
  <>
    <p className="text-gray-600 text-center mt-2 font-bold">Selecciona los formatos de entrada y salida, luego haz clic en "Convertir Datos".</p>
    <div className="mt-6">
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