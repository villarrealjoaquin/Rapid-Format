import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export const INPUT_ALL_FORMATS = ["JSON", "Object"];
export const OUTPUT_ALL_FORMATS = ["JSON", "Object", "Interface"];

export const CONVERSIONS = [
  {
    from: "Object",
    to: "JSON",
    description: "Convierte objetos JavaScript a formato JSON",
  },
  {
    from: "Object",
    to: "Interface",
    description: "Genera interfaces TypeScript desde objetos",
  },
  {
    from: "JSON",
    to: "Object",
    description: "Transforma JSON a objetos JavaScript",
  },
  {
    from: "JSON",
    to: "Interface",
    description: "Crea interfaces TypeScript desde JSON",
  },
];


export const CUSTOM_EDITOR_STYLE = {
  ...vscDarkPlus,
  'code[class*="language-"]': {
    ...vscDarkPlus['code[class*="language-"]'],
    fontFamily: '"Fira Code", "JetBrains Mono", "Cascadia Code", monospace',
    fontSize: "14px",
    lineHeight: "1.6",
  },
  'pre[class*="language-"]': {
    ...vscDarkPlus['pre[class*="language-"]'],
    background: "transparent",
    margin: 0,
    padding: "8px",
    fontFamily: '"Fira Code", "JetBrains Mono", "Cascadia Code", monospace',
    fontSize: "14px",
    lineHeight: "1.6",
  },
};

