import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";

export default function Combinations() {
  return (
    <div className="flex flex-col gap-3 w-[180px] justify-center items-center ">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="bg-[#09090B] border-[#09090B]">Conversiones</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] p-4 bg-[#09090B] border-[#09090B]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-purple-600">
              Conversiones Disponibles
            </DialogTitle>
          </DialogHeader>
          <table className="w-full mt-3">
            <thead>
              <tr className="bg-purple-200 text-purple-700">
                <th className="py-2 px-4">Desde</th>
                <th className="py-2 px-4">Hacia</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4">Object</td>
                <td className="py-2 px-4">JSON</td>
              </tr>
              <tr>
                <td className="py-2 px-4">Object</td>
                <td className="py-2 px-4">Interface</td>
              </tr>
              <tr>
                <td className="py-2 px-4">JSON</td>
                <td className="py-2 px-4">Object</td>
              </tr>
              <tr>
                <td className="py-2 px-4">JSON</td>
                <td className="py-2 px-4">Interface</td>
              </tr>
            </tbody>
          </table>
        </DialogContent>
      </Dialog>
    </div>
  );
}
