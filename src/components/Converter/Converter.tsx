import { Textarea } from "../ui/textarea";

interface Props {
  onQueryChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
  readonly?: boolean;
  placeholder?: string;
}

export default function Converter({
  onQueryChange,
  readonly = false,
  value,
  placeholder,
}: Props) {
  return (
    <div className="relative animated flex flex-col gap-3 text-white animate-appear">
      <Textarea
        onChange={onQueryChange}
        readOnly={readonly}
        placeholder={placeholder}
        value={value}
        className="custom-scrollbar transition-all w-[250px] sm:w-[450px] md:w-[800px] bg-black border border-gray-800 p-2 rounded-md focus:outline-none focus:ring focus:border-purple-500 font-mono text-sm leading-6 resize-none"
      />
    </div>
  );
}
