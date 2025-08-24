import CodeEditor from "../CodeEditor/CodeEditor";

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
    <div className="relative animate-appear flex flex-col gap-3 text-white">
      <CodeEditor
        value={value}
        onChange={onQueryChange}
        placeholder={placeholder}
        readOnly={readonly}
        className="transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
      />
    </div>
  );
}
