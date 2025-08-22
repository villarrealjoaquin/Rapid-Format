import { HelpCircle } from "../icons/icons";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export default function Help() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 bg-black/90 border-gray-700 text-white hover:bg-purple-700 hover:border-purple-600 hover:text-white hover:scale-105 backdrop-blur-sm transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
        >
          <HelpCircle />
          <span className="hidden sm:inline font-medium">Ayuda</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-white [&>button]:text-black">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-purple-600 flex items-center gap-2">
            <HelpCircle />
            ¿Cómo usar Rapid Format?
          </DialogTitle>
          <DialogDescription className="text-black text-base leading-relaxed">
            Selecciona los formatos de entrada y salida, luego haz clic en
            "Convertir Datos".
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-600">
            <h3 className="font-semibold text-purple-600 mb-2">
              Pasos para convertir:
            </h3>
            <ol className="list-decimal list-inside space-y-1 text-black">
              <li>Pega tu contenido en el área de entrada</li>
              <li>Selecciona el formato de origen</li>
              <li>Selecciona el formato de destino</li>
              <li>Haz clic en "Convertir Datos"</li>
              <li>Copia el resultado desde el área de salida</li>
            </ol>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
