import { useState } from "react";
import { Button } from "./components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "./components/ui/textarea";

// { name: "John", age: 30 }
// Easily convert data between different formats

// interface Props {
//   name: string;
//   lastname:string;
// }

type ObjectType = {
  [key: string]: string | number | boolean | null | ObjectType;
};

function App() {
  const [fromFormat, setFromFormat] = useState("");
  const [toFormat, setToFormat] = useState("");
  const [query, setQuery] = useState("");
  const [output, setOutput] = useState("");
  // const [error, setError] = useState("");

  const convertToJson = (query: string) => {
    const trimmedQuery = query.trim();
    const cleanedQuery = trimmedQuery.replace(/\s+/g, ' ');
    const commaRemovedQuery = cleanedQuery.replace(/,\s*}/g, '}');
    const hash = commaRemovedQuery.replace(/(\w+):/g, '"$1":')
    const convert = JSON.parse(hash);
    return JSON.stringify(convert, null, 2);
  }

  const convertToObj = (query: string): string => {
    const jsonObject: ObjectType = JSON.parse(query);
    return `{ \n${formatObjectForDisplay(jsonObject)}\n }`;
  }
  
  function formatObjectForDisplay(obj: ObjectType, depth = 0): string {
    const spaces = '  '.repeat(depth);
  
    return Object.entries(obj)
      .map(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
          return `${spaces}${key}: {\n${formatObjectForDisplay(value, depth + 1)}\n${spaces}}`;
        } else {
          const formattedValue = typeof value === 'string' ? `"${value}"` : value;
          return `${spaces}${key}: ${formattedValue}`;
        }
      })
      .join(',\n');
  }

  const processFormat = () => {
    if (fromFormat === "Object" && toFormat === "JSON") {
      const jsonOutput = convertToJson(query) as string;
      if (jsonOutput !== null) {
        setOutput(jsonOutput);
      }
    }

    if (fromFormat === "JSON" && toFormat === "Object") {
      setOutput(convertToObj(query) as string);
    }

    // if (fromFormat === "interface") {
    //   return
    // }
  }

  return (
    <>
      <header className="text-center mb-8">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-4xl font-bold animate-color-wave">Data Format Converter</h1>
          <p className="text-gray-600">Convierta fácilmente datos entre diferentes formatos</p>
        </div>
      </header>
      <main className="w-full flex flex-col items-center">
        <div className="flex flex-col sm:flex-row justify-center gap-4">

          <article className="flex flex-col gap-3">
            <div className="flex flex-col gap-3 text-white">
              <Textarea
                onChange={(e) => setQuery(e.target.value)}
                // placeholder="Type your message here."
                className={`transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500`}
              />
            </div>
            <Select
              onValueChange={(value) => setFromFormat(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecciona el formato" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Formatos</SelectLabel>
                  <SelectItem value="JSON">JSON</SelectItem>
                  <SelectItem value="Object">Object</SelectItem>
                  <SelectItem value="Interface">Interface</SelectItem>
                  <SelectItem value="XML">XML</SelectItem>
                  <SelectItem value="CSV">CSV</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </article>

          <article className="flex flex-col gap-3">
            <div key={output} className="flex h-[500px] w-[500px] overflow-y-auto rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300 animated">
              <pre>{output}</pre>
            </div>
            <Select
              onValueChange={(value) => setToFormat(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecciona el formato" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Formatos</SelectLabel>
                  <SelectItem value="JSON">JSON</SelectItem>
                  <SelectItem value="Object">Object</SelectItem>
                  <SelectItem value="Interface">Interface</SelectItem>
                  <SelectItem value="XML">XML</SelectItem>
                  <SelectItem value="CSV">CSV</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </article>

        </div>
        <p className="text-gray-600 mt-2">Selecciona los formatos de entrada y salida, luego haz clic en "Convertir Datos".</p>
        <div className="mt-6">
          <Button
            className="transition-colors duration-300 hover:scale-y-100 hover:bg-[#8a5cf676] text-white font-bold py-2 px-4 rounded"
            disabled={fromFormat === "" || toFormat === ""}
            onClick={processFormat}
          >
            Convertir Datos
          </Button>
        </div>
        {/* {error && (
          <p className="text-red-500 mt-2">
            Error en la conversión: {error}
          </p>
        )} */}
      </main>
    </>
  );
}

export default App;
