import { Textarea } from "../ui/textarea";

interface Props {
  onQueryChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
  readonly?: boolean;
  placeholder?: string;
}

export default function Converter({ onQueryChange, readonly = false, value, placeholder }: Props) {
  return (
    <div className="relative animated flex flex-col gap-3 text-white">
      <Textarea
        onChange={onQueryChange}
        readOnly={readonly}
        placeholder={placeholder}
        value={value}
        className="transition-all bg-black border border-gray-800 p-2 rounded-md focus:outline-none focus:ring focus:border-purple-500"
        style={{ fontFamily: 'monospace', fontSize: '14px', lineHeight: '1.5' }}
      />
    </div>
  );
}
