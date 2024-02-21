import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

export default function Formats({ onValueChange }: { onValueChange: (value: string) => void }) {
  return (
    <>
      <Select
        onValueChange={onValueChange}
      >
        <SelectTrigger className="w-[180px] bg-[#09090B] border-[#09090B]">
          <SelectValue placeholder="Selecciona el formato" />
        </SelectTrigger>
        <SelectContent className="bg-[#09090B] text-white">
          <SelectGroup>
            <SelectItem value="JSON">JSON</SelectItem>
            <SelectItem value="Object">Object</SelectItem>
            <SelectItem value="interface">Interface</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  )
}