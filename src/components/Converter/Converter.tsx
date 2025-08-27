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
    <div className="w-full z-50">
      <Textarea
        onChange={onQueryChange}
        readOnly={readonly}
        placeholder={placeholder}
        value={value}
        className="custom-scrollbar transition-all bg-black border border-gray-800 p-2 rounded-md focus:outline-none focus:ring focus:border-purple-500 font-mono text-sm leading-6"
      />
    </div>
  );
}
