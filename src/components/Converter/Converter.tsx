import { Textarea } from "../ui/textarea";

interface Props {
  onQueryChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
  readonly?: boolean;
}

export default function Converter({ onQueryChange, readonly = false, value }: Props) {
  return (
    <>
      <div className="flex relative animated flex-col gap-3 text-white">
        <Textarea
          onChange={onQueryChange}
          readOnly={readonly}
          value={value}
          className="transition-all text-black duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
    </>
  );
}
