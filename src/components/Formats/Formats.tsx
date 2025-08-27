import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import RenderFormat from "../RenderFormat/RenderFormat";

interface Props {
  onValueChange: (value: string) => void;
  lists: string[];
  excludeFormat?: string;
}

export default function Formats({
  onValueChange,
  lists,
  excludeFormat,
}: Props) {
  const filteredLists = lists.filter((format) => format !== excludeFormat);

  return (
    <>
      <Select onValueChange={onValueChange}>
        <SelectTrigger className="w-[180px] bg-[#09090B] border-none">
          <SelectValue placeholder="Selecciona el formato" />
        </SelectTrigger>
        <SelectContent className="bg-[#09090B] text-white">
          <SelectGroup>
            <RenderFormat
              list={filteredLists}
              renderList={(item) => (
                <SelectItem value={item}>{item}</SelectItem>
              )}
              extractId={(item) => item}
            />
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}
