import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import RenderFormat from "../RenderFormat/RenderFormat";


export default function Formats({
  onValueChange, lists
}: {
  onValueChange: (value: string) => void, lists: string[]
}) {
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
            <RenderFormat
              list={lists}
              renderList={(item) => (
                <SelectItem value={item}>{item}</SelectItem>
              )}
              extractId={(item) => item}
            />
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  )
}