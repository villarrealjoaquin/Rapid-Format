import { CUSTOM_EDITOR_STYLE } from "@/constants";
import { useRef, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

interface CodeEditorProps {
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  readOnly?: boolean;
  className?: string;
}

export default function CodeEditor({
  value,
  onChange,
  placeholder = "",
  readOnly = false,
  className = "",
}: CodeEditorProps) {
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const highlighterRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    if (highlighterRef.current && e.target) {
      const target = e.target as HTMLTextAreaElement;
      highlighterRef.current.scrollTop = target.scrollTop;
      highlighterRef.current.scrollLeft = target.scrollLeft;
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative w-[250px] sm:w-[450px] md:w-[550px] min-h-[600px] border border-gray-800 rounded-md overflow-hidden bg-black">
        <div
          ref={highlighterRef}
          className="absolute top-0 left-0 w-full h-full overflow-auto pointer-events-none"
        >
          <SyntaxHighlighter
            language={"javascript"}
            style={CUSTOM_EDITOR_STYLE}
            customStyle={{
              background: "transparent",
              margin: 0,
              padding: "8px",
              minHeight: "100%",
              fontSize: "14px",
              lineHeight: "1.6",
            }}
            showLineNumbers={false}
            wrapLines={true}
            wrapLongLines={true}
          >
            {value || " "}
          </SyntaxHighlighter>
        </div>

        <textarea
          ref={textareaRef}
          value={value}
          onChange={onChange}
          onScroll={handleScroll}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          readOnly={readOnly}
          className={`
            absolute top-0 left-0 w-full h-full resize-none outline-none
            font-mono text-[14px] leading-relaxed p-2
            bg-transparent text-transparent caret-white
            ${isFocused ? "z-10" : "z-20"}
            ${readOnly ? "cursor-default" : "cursor-text"}
          `}
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
        />

        {!value && placeholder && (
          <div className="absolute top-2 left-2 text-gray-500 pointer-events-none z-0 font-mono text-[14px]">
            {placeholder}
          </div>
        )}

        {readOnly && (
          <div className="absolute top-2 right-2 bg-purple-600 text-white px-2 py-1 rounded text-xs font-mono backdrop-blur-sm opacity-50">
            READ ONLY
          </div>
        )}
      </div>
    </div>
  );
}
