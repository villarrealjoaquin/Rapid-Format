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

const convertToJson = (query: string) => {
  const hash = query.replace(/(\w+):/g, '"$1":')
  const convert = JSON.parse(hash);
  return JSON.stringify(convert, null, 2);
}

// { name: "John", age: 30 }
// Easily convert data between different formats

const convertToObj = (query: string) => {
  const jsonObject = JSON.parse(query);
  return `{
${Object.entries(jsonObject)
      .map(([key, value]) => `  ${key}: ${JSON.stringify(value)}`)
      .join(',\n')}
}`;
}

function App() {
  const [fromFormat, setFromFormat] = useState("");
  const [toFormat, setToFormat] = useState("");
  const [query, setQuery] = useState("");
  const [output, setOutput] = useState("");

  const processFormat = () => {
    if (fromFormat === "Object" && toFormat === "JSON") {
      const jsonOutput = convertToJson(query);
      if (jsonOutput !== null) {
        setOutput(jsonOutput);
      }
    } else if (fromFormat === "JSON" && toFormat === "Object") {
      setOutput(convertToObj(query));
    }
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
              <Textarea onChange={(e) => setQuery(e.target.value)} placeholder="Type your message here." />
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
            <div key={output} className="flex min-h-[500px] w-[500px] rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300 animated">
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
          <Button disabled={fromFormat === "" || toFormat === ""} onClick={processFormat}>Convertir Datos</Button>
        </div>
      </main>
    </>
  );
}

export default App;
