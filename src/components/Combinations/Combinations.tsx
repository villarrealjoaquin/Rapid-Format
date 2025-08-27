import { CONVERSIONS } from "@/constants";
import { ConvertIcon } from "../icons/icons";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export default function Combinations() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 bg-black/90 border-gray-700 text-white hover:bg-purple-700 hover:border-purple-600 hover:text-white hover:scale-105 backdrop-blur-sm transition-all duration-300 shadow-lg hover:shadow-gray-500/25"
        >
          <ConvertIcon />
          <span className="hidden md:inline font-medium">Conversiones</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-white [&>button]:text-black">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-purple-600 flex items-center gap-2">
            <ConvertIcon />
            Conversiones Disponibles
          </DialogTitle>
          <DialogDescription className="text-black">
            Estas son todas las conversiones que puedes realizar con Rapid
            Format
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 mt-4">
          {CONVERSIONS.map((conversion, index) => (
            <div
              key={index}
              className="bg-purple-50 p-4 rounded-lg border border-purple-200 hover:border-purple-600 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="bg-purple-600 text-white px-3 py-1 rounded-md text-sm font-medium">
                    {conversion.from}
                  </span>
                  <div className="text-purple-600">
                    <ConvertIcon />
                  </div>
                  <span className="bg-black text-white px-3 py-1 rounded-md text-sm font-medium">
                    {conversion.to}
                  </span>
                </div>
              </div>
              <p className="text-black text-sm">{conversion.description}</p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
