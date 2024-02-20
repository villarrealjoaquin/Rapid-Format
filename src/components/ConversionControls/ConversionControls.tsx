import React from 'react';
import { Button } from '../ui/button';

interface ConversionControlsProps {
  fromFormat: string;
  toFormat: string;
  onConvertClick: () => void;
}

const ConversionControls: React.FC<ConversionControlsProps> = ({ fromFormat, toFormat, onConvertClick }) => (
  <>
    <p className="text-gray-600 mt-2">Selecciona los formatos de entrada y salida, luego haz clic en "Convertir Datos".</p>
    <div className="mt-6">
      <Button
        className="transition-colors duration-300 hover:scale-y-100 hover:bg-[#8a5cf676] text-white font-bold py-2 px-4 rounded"
        disabled={fromFormat === "" || toFormat === ""}
        onClick={onConvertClick}
      >
        Convertir Datos
      </Button>
    </div>
  </>
);

export default ConversionControls;